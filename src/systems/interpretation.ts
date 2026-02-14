import type { TarotCard, SpreadPosition } from '../types/tarot';

interface InterpretationContext {
    question?: string;
    position?: SpreadPosition;
    surroundingCards?: TarotCard[];
}

export const interpretationEngine = {
    getMeaning: (card: TarotCard, isReversed: boolean, context?: InterpretationContext): string => {
        // Basic retrieval
        const meanings = isReversed ? card.meanings.reversed : card.meanings.upright;
        const baseMeaning = meanings[Math.floor(Math.random() * meanings.length)]; // Randomly select one for variety if multiple exist

        // Contextual enhancement (rudimentary rule-based)
        let interpretation = baseMeaning;

        if (context?.position) {
            interpretation = `In the position of "${context.position.name}" (${context.position.description}), ${card.name} suggests: ${baseMeaning}`;
        }

        return interpretation;
    },

    getKeywords: (card: TarotCard, isReversed: boolean): string[] => {
        return card.keywords;
    },

    analyzeElementalBalance: (cards: TarotCard[]): Record<string, number> => {
        const balance = { fire: 0, water: 0, air: 0, earth: 0, major: 0 };
        cards.forEach(c => {
            if (c.arcana === 'major') {
                balance.major++;
                if (c.correspondences.element) {
                    // Start of fallback if element key exists in balance
                    if (balance[c.correspondences.element as keyof typeof balance] !== undefined) {
                        balance[c.correspondences.element as keyof typeof balance]++;
                    }
                }
            } else {
                if (c.suit === 'wands') balance.fire++;
                if (c.suit === 'cups') balance.water++;
                if (c.suit === 'swords') balance.air++;
                if (c.suit === 'pentacles') balance.earth++;
            }
        });
        return balance;
    }
};
