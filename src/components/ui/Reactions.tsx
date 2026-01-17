import { motion } from 'framer-motion';

export const LikeReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    <circle cx="50" cy="50" r="50" fill="#2987F5" />
    <motion.path
      d="M30 65 L30 40 L50 40 L55 25 C55 25 55 15 65 15 C75 15 70 30 70 35 L70 40 L85 40 C90 40 95 45 95 50 L95 65 C95 70 85 75 80 75 L30 75 Z"
      fill="white"
      stroke="white"
      strokeWidth="2"
      initial={{ rotate: 0, y: 0 }}
      animate={{ rotate: [0, -15, 0], y: [0, -5, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

export const LoveReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    <defs>
      <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff5e62" />
        <stop offset="100%" stopColor="#d93025" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#loveGradient)" />
    <motion.path
      d="M50 85 C50 85 15 60 15 35 C15 20 30 15 40 25 L50 35 L60 25 C70 15 85 20 85 35 C85 60 50 85 50 85 Z"
      fill="white"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1, 1.1, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.5, originY: 0.5 }}
    />
  </svg>
);

export const HahaReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <circle cx="50" cy="50" r="50" fill="#F7B125" />
    {/* Eyes - Squinting */}
    <motion.path
      d="M20 35 Q30 30 40 35 M60 35 Q70 30 80 35"
      stroke="#1f1f1f"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      animate={{ d: ["M20 38 Q30 33 40 38 M60 38 Q70 33 80 38", "M20 32 Q30 27 40 32 M60 32 Q70 27 80 32", "M20 38 Q30 33 40 38 M60 38 Q70 33 80 38"] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    {/* Mouth - Laughing */}
    <motion.path
      d="M25 55 Q50 90 75 55 Z"
      fill="#1f1f1f"
      animate={{ d: ["M25 55 Q50 85 75 55 Z", "M25 55 Q50 95 75 55 Z", "M25 55 Q50 85 75 55 Z"] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    <motion.path
      d="M25 55 Q50 90 75 55"
      fill="#fff"
      opacity="0" // Teeth hidden initially
    />
  </svg>
);

export const WowReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    <circle cx="50" cy="50" r="50" fill="#F7B125" />
    {/* Eyebrows */}
    <motion.path
      d="M25 30 Q35 20 45 30 M55 30 Q65 20 75 30"
      stroke="#1f1f1f"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    {/* Eyes */}
    <ellipse cx="35" cy="45" rx="5" ry="8" fill="#1f1f1f" />
    <ellipse cx="65" cy="45" rx="5" ry="8" fill="#1f1f1f" />
    {/* Mouth */}
    <motion.ellipse
      cx="50"
      cy="70"
      rx="10"
      ry="15"
      fill="#1f1f1f"
      animate={{ ry: [12, 18, 12], rx: [8, 12, 8] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

export const SadReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    <circle cx="50" cy="50" r="50" fill="#F7B125" />
    {/* Eyebrows - Sad */}
    <path d="M25 35 Q35 30 45 40 M55 40 Q65 30 75 35" stroke="#1f1f1f" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="35" cy="50" r="5" fill="#1f1f1f" />
    <circle cx="65" cy="50" r="5" fill="#1f1f1f" />
    {/* Mouth - Frown */}
    <path d="M35 75 Q50 65 65 75" stroke="#1f1f1f" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Tear */}
    <motion.path
      d="M65 55 Q65 65 65 75"
      stroke="#58CCF5"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1], opacity: [0, 1, 0], y: [0, 10] }}
      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.5 }}
    />
  </svg>
);

export const AngryReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    <defs>
      <linearGradient id="angryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff8c00" />
        <stop offset="100%" stopColor="#d93025" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#angryGradient)" />
    {/* Eyebrows - Angry */}
    <motion.path
      d="M25 40 L45 50 M55 50 L75 40"
      stroke="#1f1f1f"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, 2, 0] }}
      transition={{ duration: 0.3, repeat: Infinity }}
    />
    {/* Eyes */}
    <circle cx="35" cy="55" r="4" fill="#1f1f1f" />
    <circle cx="65" cy="55" r="4" fill="#1f1f1f" />
    {/* Mouth - Grunt */}
    <path d="M40 75 Q50 70 60 75" stroke="#1f1f1f" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);
