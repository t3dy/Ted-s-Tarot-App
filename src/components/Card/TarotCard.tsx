import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { TarotCard as TarotCardType } from '../../types/tarot';

interface TarotCardProps {
    card?: TarotCardType;
    isReversed?: boolean;
    isRevealed?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const TarotCard: React.FC<TarotCardProps> = ({
    card,
    isReversed = false,
    isRevealed = false,
    onClick,
    className,
    style
}) => {
    return (
        <div
            className={clsx("relative w-32 h-52 perspective-1000 cursor-pointer", className)}
            onClick={onClick}
            style={style}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-transform duration-700"
                animate={{ rotateY: isRevealed ? 180 : 0 }}
                initial={false}
            >
                {/* Card Back */}
                <div
                    className="absolute w-full h-full backface-hidden bg-tarot-panel border-2 border-tarot-accent convert-3d rounded-lg flex items-center justify-center shadow-lg"
                >
                    <div className="w-full h-full bg-[url('/assets/card-back.png')] bg-cover bg-center opacity-80 rounded-lg">
                        {/* Fallback pattern if image missing */}
                        <div className="w-full h-full bg-gradient-to-br from-tarot-panel to-black opacity-50 flex items-center justify-center">
                            <span className="text-tarot-accent text-2xl">★</span>
                        </div>
                    </div>
                </div>

                {/* Card Front */}
                <div
                    className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-xl overflow-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className={clsx(
                        "w-full h-full flex flex-col relative",
                        isReversed && "rotate-180"
                    )}>
                        {card ? (
                            <>
                                {card.imgUrl ? (
                                    <img src={card.imgUrl} alt={card.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-black p-2 text-center">
                                        {card.name}
                                    </div>
                                )}

                                {/* Overlay name (optional) */}
                                <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs text-center py-1">
                                    {card.name}
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full bg-gray-300" />
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
