import React, { useState } from 'react';
import { tarotDeck } from '../../data/tarot-deck';
import { TarotCard } from '../../components/Card/TarotCard';
import { motion } from 'framer-motion';

export const TarotDeckBrowser: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'major' | 'minor'>('all');
    const [suitFilter, setSuitFilter] = useState<'all' | 'wands' | 'cups' | 'swords' | 'pentacles'>('all');

    const filteredCards = tarotDeck.filter(card => {
        if (filter === 'major' && card.arcana !== 'major') return false;
        if (filter === 'minor' && card.arcana !== 'minor') return false;
        if (suitFilter !== 'all' && card.suit !== suitFilter) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 bg-gray-800 p-4 rounded-lg sticky top-0 z-10 border-b border-gray-700">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="bg-gray-700 text-white rounded px-3 py-1"
                >
                    <option value="all">All Arcana</option>
                    <option value="major">Major Arcana</option>
                    <option value="minor">Minor Arcana</option>
                </select>

                <select
                    value={suitFilter}
                    onChange={(e) => setSuitFilter(e.target.value as any)}
                    className="bg-gray-700 text-white rounded px-3 py-1"
                    disabled={filter === 'major'}
                >
                    <option value="all">All Suits</option>
                    <option value="wands">Wands</option>
                    <option value="cups">Cups</option>
                    <option value="swords">Swords</option>
                    <option value="pentacles">Pentacles</option>
                </select>

                <span className="text-gray-400 ml-auto self-center">Showing {filteredCards.length} cards</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
                {filteredCards.map(card => (
                    <motion.div
                        key={card.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="scale-75 origin-top">
                            <TarotCard card={card} isRevealed={true} />
                        </div>
                        <span className="text-xs text-gray-400 text-center">{card.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
