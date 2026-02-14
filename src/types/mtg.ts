export interface MTGCard {
    id: string;
    name: string;
    manaCost: string;
    typeLine: string;
    text: string;
    image: string; // The primary art to display
    features: ExtractedFeatures; // The vector for interpretation
    raw: ScryfallCard;
}

export interface ScryfallCard {
    id: string;
    oracle_id: string;
    multiverse_ids?: number[];
    name: string;
    mana_cost?: string;
    cmc: number;
    type_line: string;
    oracle_text?: string;
    colors?: string[];
    color_identity: string[];
    card_faces?: ScryfallCardFace[];
    image_uris?: {
        small: string;
        normal: string;
        large: string;
        png: string;
        art_crop: string;
        border_crop: string;
    };
    rarity: string;
    flavor_text?: string;
    keywords: string[];
}

export interface ScryfallCardFace {
    name: string;
    mana_cost: string;
    type_line: string;
    oracle_text: string;
    colors?: string[];
    image_uris?: {
        small: string;
        normal: string;
        large: string;
        png: string;
        art_crop: string;
        border_crop: string;
    };
}

export interface PipAnalysis {
    total: number;
    colors: {
        W: number;
        U: number;
        B: number;
        R: number;
        G: number;
        C: number; // Colorless specific pips (e.g. {C})
    };
    dominantColor: string | 'Balanced' | 'Colorless';
    concentrationScore: number; // 0 to 1 (1 = mono color heavy)
}

export interface ExtractedFeatures {
    colors: string[];
    colorIdentity: string[];
    types: string[]; // creature, instant, etc.
    subtypes: string[]; // goblin, wizard, etc.
    manaValue: number;
    pipAnalysis: PipAnalysis;
    keywords: string[];
    actionSignals: string[]; // "destroy", "draw", etc.
    rarity: string;
    flavorTone?: string;
}

export interface InterpretationTag {
    id: string;
    source: string; // "color:red", "keyword:haste", "mv:5"
    axis: 'drive' | 'domain' | 'dynamics' | 'advice' | 'shadow';
    text: string;
    weight: number; // 0-1 importance
}

export interface ReadingResult {
    cardId: string;
    context: string; // "past", "present", etc.
    tags: InterpretationTag[];
    narrative: string; // Synthesized text
    analysis: {
        featureTriggers: string[]; // "Red mana triggered aggression tag"
    };
}

export interface ManaNumerologyEntry {
    coreTheme: string;
    situation: string;
    challenge: string;
    advice: string;
    shadow: string;
}

export interface CorrespondenceDB {
    colors: Record<string, {
        drive: string[];
        domain: string[];
        shadow: string[];
    }>;
    types: Record<string, {
        role: string;
        dynamics: string[];
    }>;
    keywords: Record<string, {
        meaning: string;
        axis: 'drive' | 'dynamics' | 'advice';
    }>;
    actions: Record<string, {
        meaning: string;
        axis: 'dynamics' | 'advice';
    }>;
    manaNumerology: Record<number, ManaNumerologyEntry>;
    pipModifiers: {
        highSaturation: string; // "Intensity"
        balanced: string; // "Integration"
        scattered: string; // "Conflict"
    };
}
