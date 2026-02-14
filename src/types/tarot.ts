export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles' | null;
export type Arcana = 'major' | 'minor';
export type Rank = 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'page' | 'knight' | 'queen' | 'king' | string; // string for Major labels (e.g. "The Fool")

export interface ElementalDignity {
    element: 'fire' | 'water' | 'air' | 'earth';
    strength: number; // 1-10 scale maybe?
}

export interface CardCorrespondences {
    astrology?: string; // "Aries", "Mars", etc.
    planet?: string; // Explicit planet field
    element?: 'fire' | 'water' | 'air' | 'earth' | 'spirit';
    kabbalah?: {
        path?: string; // "11 - Aleph"
        sephira?: string; // "Kether"
        letter?: string; // Hebrew letter
    };
    numerology?: number;
}

export interface TarotCard {
    id: string; // "major-0", "wands-ace"
    name: string;
    number: number; // 0-21 for Major, 1-14 for Minor
    arcana: Arcana;
    suit: Suit;
    rank: Rank;
    imgUrl: string; // Path to asset
    keywords: string[];
    meanings: {
        upright: string[];
        reversed: string[];
    };
    correspondences: CardCorrespondences;
}

export interface SpreadPosition {
    id: string;
    name: string;
    description: string;
    x: number; // For visual designer (relative or absolute px)
    y: number;
    rotation?: number; // degrees
}

export interface Spread {
    id: string;
    name: string;
    description: string;
    positions: SpreadPosition[];
    tags: string[]; // "Love", "Career", "General"
}

export interface SearchFilters {
    suit?: Suit;
    arcana?: Arcana;
    element?: string;
    query?: string;
}
