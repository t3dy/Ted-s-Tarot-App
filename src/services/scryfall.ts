import { MTGCard, ScryfallCard, ExtractedFeatures, PipAnalysis } from '../types/mtg';

const CACHE_KEY = 'mtg-tarot-cache';
const CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 24 hours

interface CacheEntry {
    timestamp: number;
    data: ScryfallCard;
}

const getCache = (): Record<string, CacheEntry> => {
    try {
        return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    } catch {
        return {};
    }
};

const setCache = (id: string, data: ScryfallCard) => {
    const cache = getCache();
    cache[id] = { timestamp: Date.now(), data };
    // Simple cleanup: if too big, clear all (rudimentary LRU could be better but this is fine for MVP)
    if (Object.keys(cache).length > 500) {
        localStorage.removeItem(CACHE_KEY);
        return;
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

const fetchWithCache = async (url: string): Promise<ScryfallCard> => {
    // We can't easily cache by URL in this structure without hashing, so for now we cache by Card ID after fetch.
    // Actually, for specific card requests (by ID/Name), we can check cache.
    // For "Random", we always fetch fresh then cache the result.
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Scryfall API Error: ${response.statusText}`);
    const data = await response.json();
    setCache(data.id, data);
    return data;
};

// --- Feature Extraction & Normalization ---

const analyzePips = (manaCost: string = ''): PipAnalysis => {
    const analysis: PipAnalysis = {
        total: 0,
        colors: { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 },
        dominantColor: 'Balanced',
        concentrationScore: 0
    };

    if (!manaCost) return analysis;

    // RegEx to find {W}, {U/B}, {2/W}, etc.
    const pips = manaCost.match(/{[^}]+}/g) || [];

    pips.forEach(pip => {
        const clean = pip.replace(/[{}]/g, '');
        // Handle hybrid stats like W/U - count 0.5 for each? Or 1 for both? 
        // Let's count 1 for both to represent presence.
        const syms = clean.split('/');
        syms.forEach(s => {
            if (['W', 'U', 'B', 'R', 'G', 'C'].includes(s)) {
                analysis.colors[s as keyof typeof analysis.colors]++;
                if (s !== 'C') analysis.total++;
            }
        });
    });

    // Find dominant
    let max = 0;
    let entries = Object.entries(analysis.colors).filter(([k]) => k !== 'C');
    entries.forEach(([k, v]) => {
        if (v > max) {
            max = v;
            analysis.dominantColor = k;
        } else if (v === max && max > 0) {
            analysis.dominantColor = 'Balanced'; // Tie
        }
    });

    if (max === 0) analysis.dominantColor = 'Colorless';

    // Concentration: Max single color pips / Total colored pips
    if (analysis.total > 0) {
        analysis.concentrationScore = max / analysis.total;
    }

    return analysis;
};

const extractFeatures = (card: ScryfallCard): ExtractedFeatures => {
    const face = card.card_faces ? card.card_faces[0] : card;
    const manaCost = face.mana_cost || card.mana_cost || '';

    // Keywords from oracle text or extraction
    const rulesText = (face.oracle_text || '').toLowerCase();

    // Heuristic keyword extraction if not provided in 'keywords' field (Scryfall usually provides them)
    // We append specific "Action Signals" derived from text
    const actions: string[] = [];
    if (rulesText.includes('destroy')) actions.push('destroy');
    if (rulesText.includes('exile')) actions.push('exile');
    if (rulesText.includes('draw card')) actions.push('draw');
    if (rulesText.includes('counter target')) actions.push('counter');
    if (rulesText.includes('sacrifice')) actions.push('sacrifice');
    if (rulesText.includes('search your library')) actions.push('search');
    if (rulesText.includes('create')) actions.push('create');
    if (rulesText.includes('return') && rulesText.includes('graveyard')) actions.push('return');
    if (rulesText.includes('gain') && rulesText.includes('life')) actions.push('gain life');

    return {
        colors: card.colors || face.colors || [],
        colorIdentity: card.color_identity || [],
        types: card.type_line.split('—')[0].trim().split(' '),
        subtypes: card.type_line.split('—')[1]?.trim().split(' ') || [],
        manaValue: card.cmc,
        pipAnalysis: analyzePips(manaCost),
        keywords: card.keywords || [],
        actionSignals: actions,
        rarity: card.rarity,
        flavorTone: card.flavor_text || face.flavor_text
    };
};

const normalizeCard = (card: ScryfallCard): MTGCard => {
    const face = card.card_faces ? card.card_faces[0] : card;
    let image = '';
    if (card.image_uris?.normal) image = card.image_uris.normal;
    else if (card.card_faces && card.card_faces[0].image_uris?.normal) image = card.card_faces[0].image_uris.normal;

    return {
        id: card.id,
        name: card.name,
        manaCost: card.mana_cost || face.mana_cost || '',
        typeLine: card.type_line,
        text: card.oracle_text || face.oracle_text || '',
        image,
        features: extractFeatures(card),
        raw: card
    };
};

export const scryfallService = {
    getRandomCard: async (query: string = ''): Promise<MTGCard> => {
        // q param allows filtering e.g. "q=is:commander"
        const url = `https://api.scryfall.com/cards/random${query ? `?q=${query}` : ''}`;
        const data = await fetchWithCache(url);
        return normalizeCard(data);
    },

    searchCards: async (query: string): Promise<MTGCard[]> => {
        const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (!response.ok) return [];
        const json = await response.json();
        return json.data.map(normalizeCard);
    },

    getCardByName: async (name: string): Promise<MTGCard | null> => {
        try {
            const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`;
            const data = await fetchWithCache(url);
            return normalizeCard(data);
        } catch {
            return null;
        }
    }
};
