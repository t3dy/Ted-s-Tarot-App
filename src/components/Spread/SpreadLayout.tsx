import React from 'react';
import type { Spread, TarotCard as TarotCardType } from '../../types/tarot';
import { TarotCard } from '../Card/TarotCard';

interface SpreadLayoutProps {
    spread: Spread;
    cards?: Record<string, { card: TarotCardType; isReversed: boolean; isRevealed: boolean }>;
    onPositionClick?: (positionId: string) => void;
}

export const SpreadLayout: React.FC<SpreadLayoutProps> = ({ spread, cards = {}, onPositionClick }) => {
    // Calculate center offset to center the spread in the view
    // Find min/max x and y
    const xs = spread.positions.map(p => p.x);
    const ys = spread.positions.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const width = maxX - minX + 200; // basic padding/card width buffer
    const height = maxY - minY + 300;

    return (
        <div className="relative w-full h-full overflow-auto bg-tarot-dark flex items-center justify-center min-h-[600px]">
            <div
                className="relative transition-all duration-500"
                style={{
                    width: width,
                    height: height,
                    transform: 'scale(0.8)', // Initial scale to fit
                }}
            >
                {spread.positions.map((pos) => {
                    const assigned = cards[pos.id];
                    return (
                        <div
                            key={pos.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                            style={{
                                left: pos.x - minX + 100, // Offset to make positive
                                top: pos.y - minY + 150,
                            }}
                        >
                            <label className="absolute -top-6 w-40 -left-10 text-center text-xs text-tarot-text opacity-70 pointer-events-none">
                                {pos.id}. {pos.name}
                            </label>

                            <div
                                className="relative"
                                style={{ transform: `rotate(${pos.rotation || 0}deg)` }}
                            >
                                <TarotCard
                                    card={assigned?.card}
                                    isReversed={assigned?.isReversed}
                                    isRevealed={assigned?.isRevealed}
                                    onClick={() => onPositionClick && onPositionClick(pos.id)}
                                />

                                {!assigned && (
                                    <div className="absolute inset-0 border-2 border-dashed border-tarot-accent/30 rounded-lg pointer-events-none" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
