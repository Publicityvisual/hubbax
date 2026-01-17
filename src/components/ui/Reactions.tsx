import { motion } from 'framer-motion';

export const LikeReaction = () => (
  <motion.img 
    src="/assets/reactions/official/like.png" 
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
    src="/assets/reactions/official/love.png" 
    alt="Love" 
    className="w-full h-full object-contain drop-shadow-md"
    initial={{ scale: 1 }}
    animate={{ scale: [1, 1.15, 1] }} // Heartbeat
    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
  />
);

export const HahaReaction = () => (
  <motion.img 
    src="/assets/reactions/official/haha.png" 
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
    src="/assets/reactions/official/wow.png" 
    alt="Wow" 
    className="w-full h-full object-contain drop-shadow-md"
    animate={{ scale: [1, 1.05, 1] }} 
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);

export const SadReaction = () => (
  <motion.img 
    src="/assets/reactions/official/sad.png" 
    alt="Sad" 
    className="w-full h-full object-contain drop-shadow-md"
    animate={{ y: [0, 3, 0] }} // Subtle drooping
    transition={{ duration: 2, repeat: Infinity }}
  />
);

export const AngryReaction = () => (
  <motion.img 
    src="/assets/reactions/official/angry.png" 
    alt="Angry" 
    className="w-full h-full object-contain drop-shadow-md"
    animate={{ 
      x: [-1, 1, -1], 
      rotate: [-1, 1, -1] 
    }}
    transition={{ duration: 0.2, repeat: Infinity }} // Fast shake
  />
);
