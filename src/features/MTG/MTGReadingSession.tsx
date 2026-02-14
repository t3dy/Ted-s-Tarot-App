import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shuffle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { scryfallService } from '../../services/scryfall';
import { interpretationEngine } from '../../systems/mtg-interpretation';
import { MTGCard, ReadingResult } from '../../types/mtg';

export const MTGReadingSession: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [card, setCard] = useState<MTGCard | null>(null);
    const [reading, setReading] = useState<ReadingResult | null>(null);
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDraw = async (mode: 'random' | 'search') => {
        setIsLoading(true);
        setError(null);
        setCard(null);
        setReading(null);

        try {
            let drawnCard: MTGCard | null = null;
            if (mode === 'random') {
                drawnCard = await scryfallService.getRandomCard();
            } else {
                // If search, we just get one for now or use the first result
                // Better: search returns list, user picks. 
                // For MVP: Search Exact or First
                drawnCard = await scryfallService.getCardByName(query);
                if (!drawnCard) {
                    const results = await scryfallService.searchCards(query);
                    if (results.length > 0) drawnCard = results[0];
                }
            }

            if (!drawnCard) throw new Error("No card found.");

            setCard(drawnCard);
            // Simulate "Reading" processing time
            setTimeout(() => {
                const result = interpretationEngine.analyze(drawnCard!, 'present'); // Default context
                setReading(result);
            }, 800);

        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-neutral-900 text-gray-100 font-sans overflow-hidden">
            <header className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/40">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-purple-500">
                    MTG Oracle
                </h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2 text-gray-500 w-4 h-4" />
                        <input
                            className="bg-gray-800 border border-gray-700 rounded-full pl-8 pr-4 py-1 text-sm focus:border-purple-500 outline-none w-48 transition-all"
                            placeholder="Search card..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleDraw('search')}
                        />
                    </div>
                    <button
                        onClick={() => handleDraw('random')}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {isLoading ? <RefreshCw className="animate-spin w-4 h-4" /> : <Shuffle className="w-4 h-4" />}
                        Draw Fate
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 items-start justify-center">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-900/80 border border-red-500 text-red-100 px-6 py-3 rounded-lg z-50"
                        >
                            {error}
                        </motion.div>
                    )}

                    {card && (
                        <motion.div
                            key="card-display"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-shrink-0"
                        >
                            {/* Card Image with 3D effect */}
                            <div className="relative group perspective-1000">
                                <img
                                    src={card.image}
                                    alt={card.name}
                                    className="w-72 md:w-80 rounded-xl shadow-2xl border-4 border-black/50 transition-transform duration-500 hover:rotate-y-12 hover:scale-105"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 pointer-events-none">
                                    <span className="text-white font-serif italic text-lg text-center px-4">
                                        "{card.features.flavorTone || 'The cards represent possibilities...'}"
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {reading && (
                        <motion.div
                            key="reading-panel"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-1 max-w-2xl w-full space-y-6"
                        >
                            {/* Reading Card */}
                            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-orange-500" />

                                <h2 className="text-2xl font-serif text-white mb-4">The Oracle Speaks</h2>
                                <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-line">
                                    {reading.narrative}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {reading.tags.slice(0, 5).map(tag => (
                                        <span key={tag.id} className="text-xs px-2 py-1 bg-black/30 border border-gray-600 rounded text-gray-400 uppercase tracking-widest">
                                            {tag.text}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Analysis Toggle */}
                            <div className="border border-gray-800 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setIsAnalysisOpen(!isAnalysisOpen)}
                                    className="w-full flex justify-between items-center p-4 bg-gray-900 hover:bg-gray-800 transition-colors text-sm text-gray-400 font-medium"
                                >
                                    <span>Oracle Insight (Why this reading?)</span>
                                    {isAnalysisOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>

                                <AnimatePresence>
                                    {isAnalysisOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="bg-black/20 p-4 space-y-4"
                                        >
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Feature Triggers</h4>
                                                <ul className="space-y-1">
                                                    {reading.analysis.featureTriggers.map((trig, i) => (
                                                        <li key={i} className="text-sm text-purple-300 font-mono flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                            {trig}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Mana Analysis</h4>
                                                    <div className="text-sm text-gray-300">
                                                        CMC: <span className="text-white">{card!.features.manaValue}</span> <br />
                                                        Dominance: <span className="text-white">{card!.features.pipAnalysis.dominantColor}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Type Dynamics</h4>
                                                    <div className="text-sm text-gray-300">
                                                        {card!.features.types.join(', ')}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                        </motion.div>
                    )}

                    {!reading && !isLoading && !card && (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-600 space-y-4">
                            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center">
                                <Search size={24} className="opacity-50" />
                            </div>
                            <p>Search for a card or draw randomly to begin.</p>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};
