import { motion } from 'framer-motion';

// Common Gloss Overlay for "3D Sphere" look
const SphereGloss = () => (
  <path
    d="M50 2 C76.5 2 98 23.5 98 50 C98 55 96 60 94 64 C94 40 76 18 50 18 C24 18 6 40 6 64 C4 60 2 55 2 50 C2 23.5 23.5 2 50 2 Z"
    fill="white"
    fillOpacity="0.15"
    pointerEvents="none"
  />
);

export const LikeReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <defs>
      <linearGradient id="likeBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1877F2" />
        <stop offset="100%" stopColor="#0866FF" />
      </linearGradient>
      <filter id="thumbDrop" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#likeBlue)" />
    <circle cx="50" cy="50" r="49" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
    <SphereGloss />
    
    {/* Correct Thumb Shape */}
    <motion.path
      d="M30 65 L30 46 C30 42 34 38 38 40 L50 40 L53 26 C54 20 56 16 63 16 C68 16 67 28 67 32 L67 40 L82 40 C87 40 91 44 91 49 L91 66 C91 71 85 76 80 76 L35 76 C32 76 30 74 30 72 Z"
      fill="white"
      filter="url(#thumbDrop)"
      initial={{ rotate: -10, y: 0, scale: 0.9 }}
      animate={{ 
        rotate: [-10, -25, -15, -25, -10], 
        scale: [0.9, 1.1, 0.9]
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.1, originY: 0.9 }}
    />
    {/* Sleeve */}
    <path d="M30 75 L30 46" stroke="#0654bc" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const LoveReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
     <defs>
      <radialGradient id="loveRed" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#F3425F" />
        <stop offset="100%" stopColor="#D21133" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#loveRed)" />
    <SphereGloss />
    
    {/* Puffy Heart */}
    <motion.path
      d="M50 88 C50 88 12 58 12 35 C12 18 28 12 40 22 C45 26 50 35 50 35 C50 35 55 26 60 22 C72 12 88 18 88 35 C88 58 50 88 50 88 Z"
      fill="white"
      initial={{ scale: 0.8 }}
      animate={{ scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.5, originY: 0.5 }}
    />
  </svg>
);

export const HahaReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <defs>
      <radialGradient id="faceYellow" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFEA00" />
        <stop offset="100%" stopColor="#F99B1C" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#faceYellow)" />
    <SphereGloss />
    
    {/* Squint Eyes (>< shape but authentic) */}
    <motion.path
      d="M18 40 L30 32 L42 40 M58 40 L70 32 L82 40"
      stroke="#593a0e"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: [0, 2, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    
    {/* Mouth */}
    <motion.path
      d="M20 58 Q50 95 80 58 Z"
      fill="#593a0e"
      animate={{ d: ["M20 58 Q50 90 80 58 Z", "M20 58 Q50 98 80 58 Z", "M20 58 Q50 90 80 58 Z"] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    {/* Tongue */}
    <circle cx="50" cy="85" r="12" fill="#FA4664" />
  </svg>
);

export const WowReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
     <defs>
      <radialGradient id="faceYellowWow" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFEA00" />
        <stop offset="100%" stopColor="#F99B1C" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#faceYellowWow)" />
    <SphereGloss />
    
    {/* Eyebrows */}
    <motion.path
      d="M28 32 Q35 22 42 32 M58 32 Q65 22 72 32"
      stroke="#593a0e"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Eyes */}
    <ellipse cx="35" cy="48" rx="6" ry="8" fill="#593a0e" />
    <ellipse cx="65" cy="48" rx="6" ry="8" fill="#593a0e" />
    
    {/* Mouth */}
    <motion.ellipse
      cx="50"
      cy="70"
      rx="12"
      ry="16"
      fill="#593a0e"
      animate={{ ry: [16, 20, 16], rx: [10, 13, 10] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

export const SadReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <defs>
      <radialGradient id="faceYellowSad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFEA00" />
        <stop offset="100%" stopColor="#F99B1C" />
      </radialGradient>
       <linearGradient id="tearDrop" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#87ceeb" />
        <stop offset="100%" stopColor="#2987F5" />
      </linearGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#faceYellowSad)" />
    <SphereGloss />
    
    {/* Eyebrows - Sad curved up */}
    <path d="M25 40 Q35 30 45 42 M55 42 Q65 30 75 40" stroke="#593a0e" strokeWidth="4" fill="none" strokeLinecap="round" />
    
    {/* Eyes - Droopy */}
    <ellipse cx="35" cy="55" rx="7" ry="5" fill="#593a0e" />
    <ellipse cx="65" cy="55" rx="7" ry="5" fill="#593a0e" />
    
    {/* Mouth - Sad Curve */}
    <path d="M35 80 Q50 68 65 80" stroke="#593a0e" strokeWidth="3" fill="none" strokeLinecap="round" />
    
    {/* Tear */}
    <motion.path
      d="M65 55 C65 55 72 68 72 73 C72 78 68 81 65 81 C62 81 58 78 58 73 C58 68 65 55 65 55 Z"
      fill="url(#tearDrop)"
      initial={{ y: -5, opacity: 0, scale: 0 }}
      animate={{ y: [0, 25], opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.2 }}
    />
  </svg>
);

export const AngryReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <defs>
      <radialGradient id="faceAngry" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#F3425F" />
        <stop offset="60%" stopColor="#E02844" />
        <stop offset="100%" stopColor="#B01228" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#faceAngry)" />
    <SphereGloss />
    
    {/* Eyebrows */}
    <motion.path
      d="M25 45 L48 55 M52 55 L75 45"
      stroke="#7B1E28"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 0.3, repeat: Infinity }}
    />
    
    {/* Eyes */}
    <circle cx="38" cy="62" r="5" fill="#7B1E28" />
    <circle cx="62" cy="62" r="5" fill="#7B1E28" />
    
    {/* Mouth */}
    <path d="M42 82 Q50 78 58 82" stroke="#7B1E28" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);
