import React from 'react';
import correspondences from '../../data/mtg/correspondences.json';

export const MTGRulesViewer: React.FC = () => {
    return (
        <div className="space-y-6 text-gray-300">
            <p className="text-sm bg-blue-900/30 p-4 rounded border border-blue-800">
                This is the raw configuration engine that drives the MTG Oracle.
                It maps Magic: The Gathering concepts (Colors, Types, Keywords) to Tarot meanings.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl text-tarot-accent font-serif border-b border-gray-700 pb-2">Manamancy (Numerology)</h3>
                    {Object.entries(correspondences.manaNumerology).map(([num, data]) => (
                        <div key={num} className="bg-gray-800 p-3 rounded text-sm">
                            <div className="flex justify-between font-bold text-white mb-1">
                                <span>Mana Value {num}</span>
                                <span className="text-tarot-primary">{data.coreTheme}</span>
                            </div>
                            <p className="text-gray-400">{data.situation}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl text-tarot-accent font-serif border-b border-gray-700 pb-2">Color Philosophy</h3>
                    {Object.entries(correspondences.colors).map(([color, data]) => (
                        <div key={color} className="bg-gray-800 p-3 rounded text-sm grid grid-cols-[30px_1fr] gap-3">
                            <div className={`font-bold text-xl flex items-center justify-center rounded ${getColorBg(color)} text-black`}>
                                {color}
                            </div>
                            <div>
                                <div className="text-white font-bold">Drive: <span className="text-gray-400 font-normal">{data.drive.join(', ')}</span></div>
                                <div className="text-white font-bold">Shadow: <span className="text-gray-400 font-normal">{data.shadow.join(', ')}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl text-tarot-accent font-serif border-b border-gray-700 pb-2 mb-4">Keyword Dictionary</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {Object.entries(correspondences.keywords).map(([kw, data]) => (
                        <div key={kw} className="bg-black/30 border border-gray-700 p-2 rounded text-xs flex flex-col">
                            <span className="font-bold text-gray-200 capitalize">{kw}</span>
                            <span className="text-tarot-primary">{data.meaning}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const getColorBg = (code: string) => {
    switch (code) {
        case 'W': return 'bg-yellow-100';
        case 'U': return 'bg-blue-400';
        case 'B': return 'bg-gray-500'; // Dark mode fix
        case 'R': return 'bg-red-400';
        case 'G': return 'bg-green-400';
        case 'C': return 'bg-gray-300';
        case 'M': return 'bg-yellow-500';
        default: return 'bg-white';
    }
}
