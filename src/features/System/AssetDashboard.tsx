import React, { useState } from 'react';
import { TarotDeckBrowser } from './TarotDeckBrowser';
import { MTGRulesViewer } from './MTGRulesViewer';
import { StorageInspector } from './StorageInspector';
import { Box, Code, Database } from 'lucide-react';

type Tab = 'deck' | 'mtg' | 'storage';

export const AssetDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('deck');

    return (
        <div className="flex flex-col h-full bg-neutral-900 text-gray-100">
            <header className="p-6 border-b border-gray-800 bg-black/40">
                <h1 className="text-2xl font-serif text-tarot-accent">System Internals</h1>
                <p className="text-gray-400 text-sm">Asset browser and debugging tools</p>

                <div className="flex gap-4 mt-6">
                    <TabButton
                        active={activeTab === 'deck'}
                        onClick={() => setActiveTab('deck')}
                        icon={<Box size={16} />}
                        label="Tarot Deck"
                    />
                    <TabButton
                        active={activeTab === 'mtg'}
                        onClick={() => setActiveTab('mtg')}
                        icon={<Code size={16} />}
                        label="MTG Config"
                    />
                    <TabButton
                        active={activeTab === 'storage'}
                        onClick={() => setActiveTab('storage')}
                        icon={<Database size={16} />}
                        label="Storage"
                    />
                </div>
            </header>

            <main className="flex-1 overflow-auto p-6">
                {activeTab === 'deck' && <TarotDeckBrowser />}
                {activeTab === 'mtg' && <MTGRulesViewer />}
                {activeTab === 'storage' && <StorageInspector />}
            </main>
        </div>
    );
};

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
                ? 'bg-tarot-accent text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
    >
        {icon}
        {label}
    </button>
);
