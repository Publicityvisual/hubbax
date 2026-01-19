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
      {/* The Dock Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        className="flex items-center gap-1 p-1 bg-[#242526]/95 backdrop-blur-3xl rounded-full shadow-2xl border border-white/10 absolute bottom-full left-0 mb-3 z-50 origin-bottom-left"
      >
        {REACTION_METADATA.map((reaction, index) => (
          <div key={reaction.id} className="relative group">
            <motion.button
              className="relative w-10 h-10 flex items-center justify-center rounded-full focus:outline-none"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => onSelect(reaction)}
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: hoveredIndex === index ? 1.4 : 1,
              }}
              transition={{
                scale: { type: "spring", stiffness: 300, damping: 15 },
                y: { type: "spring", stiffness: 400, damping: 20, delay: index * 0.04 },
                opacity: { duration: 0.2, delay: index * 0.04 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              {/* The Reaction Component (3D Asset) */}
              <div className="w-full h-full pointer-events-none">
                <reaction.Component />
              </div>

            </motion.button>

            {/* Smart Tooltip (Pill) */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.8 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
                  className="absolute left-1/2 -translate-x-1/2 -top-2 whitespace-nowrap bg-black/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xl z-50 pointer-events-none"
                >
                  {reaction.name}
                  {/* Tiny arrow */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-black/90"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
