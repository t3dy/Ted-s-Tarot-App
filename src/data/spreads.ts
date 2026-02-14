import type { Spread } from '../types/tarot';

export const threeCardSpread: Spread = {
    id: 'three-card-past-present-future',
    name: 'Past, Present, Future',
    description: 'A simple linear spread to understand the trajectory of a situation.',
    tags: ['General', 'Time', 'Simple'],
    positions: [
        { id: 'pos-1', name: 'Past', description: 'Influences from the past that still affect the situation.', x: 0, y: 0 },
        { id: 'pos-2', name: 'Present', description: 'The current state of affairs.', x: 200, y: 0 }, // Coordinates are arbitrary units (e.g., pixels or grid)
        { id: 'pos-3', name: 'Future', description: 'The likely outcome if things continue as they are.', x: 400, y: 0 }
    ]
};

export const celticCrossSpread: Spread = {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'The ancient and classic spread for deep insight into a specific question.',
    tags: ['Complex', 'General', 'Classic'],
    positions: [
        { id: '1', name: 'The Significator', description: 'The heart of the matter.', x: 0, y: 0 },
        { id: '2', name: 'The Crossing', description: 'What crosses you, for good or ill.', x: 0, y: 0, rotation: 90 }, // Rotated 90 deg
        { id: '3', name: 'The Crown', description: 'What is above you; your aspirations.', x: 0, y: -200 },
        { id: '4', name: 'The Root', description: 'What is beneath you; your subconscious foundation.', x: 0, y: 200 },
        { id: '5', name: 'The Past', description: 'What is behind you; receding influence.', x: -200, y: 0 },
        { id: '6', name: 'The Future', description: 'What is before you; approaching influence.', x: 200, y: 0 },
        { id: '7', name: 'Yourself', description: 'Your attitude and stance.', x: 400, y: 300 },
        { id: '8', name: 'Environment', description: 'Wait, standard Celtic Cross column is usually to the right. Adjusting coordinates.', x: 400, y: 100 },
        // Actually, let's fix coordinates to be more standard visual layout
    ]
};

// Redefine Celtic Cross with better visual coordinates (assuming 0,0 is center of cross)
export const celticCrossSpreadFixed: Spread = {
    ...celticCrossSpread,
    positions: [
        { id: '1', name: 'The Heart', description: 'The situation.', x: 0, y: 0 },
        { id: '2', name: 'The Crossing', description: 'The challenge.', x: 0, y: 0, rotation: 90 },
        { id: '3', name: 'The Foundation', description: 'The basis of the matter.', x: 0, y: 150 },
        { id: '4', name: 'The Past', description: 'Receding influence.', x: -150, y: 0 },
        { id: '5', name: 'The Crown', description: 'Possible outcome / Goal.', x: 0, y: -150 },
        { id: '6', name: 'The Future', description: 'Approaching influence.', x: 150, y: 0 },

        // The Staff (Column on the right)
        { id: '7', name: 'Self', description: 'Attitude and approach.', x: 400, y: 150 },
        { id: '8', name: 'Environment', description: 'External influences.', x: 400, y: 50 },
        { id: '9', name: 'Hopes & Fears', description: 'Psychological state.', x: 400, y: -50 },
        { id: '10', name: 'Outcome', description: 'The likely result.', x: 400, y: -150 }
    ]
};

export const spreads = [threeCardSpread, celticCrossSpreadFixed];
