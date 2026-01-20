import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REACTION_METADATA } from './ReactionMetadata';

interface ReactionSelectorProps {
  onSelect: (reaction: typeof REACTION_METADATA[0]) => void;
}

export function ReactionSelector({ onSelect }: ReactionSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* The Dock Container - Waterfall Entry */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 15 }}
        className="flex items-center gap-1 p-1 bg-[#242526]/98 backdrop-blur-3xl rounded-full shadow-[0_12px_28px_0_rgba(0,0,0,0.25)] border border-white/10 absolute bottom-full left-0 mb-4 z-50 origin-bottom-left"
      >
        {REACTION_METADATA.map((reaction, index) => (
          <div key={reaction.id} className="relative group">
            <motion.button
              className="relative w-11 h-11 flex items-center justify-center rounded-full focus:outline-none"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => onSelect(reaction)}
              initial={{ opacity: 0, y: 30, scale: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: hoveredIndex === index ? 1.5 : 1,
              }}
              transition={{
                scale: { type: "spring", stiffness: 450, damping: 15 },
                y: { type: "spring", stiffness: 350, damping: 20, delay: index * 0.035 },
                opacity: { duration: 0.15, delay: index * 0.035 }
              }}
              whileTap={{ scale: 0.85 }}
            >
              <div className="w-full h-full pointer-events-none p-0.5">
                <reaction.Component />
              </div>
            </motion.button>

            {/* Smart Tooltip (Pill) - High Tech Slide Up */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.5 }}
                  animate={{ opacity: 1, y: -48, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/95 backdrop-blur-xl text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full shadow-2xl z-50 pointer-events-none border border-white/5"
                >
                  {reaction.name}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-black/95"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
