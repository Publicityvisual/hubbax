import { motion } from 'framer-motion';
import { bounceTransition, reactionAssets } from '../../data/reactionData';

// --- REACTION COMPONENTS ---

export const LikeReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.25, rotate: -15, transition: bounceTransition }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: [0, -5, 0] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.like} 
            alt="Like" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const LoveReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, transition: bounceTransition }}
        animate={{ scale: [1, 1.2, 1] }} 
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.love} 
            alt="Love" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const HahaReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.25, rotate: -10, transition: bounceTransition }}
        animate={{ rotate: [-8, 8, -8], scale: [1, 1.1, 1] }} 
        transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}>
        <img 
            src={reactionAssets.haha} 
            alt="Haha" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const WowReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.25, rotate: 5, transition: bounceTransition }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] }} 
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.wow} 
            alt="Wow" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const SadReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.25, rotate: -5, transition: bounceTransition }}
        animate={{ rotate: [-3, 3, -3], y: [0, 2, 0] }} 
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
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

export const RocketReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.4, y: -20, transition: bounceTransition }}
        animate={{ y: [0, -3, 1, -2, 0], x: [-1, 1, -1, 0] }} // Engine rumble
        transition={{ duration: 0.3, repeat: Infinity }}>
        <img 
            src={reactionAssets.rocket} 
            alt="Rocket" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const FlowerReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, rotate: 180, transition: { duration: 1 } }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} // Gentle bloom sway
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.flower} 
            alt="Thankful" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const PrideReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, transition: bounceTransition }}
        animate={{ scale: [1, 1.25, 0.95, 1.1, 1] }} // Strong, proud heartbeat
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.pride} 
            alt="Pride" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

export const PlaneReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ x: 200, opacity: 0, transition: { duration: 0.5 } }} // Fly away on hover!
        animate={{ x: [-2, 2, -1, 3, 0], y: [1, -1, 2, -2, 0] }} // The famous GLITCH effect
        transition={{ duration: 0.2, repeat: Infinity }}>
        <img 
            src={reactionAssets.plane} 
            alt="Plane" 
            className="w-full h-full object-contain"
        />
    </motion.div>
);

// Metadata moved to ReactionMetadata.tsx to fix Fast Refresh warning
