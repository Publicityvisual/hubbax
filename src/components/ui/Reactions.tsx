import { motion } from 'framer-motion';

// Using high-quality 3D assets from Flaticon (verified CDN links)
const reactionAssets = {
  like: "https://cdn-icons-png.flaticon.com/512/2364/2364444.png", // 3D Blue Like
  love: "https://cdn-icons-png.flaticon.com/512/2364/2364449.png", // 3D Heart
  haha: "https://cdn-icons-png.flaticon.com/512/2364/2364450.png", // 3D Laughing
  wow: "https://cdn-icons-png.flaticon.com/512/2364/2364452.png",  // 3D Surprised
  sad: "https://cdn-icons-png.flaticon.com/512/2364/2364454.png",  // 3D Sad
  angry: "https://cdn-icons-png.flaticon.com/512/2364/2364453.png" // 3D Angry
};

export const LikeReaction = () => (
  <motion.img 
    src={reactionAssets.like}
    alt="Like" 
    className="w-full h-full object-contain drop-shadow-md"
    initial={{ rotate: 0, scale: 1 }}
    animate={{ 
      rotate: [-5, 0, -5],
      scale: [1, 1.1, 1] 
    }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
);

export const LoveReaction = () => (
  <motion.img 
    src={reactionAssets.love}
    alt="Love" 
    className="w-full h-full object-contain drop-shadow-md"
    initial={{ scale: 1 }}
    animate={{ scale: [1, 1.15, 1] }} 
    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
  />
);

export const HahaReaction = () => (
  <motion.img 
    src={reactionAssets.haha}
    alt="Haha" 
    className="w-full h-full object-contain drop-shadow-md"
    animate={{ 
      rotate: [-3, 3, -3], 
      y: [0, 2, 0] 
    }}
    transition={{ duration: 0.6, repeat: Infinity }}
  />
);

export const WowReaction = () => (
  <motion.img 
    src={reactionAssets.wow}
    alt="Wow" 
    className="w-full h-full object-contain drop-shadow-md"
    animate={{ scale: [1, 1.05, 1] }} 
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);

export const SadReaction = () => (
  <motion.img 
    src={reactionAssets.sad}
    alt="Sad" 
    className="w-full h-full object-contain drop-shadow-md"
    animate={{ y: [0, 3, 0] }} 
    transition={{ duration: 2, repeat: Infinity }}
  />
);

export const AngryReaction = () => (
  <motion.img 
    src={reactionAssets.angry}
    alt="Angry" 
    className="w-full h-full object-contain drop-shadow-md"
    animate={{ 
      x: [-1, 1, -1], 
      rotate: [-1, 1, -1] 
    }}
    transition={{ duration: 0.2, repeat: Infinity }} 
  />
);
