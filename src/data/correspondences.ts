export const elementCorrespondences = {
    fire: {
        qualities: ['Action', 'Will', 'Passion', 'Creativity'],
        direction: 'South',
        timeframe: 'Days',
        signs: ['Aries', 'Leo', 'Sagittarius']
    },
    water: {
        qualities: ['Emotion', 'Intuition', 'Relationships', 'Healing'],
        direction: 'West',
        timeframe: 'Months',
        signs: ['Cancer', 'Scorpio', 'Pisces']
    },
    air: {
        qualities: ['Intellect', 'Clarify', 'Communication', 'Truth'],
        direction: 'East',
        timeframe: 'Weeks',
        signs: ['Gemini', 'Libra', 'Aquarius']
    },
    earth: {
        qualities: ['Material', 'Stability', 'Health', 'Finance'],
        direction: 'North',
        timeframe: 'Years',
        signs: ['Taurus', 'Virgo', 'Capricorn']
    }
};

export const numerologyMeanings = {
    0: 'Potential, The Void, Start',
    1: 'New Beginnings, Opportunity, Potential',
    2: 'Balance, Partnership, Duality',
    3: 'Creativity, Growth, Expression',
    4: 'Structure, Stability, Foundation',
    5: 'Conflict, Change, Instability',
    6: 'Harmony, Cooperation, Healing',
    7: 'Reflection, Assessment, Spirituality',
    8: 'Mastery, Action, Accomplishment',
    9: 'Fruition, Conclusion, Attainment',
    10: 'Completion, End of Cycle, Renewal'
};

export const zodiacCorrespondences: Record<string, { start: string, end: string, element: string, ruler: string }> = {
    'Aries': { start: 'Mar 21', end: 'Apr 19', element: 'Fire', ruler: 'Mars' },
    'Taurus': { start: 'Apr 20', end: 'May 20', element: 'Earth', ruler: 'Venus' },
    'Gemini': { start: 'May 21', end: 'Jun 20', element: 'Air', ruler: 'Mercury' },
    'Cancer': { start: 'Jun 21', end: 'Jul 22', element: 'Water', ruler: 'Moon' },
    'Leo': { start: 'Jul 23', end: 'Aug 22', element: 'Fire', ruler: 'Sun' },
    'Virgo': { start: 'Aug 23', end: 'Sep 22', element: 'Earth', ruler: 'Mercury' },
    'Libra': { start: 'Sep 23', end: 'Oct 22', element: 'Air', ruler: 'Venus' },
    'Scorpio': { start: 'Oct 23', end: 'Nov 21', element: 'Water', ruler: 'Pluto/Mars' },
    'Sagittarius': { start: 'Nov 22', end: 'Dec 21', element: 'Fire', ruler: 'Jupiter' },
    'Capricorn': { start: 'Dec 22', end: 'Jan 19', element: 'Earth', ruler: 'Saturn' },
    'Aquarius': { start: 'Jan 20', end: 'Feb 18', element: 'Air', ruler: 'Uranus/Saturn' },
    'Pisces': { start: 'Feb 19', end: 'Mar 20', element: 'Water', ruler: 'Neptune/Jupiter' }
};
