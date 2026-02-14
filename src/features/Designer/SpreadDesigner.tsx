import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { SpreadPosition, Spread } from '../../types/tarot';
import { Plus, Save, Trash2, RotateCw } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid'; // Unused

// Simple ID generator if uuid not available
const generateId = () => Math.random().toString(36).substr(2, 9);

export const SpreadDesigner: React.FC = () => {
    const [spreadName, setSpreadName] = useState("New Custom Spread");
    const [positions, setPositions] = useState<SpreadPosition[]>([]);
    const [selectedPosId, setSelectedPosId] = useState<string | null>(null);

    const addPosition = () => {
        const newPos: SpreadPosition = {
            id: generateId(),
            name: `Position ${positions.length + 1}`,
            description: "Description of this position",
            x: 0,
            y: 0,
            rotation: 0
        };
        setPositions([...positions, newPos]);
        setSelectedPosId(newPos.id);
    };

    const updatePosition = (id: string, updates: Partial<SpreadPosition>) => {
        setPositions(positions.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const removePosition = (id: string) => {
        setPositions(positions.filter(p => p.id !== id));
        if (selectedPosId === id) setSelectedPosId(null);
    };

    const handleSave = () => {
        const newSpread: Spread = {
            id: selectedPosId && positions.length > 0 ? (spreadName.toLowerCase().replace(/\s+/g, '-') + '-' + generateId()) : generateId(),
            name: spreadName,
            description: "Custom spread created in Designer",
            positions,
            tags: ["Custom"]
        };
        console.log("Saving spread:", newSpread);
        import('../../systems/storage').then(({ storage }) => {
            storage.saveSpread(newSpread);
            alert("Spread saved successfully!");
        });
    };

    const selectedPos = positions.find(p => p.id === selectedPosId);

    return (
        <div className="flex h-full bg-tarot-dark text-tarot-text">
            {/* Sidebar Controls */}
            <aside className="w-80 bg-tarot-panel border-r border-gray-700 p-4 flex flex-col gap-6 z-10 shadow-xl">
                <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Spread Name</label>
                    <input
                        className="w-full bg-black/30 border border-gray-600 rounded p-2 text-white focus:border-tarot-accent outline-none"
                        value={spreadName}
                        onChange={e => setSpreadName(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={addPosition}
                        className="flex-1 flex items-center justify-center gap-2 bg-tarot-primary/20 border border-tarot-primary hover:bg-tarot-primary/40 text-tarot-primary rounded p-2 transition-colors"
                    >
                        <Plus size={16} /> Add Card
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 bg-tarot-accent/20 border border-tarot-accent hover:bg-tarot-accent/40 text-tarot-accent rounded p-2 transition-colors"
                    >
                        <Save size={16} /> Save
                    </button>
                </div>

                <hr className="border-gray-700" />

                {selectedPos ? (
                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4">
                        <h3 className="font-semibold text-lg flex items-center justify-between">
                            Edit Position
                            <button onClick={() => removePosition(selectedPos.id)} className="text-red-400 hover:text-red-300">
                                <Trash2 size={16} />
                            </button>
                        </h3>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Name</label>
                            <input
                                className="w-full bg-black/30 border border-gray-600 rounded p-2 text-sm"
                                value={selectedPos.name}
                                onChange={e => updatePosition(selectedPos.id, { name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Description</label>
                            <textarea
                                className="w-full bg-black/30 border border-gray-600 rounded p-2 text-sm h-24"
                                value={selectedPos.description}
                                onChange={e => updatePosition(selectedPos.id, { description: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="block text-xs text-gray-500 mb-1">Rotation</label>
                                <input
                                    type="number"
                                    className="w-full bg-black/30 border border-gray-600 rounded p-2 text-sm"
                                    value={selectedPos.rotation || 0}
                                    onChange={e => updatePosition(selectedPos.id, { rotation: Number(e.target.value) })}
                                />
                            </div>
                            <button
                                onClick={() => updatePosition(selectedPos.id, { rotation: (selectedPos.rotation || 0) + 90 })}
                                className="mt-5 p-2 bg-gray-700 rounded hover:bg-gray-600"
                                title="Rotate 90deg"
                            >
                                <RotateCw size={16} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 italic mt-10">
                        Select a card position to edit details
                    </div>
                )}
            </aside>

            {/* Canvas */}
            <main className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,_#2a2a35_0%,_#0f0f13_100%)]">
                {/* Grid lines or center marker could go here */}
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ backgroundImage: 'radial-gradient(#4d4d4d 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0">
                    {positions.map(pos => (
                        <motion.div
                            key={pos.id}
                            drag
                            dragMomentum={false}
                            onDragEnd={(_, info) => {
                                // Update position (relative to center)
                                // We need to track the delta or absolute position. 
                                // Framer motion drag is relative to start.
                                // For a true designer, we might want to controlled mode or just save the final offset.
                                // But `info.offset` is cumulative per drag. 
                                // To simplest implement: update x/y in state.

                                // Limitation: Framer motion controlled drag is complex. 
                                // Easier: Let it be uncontrolled visual, but update state on end? 
                                // Actually, `x` and `y` in state are used for `initial` or `style`.
                                // If we use `x={pos.x} y={pos.y}` props on motion.div, it works.
                                // When dragging ends, we add delta to state.
                                const newX = pos.x + info.offset.x;
                                const newY = pos.y + info.offset.y;
                                // Wait, info.offset is for *that drag*. 
                                // Correct approach: use x/y in style, onDragEnd updates state, creates re-render.
                                // But re-render might reset drag if not careful.
                                // Let's try just updating state.
                                updatePosition(pos.id, { x: newX, y: newY });
                            }}
                            // Use layout prop to animate changes?
                            // Issue: passing `x` and `y` to motion.div sets the transform.
                            // If `drag` is enabled, it modifies transform.
                            // If we update state `x` passed to `style.left` or `animate.x`, it might conflict.
                            // Best practice for simple drag-to-position:
                            // Don't use `x/y` in animate. Use `style={{ left: pos.x, top: pos.y }}` and `drag`. 
                            // But `drag` uses transform.
                            // Simple solution: `dragListener={false}` handles and manual pointer events? No.

                            // Let's rely on visual placement for now and just log updates.
                            // Actually, standard approach:
                            // `x` and `y` in state.
                            // `style={{ x: pos.x, y: pos.y }}`
                            // `onDragEnd` -> update state with `pos.x + offset.x` ? No, `offset` is typically just for the gesture.
                            // `info.point.x` is absolute page.

                            // Let's stick to a simpler "click to select, drag to move" with `drag` prop
                            // and update state roughly.

                            className={`absolute w-24 h-40 border-2 rounded-lg flex items-center justify-center cursor-move shadow-lg backdrop-blur-sm transition-colors ${selectedPosId === pos.id ? 'border-tarot-accent bg-tarot-accent/10' : 'border-gray-500 bg-black/20'}`}
                            style={{ x: pos.x, y: pos.y }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPosId(pos.id);
                            }}
                            onDragEnd={(_, info) => {
                                updatePosition(pos.id, {
                                    x: pos.x + info.offset.x,
                                    y: pos.y + info.offset.y
                                });
                            }}
                        >
                            <div className="text-center p-2 pointer-events-none">
                                <div className="text-xs font-bold line-clamp-2">{pos.name}</div>
                                {pos.rotation ? <div className="text-[10px] opacity-70 mt-1">{pos.rotation}°</div> : null}
                            </div>

                            {/* Orientation indicator */}
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-current opacity-50" />
                        </motion.div>
                    ))}
                </div>

                {positions.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 pointer-events-none">
                        <p>Click "Add Card" to start designing a spread</p>
                    </div>
                )}
            </main>
        </div>
    );
};
