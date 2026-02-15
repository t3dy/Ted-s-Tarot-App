import React, { useEffect, useState } from 'react';
import { Trash2, Database } from 'lucide-react';

export const StorageInspector: React.FC = () => {
    const [items, setItems] = useState<{ key: string, size: string, preview: string }[]>([]);

    const refresh = () => {
        const list = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const val = localStorage.getItem(key) || '';
                list.push({
                    key,
                    size: (val.length / 1024).toFixed(2) + ' KB',
                    preview: val.substring(0, 100) + (val.length > 100 ? '...' : '')
                });
            }
        }
        setItems(list);
    };

    useEffect(() => {
        refresh();
    }, []);

    const clearItem = (key: string) => {
        if (confirm(`Delete ${key}?`)) {
            localStorage.removeItem(key);
            refresh();
        }
    };

    const clearAll = () => {
        if (confirm("WIpe ALL local data? This includes saved spreads and cache.")) {
            localStorage.clear();
            refresh();
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 text-gray-200">
            <div className="flex justify-between items-center bg-red-900/20 border border-red-900/50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                    <Database className="text-red-400" />
                    <div>
                        <h3 className="font-bold text-red-100">Local Storage Debugger</h3>
                        <p className="text-xs text-red-300">Manage persisted data like caches and custom spreads.</p>
                    </div>
                </div>
                <button onClick={clearAll} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 text-sm">
                    <Trash2 size={16} /> Wipe All Data
                </button>
            </div>

            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">Storage is empty.</div>
                ) : items.map(item => (
                    <div key={item.key} className="bg-gray-800 p-4 rounded border border-gray-700 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="overflow-hidden">
                            <div className="font-mono text-tarot-primary font-bold">{item.key}</div>
                            <div className="text-xs text-gray-500 font-mono mt-1 mb-2">{item.size}</div>
                            <code className="text-xs text-gray-400 bg-black/30 p-1 rounded block truncate max-w-lg">{item.preview}</code>
                        </div>
                        <button onClick={() => clearItem(item.key)} className="text-gray-400 hover:text-red-400 p-2">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
