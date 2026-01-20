import { motion } from 'framer-motion';
import { bounceTransition, reactionAssets } from '../../data/reactionData';

// --- REACTION COMPONENTS ---

export const LikeReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center"
        whileHover={{ scale: 1.3, rotate: -15 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: [0, -5, 5, -5, 0],
          y: [0, -2, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          scale: { type: "spring", stiffness: 450, damping: 10 } 
        }}>
        <img 
            src={reactionAssets.like} 
            alt="Like" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const LoveReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.15, 1] }} 
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          ease: "easeInOut",
          scale: { type: "spring", stiffness: 350, damping: 12 }
        }}>
        <img 
            src={reactionAssets.love} 
            alt="Love" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const HahaReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -4, 0], rotate: [0, -5, 5, 0] }} 
        transition={{ 
          duration: 0.6, 
          repeat: Infinity, 
          ease: "linear"
        }}>
        <img 
            src={reactionAssets.haha} 
            alt="Haha" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const WowReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, -3, 3, 0] }} 
        transition={{ 
          duration: 1.2, 
          repeat: Infinity, 
          ease: "easeInOut",
          scale: { type: "spring", stiffness: 350 }
        }}>
        <img 
            src={reactionAssets.wow} 
            alt="Wow" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const SadReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, y: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, 2, 0] }} 
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          scale: { type: "spring", stiffness: 300 }
        }}>
        <img 
            src={reactionAssets.sad} 
            alt="Sad" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const AngryReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.35, rotate: 0, transition: bounceTransition }}
        animate={{ 
            x: [-1.5, 1.5, -1.5],
            scale: [1, 1.05, 1] 
        }} 
        transition={{ duration: 0.2, repeat: Infinity }}
    >
        <img 
            src={reactionAssets.angry} 
            alt="Angry" 
            className="w-full h-full object-contain scale-110"
        />
    </motion.div>
);

// High-Res PNG for Care (keeps it consistent with quality)
export const CareReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.25, rotate: 5, transition: bounceTransition }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -3, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.care} 
            alt="Care" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

// --- SECRET REACTIONS (Hubbax Exclusives) ---

export const FireReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.4, transition: bounceTransition }}
        animate={{ scale: [1, 1.1, 0.95, 1.05, 1], opacity: [0.8, 1, 0.9, 1] }} // Intense flickering
        transition={{ duration: 0.6, repeat: Infinity }}>
        <img 
            src={reactionAssets.fire} 
            alt="Lit" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);


// Metadata moved to ReactionMetadata.tsx to fix Fast Refresh warning
