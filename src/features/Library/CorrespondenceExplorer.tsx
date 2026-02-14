import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { elementCorrespondences, zodiacCorrespondences, numerologyMeanings } from '../../data/correspondences';
import { Search } from 'lucide-react';

type Tab = 'elements' | 'zodiac' | 'numerology';

export const CorrespondenceExplorer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('elements');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="flex flex-col h-full bg-tarot-dark text-tarot-text p-6 overflow-hidden">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-tarot-accent mb-2">Correspondence Library</h1>
                    <p className="text-gray-400">Explore the mystical connections.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search correspondences..."
                        className="bg-tarot-panel border border-gray-700 rounded-full py-2 pl-10 pr-4 w-64 focus:border-tarot-accent outline-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-700">
                {['elements', 'zodiac', 'numerology'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as Tab)}
                        className={`pb-2 px-4 capitalize relative transition-colors ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-tarot-accent"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto pr-2">
                <AnimatePresence mode="wait">
                    {activeTab === 'elements' && (
                        <motion.div
                            key="elements"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {Object.entries(elementCorrespondences).map(([element, data]) => (
                                <div key={element} className="bg-tarot-panel border border-gray-700 rounded-xl p-6 hover:border-tarot-accent transition-colors group">
                                    <h3 className="text-xl font-serif capitalize mb-4 group-hover:text-tarot-accent transition-colors">{element}</h3>
                                    <div className="space-y-2 text-sm text-gray-400">
                                        <div className="flex justify-between border-b border-gray-800 pb-1">
                                            <span>Direction</span>
                                            <span className="text-white">{data.direction}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-800 pb-1">
                                            <span>Timeframe</span>
                                            <span className="text-white">{data.timeframe}</span>
                                        </div>
                                        <div>
                                            <span className="block mb-1">Qualities</span>
                                            <div className="flex flex-wrap gap-1">
                                                {data.qualities.map(q => (
                                                    <span key={q} className="bg-black/30 px-2 py-0.5 rounded text-xs text-tarot-primary">{q}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="block mb-1 mt-2">Zodiac Signs</span>
                                            <div className="flex flex-wrap gap-1">
                                                {data.signs.map(s => (
                                                    <span key={s} className="bg-gray-800 px-2 py-0.5 rounded text-xs">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'zodiac' && (
                        <motion.div
                            key="zodiac"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {Object.entries(zodiacCorrespondences)
                                .filter(([sign]) => sign.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(([sign, data]) => (
                                    <div key={sign} className="bg-tarot-panel border border-gray-700 rounded-lg p-4 flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-lg text-white">{sign}</h3>
                                            <span className="text-xs text-tarot-accent border border-tarot-accent/30 px-2 py-0.5 rounded-full">{data.element}</span>
                                        </div>
                                        <div className="text-sm text-gray-400 grid grid-cols-2 gap-2 mt-2">
                                            <div>
                                                <span className="block text-xs uppercase tracking-wider opacity-50">Dates</span>
                                                {data.start} - {data.end}
                                            </div>
                                            <div>
                                                <span className="block text-xs uppercase tracking-wider opacity-50">Ruler</span>
                                                {data.ruler}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </motion.div>
                    )}

                    {activeTab === 'numerology' && (
                        <motion.div
                            key="numerology"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-2 max-w-3xl mx-auto"
                        >
                            {Object.entries(numerologyMeanings).map(([num, meaning]) => (
                                <div key={num} className="flex items-center gap-4 bg-tarot-panel p-4 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-tarot-primary/20 flex items-center justify-center text-tarot-primary font-bold text-xl font-serif">
                                        {num}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg text-white">{meaning}</h4>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
