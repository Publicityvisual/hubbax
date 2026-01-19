import { motion } from 'framer-motion';

// --- AUTHENTIC ANIMATED ASSETS (Originals from Duy Tran's Flutter Demo) ---
// These are the exact GIF files used in the reference implementation.
// "Care" uses a high-res PNG fallback as it wasn't in the original 2018 set.
const reactionAssets = {
  like: "/assets/reactions/like.png",
  love: "/assets/reactions/love.png",
  care: "/assets/reactions/care.png", 
  haha: "/assets/reactions/haha.png",
  wow: "/assets/reactions/wow.png",
  sad: "/assets/reactions/sad.png",
  angry: "/assets/reactions/angry.png",
  // Secret / Premium Reactions (Better than FB)
  fire: "/assets/reactions/fire.png",
  rocket: "/assets/reactions/rocket.png"
};

// --- PHYSICS CONFIGURATION (Improved) ---
import { Transition } from 'framer-motion';

const bounceTransition: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 10,
    mass: 0.8
};

// --- REACTION COMPONENTS ---

export const LikeReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, rotate: -15, transition: bounceTransition }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.like} 
            alt="Like" 
            className="w-full h-full object-contain filter drop-shadow-lg"
        />
    </motion.div>
);

export const LoveReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, transition: bounceTransition }}
        animate={{ scale: [1, 1.15, 1] }} 
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.love} 
            alt="Love" 
            className="w-full h-full object-contain filter drop-shadow-lg"
        />
    </motion.div>
);

export const HahaReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, rotate: -10, transition: bounceTransition }}
        animate={{ rotate: [-5, 5, -5] }} 
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.haha} 
            alt="Haha" 
            className="w-full h-full object-contain filter drop-shadow-lg"
        />
    </motion.div>
);

export const WowReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, rotate: 5, transition: bounceTransition }}
        animate={{ scale: [1, 1.05, 1] }} 
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.wow} 
            alt="Wow" 
            className="w-full h-full object-contain filter drop-shadow-lg"
        />
    </motion.div>
);

export const SadReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, rotate: -5, transition: bounceTransition }}
        animate={{ rotate: [-2, 2, -2] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.sad} 
            alt="Sad" 
            className="w-full h-full object-contain filter drop-shadow-lg"
        />
    </motion.div>
);

export const AngryReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.35, rotate: 0, transition: bounceTransition }}
        animate={{ 
            x: [-2, 2, -1, 1, 0],
            scale: [1, 1.1, 1] 
        }} 
        transition={{ 
            x: { duration: 0.2, repeat: Infinity, repeatDelay: 1 }, 
            scale: { duration: 0.3, repeat: Infinity, repeatDelay: 1 }
        }}
    >
        <img 
            src={reactionAssets.angry} 
            alt="Angry" 
            className="w-full h-full object-contain filter drop-shadow-lg scale-110" // Slightly larger
        />
    </motion.div>
);

// High-Res PNG for Care (keeps it consistent with quality)
export const CareReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.3, rotate: 5, transition: bounceTransition }}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.care} 
            alt="Care" 
            className="w-full h-full object-contain filter drop-shadow-lg"
        />
    </motion.div>
);

// --- SECRET REACTIONS (Hubbax Exclusives) ---

export const FireReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.4, rotate: [-5, 5, -5], transition: bounceTransition }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }} // Flickering flame effect
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.fire} 
            alt="Lit" 
            className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,87,34,0.6)]"
        />
    </motion.div>
);

export const RocketReaction = () => (
    <motion.div className="w-full h-full p-0 flex items-center justify-center" 
        whileHover={{ scale: 1.4, y: -10, transition: bounceTransition }}
        animate={{ y: [0, -4, 0], rotate: [0, 2, 0] }} // Hovering/Floating
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <img 
            src={reactionAssets.rocket} 
            alt="Rocket" 
            className="w-full h-full object-contain filter drop-shadow-lg"
        />
    </motion.div>
);

// --- EXPORTABLE REACTION LIST (For Dock/Selector) ---
export const REACTION_METADATA = [
  { id: 'like', name: 'Me gusta', Component: LikeReaction, color: '#29b6f6' },
  { id: 'love', name: 'Me encanta', Component: LoveReaction, color: '#f44336' },
  { id: 'care', name: 'Me importa', Component: CareReaction, color: '#fbc02d' },
  { id: 'haha', name: 'Me divierte', Component: HahaReaction, color: '#fbc02d' },
  { id: 'wow', name: 'Me asombra', Component: WowReaction, color: '#fbc02d' },
  { id: 'sad', name: 'Me entristece', Component: SadReaction, color: '#fbc02d' },
  { id: 'angry', name: 'Me enoja', Component: AngryReaction, color: '#e64a19' },
  // Secret / Premium
  { id: 'fire', name: '¡Está que arde!', Component: FireReaction, color: '#ff5722' },
  { id: 'rocket', name: '¡Despegando!', Component: RocketReaction, color: '#2979ff' },
];
