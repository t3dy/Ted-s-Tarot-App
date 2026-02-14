import React, { useState } from 'react';
import { celticCrossSpreadFixed, threeCardSpread } from '../../data/spreads';
import { fullDeck } from '../../data/tarot-deck';
import { SpreadLayout } from '../../components/Spread/SpreadLayout';
import type { TarotCard as TarotCardType, Spread } from '../../types/tarot';
import { ReadingSynthesis } from './ReadingSynthesis';
import { BarChart2 } from 'lucide-react';

export const ReadingSession: React.FC = () => {
    const [selectedSpread, setSelectedSpread] = useState<Spread>(celticCrossSpreadFixed);
    const [assignedCards, setAssignedCards] = useState<Record<string, { card: TarotCardType; isReversed: boolean; isRevealed: boolean }>>({});
    const [isDealing, setIsDealing] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);

    const handleDeal = () => {
        setIsDealing(true);
        setAssignedCards({});

        // Simple shuffle
        const shuffled = [...fullDeck].sort(() => Math.random() - 0.5);

        // Deal cards to positions with delay
        const newAssignments: Record<string, { card: TarotCardType; isReversed: boolean; isRevealed: boolean }> = {};

        selectedSpread.positions.forEach((pos, index) => {
            const card = shuffled[index];
            newAssignments[pos.id] = {
                card,
                isReversed: Math.random() > 0.8, // 20% chance of reversal
                isRevealed: false
            };
        });

        setAssignedCards(newAssignments);
        setIsDealing(false);
    };

    const handleCardClick = (posId: string) => {
        if (assignedCards[posId] && !assignedCards[posId].isRevealed) {
            setAssignedCards(prev => ({
                ...prev,
                [posId]: { ...prev[posId], isRevealed: true }
            }));
        }
    };

    const revealedCards = Object.values(assignedCards).filter(c => c.isRevealed).map(c => c.card);

    return (
        <div className="flex flex-col h-screen text-tarot-text bg-tarot-dark">
            <header className="p-4 border-b border-tarot-panel flex justify-between items-center">
                <h1 className="text-2xl font-serif text-tarot-accent">Reading Session</h1>
                <div className="flex gap-4">
                    <select
                        className="bg-tarot-panel border border-tarot-accent rounded px-2 py-1 text-sm"
                        value={selectedSpread.id}
                        onChange={(e) => {
                            const spread = [celticCrossSpreadFixed, threeCardSpread].find(s => s.id === e.target.value);
                            if (spread) setSelectedSpread(spread);
                        }}
                    >
                        <option value={celticCrossSpreadFixed.id}>Celtic Cross</option>
                        <option value={threeCardSpread.id}>Three Card Spread</option>
                    </select>

                    <button
                        onClick={() => setShowAnalysis(true)}
                        disabled={revealedCards.length === 0}
                        className="flex items-center gap-2 px-3 py-1 bg-tarot-panel border border-gray-600 rounded hover:border-tarot-accent disabled:opacity-50 transition-colors"
                    >
                        <BarChart2 size={16} /> Analyze
                    </button>

                    <button
                        onClick={handleDeal}
                        disabled={isDealing}
                        className="bg-tarot-primary hover:bg-indigo-600 text-white px-4 py-1 rounded shadow-lg transition-colors border border-indigo-400"
                    >
                        {isDealing ? 'Dealing...' : 'Shuffle & Deal'}
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-hidden relative">
                <SpreadLayout
                    spread={selectedSpread}
                    cards={assignedCards}
                    onPositionClick={handleCardClick}
                />
            </main>

            {showAnalysis && (
                <ReadingSynthesis
                    cards={revealedCards}
                    onClose={() => setShowAnalysis(false)}
                />
            )}
        </div>
    );
};
