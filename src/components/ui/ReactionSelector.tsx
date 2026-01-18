import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REACTION_METADATA } from './Reactions';

interface ReactionSelectorProps {
  onSelect: (reaction: typeof REACTION_METADATA[0]) => void;
}

export function ReactionSelector({ onSelect }: ReactionSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-[#242526] rounded-full shadow-2xl border border-black/5 dark:border-white/10 p-1.5 flex items-center gap-2 absolute bottom-full left-0 mb-2 z-50 origin-bottom-left will-change-transform">
      {REACTION_METADATA.map((reaction, index) => (
        <div key={reaction.id} className="relative group">
          <motion.div
            className="w-[42px] h-[42px] cursor-pointer relative"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ 
              scale: hoveredIndex === index ? 1.4 : 1,
              opacity: 1, 
              y: hoveredIndex === index ? -10 : 0, 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15,
              delay: index * 0.03 // Staggered entrance
            }}
            onClick={() => onSelect(reaction)}
          >
            <reaction.Component />
          </motion.div>

          {/* Floating Label (Tooltip) */}
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
                className="absolute left-1/2 -translate-x-1/2 top-0 whitespace-nowrap bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg pointer-events-none z-50"
              >
                {reaction.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
