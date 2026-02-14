import React, { useMemo } from 'react';
import type { TarotCard } from '../../types/tarot';
import { interpretationEngine } from '../../systems/interpretation';
import { X } from 'lucide-react';

interface ReadingSynthesisProps {
    cards: TarotCard[];
    onClose: () => void;
}

export const ReadingSynthesis: React.FC<ReadingSynthesisProps> = ({ cards, onClose }) => {
    const analysis = useMemo(() => interpretationEngine.analyzeElementalBalance(cards), [cards]);
    const dominantElement = Object.entries(analysis).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    const majorCount = analysis.major;
    const minorCount = cards.length - majorCount;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-tarot-panel border border-tarot-accent rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <header className="p-4 border-b border-gray-700 flex justify-between items-center bg-black/20">
                    <h2 className="text-xl font-serif text-tarot-accent">Reading Analysis</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </header>

                <div className="p-6 overflow-y-auto space-y-8">
                    {/* Elemental Balance */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4 text-white">Elemental Balance</h3>
                        <div className="flex gap-4 items-end h-32">
                            {['fire', 'water', 'air', 'earth'].map(elem => {
                                const count = analysis[elem as keyof typeof analysis] || 0;
                                const height = cards.length ? (count / cards.length) * 100 : 0;

                                let color = 'bg-gray-500';
                                if (elem === 'fire') color = 'bg-red-500';
                                if (elem === 'water') color = 'bg-blue-500';
                                if (elem === 'air') color = 'bg-yellow-200'; // or cyan
                                if (elem === 'earth') color = 'bg-green-600';

                                return (
                                    <div key={elem} className="flex-1 flex flex-col justify-end items-center gap-2 group">
                                        <div className="text-xs text-gray-400 group-hover:text-white transition-colors">{count}</div>
                                        <div
                                            className={`w-full rounded-t ${color} opacity-80 hover:opacity-100 transition-all`}
                                            style={{ height: `${Math.max(height, 5)}%` }}
                                        />
                                        <div className="text-xs uppercase tracking-wider text-gray-500">{elem}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="mt-4 text-sm text-gray-300">
                            Dominant Element: <span className="text-white capitalize font-bold">{dominantElement}</span>.
                            {dominantElement === 'fire' && " Energy, passion, and rapid change are highlighted."}
                            {dominantElement === 'water' && " Emotional depth, intuition, and relationships are focus areas."}
                            {dominantElement === 'air' && " Intellectual matters, communication, and decisions are key."}
                            {dominantElement === 'earth' && " Practicality, material stability, and slow growth are emphasized."}
                        </p>
                    </section>

                    {/* Major/Minor Split */}
                    <section className="bg-black/20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-white">Arcana Distribution</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Major Arcana</span>
                                    <span>{Math.round((majorCount / cards.length) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-purple-500 h-full" style={{ width: `${(majorCount / cards.length) * 100}%` }} />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {majorCount > minorCount
                                        ? "This reading suggests significant life events and karmic lessons."
                                        : "This reading focuses on day-to-day matters and practical details."}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
