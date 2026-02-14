import type { Spread } from '../types/tarot';

const SPREADS_KEY = 'tarot-app-spreads';
const READINGS_KEY = 'tarot-app-readings';

export const storage = {
    getSpreads: (): Spread[] => {
        try {
            const data = localStorage.getItem(SPREADS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Failed to load spreads", e);
            return [];
        }
    },

    saveSpread: (spread: Spread): void => {
        const spreads = storage.getSpreads();
        const index = spreads.findIndex(s => s.id === spread.id);
        if (index >= 0) {
            spreads[index] = spread;
        } else {
            spreads.push(spread);
        }
        localStorage.setItem(SPREADS_KEY, JSON.stringify(spreads));
    },

    deleteSpread: (id: string): void => {
        const spreads = storage.getSpreads().filter(s => s.id !== id);
        localStorage.setItem(SPREADS_KEY, JSON.stringify(spreads));
    },

    // Readings can be similar...
    saveReading: (reading: any) => {
        // ...
    }
};
