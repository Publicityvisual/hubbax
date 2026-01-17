import { motion } from 'framer-motion';

// Common Gloss for 3D Sphere Effect
const HeadGloss = () => (
  <path
    d="M50 2 C76.5 2 98 23.5 98 50 C98 55 96 60 94 64 C94 40 76 18 50 18 C24 18 6 40 6 64 C4 60 2 55 2 50 C2 23.5 23.5 2 50 2 Z"
    fill="white"
    fillOpacity="0.2"
    pointerEvents="none"
  />
);

export const LikeReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <linearGradient id="fbBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1877F2" />
        <stop offset="100%" stopColor="#166fe5" />
      </linearGradient>
      <filter id="thumbShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Blue Circle Background */}
    <circle cx="50" cy="50" r="50" fill="url(#fbBlue)" />
    <circle cx="50" cy="50" r="50" fill="url(#fbBlue)" stroke="white" strokeWidth="2" strokeOpacity="0.1" />
    
    <HeadGloss />

    {/* White Thumbs Up - Accurate Shape */}
    <motion.path
      d="M28 62 L28 46 C28 44 30 42 32 42 L48 42 L52 28 C53 24 54 20 62 20 C68 20 66 32 66 36 L66 42 L82 42 C86 42 90 46 90 50 L90 66 C90 70 82 76 78 76 L32 76 C30 76 28 74 28 72 Z"
      fill="white"
      filter="url(#thumbShadow)"
      initial={{ rotate: -5, y: 0, scale: 0.9 }}
      animate={{ 
        rotate: [-5, -20, -10, -20, -5], 
        scale: [0.9, 1.1, 0.9]
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.1, originY: 0.9 }}
    />
  </svg>
);

export const LoveReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <radialGradient id="fbLove" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#F3425F" />
        <stop offset="100%" stopColor="#d93025" />
      </radialGradient>
      <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#fbLove)" />
    <HeadGloss />
    
    {/* Heart Shape - Puffy */}
    <motion.path
      d="M50 85 C50 85 12 58 12 35 C12 18 28 12 40 22 C45 26 50 35 50 35 C50 35 55 26 60 22 C72 12 88 18 88 35 C88 58 50 85 50 85 Z"
      fill="white"
      filter="url(#softGlow)"
      initial={{ scale: 0.8 }}
      animate={{ scale: [0.8, 1, 0.8] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.5, originY: 0.5 }}
    />
  </svg>
);

export const HahaReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
     <defs>
      <radialGradient id="fbYellow" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFEA00" /> {/* Brighter Center */}
        <stop offset="60%" stopColor="#F7B125" />
        <stop offset="100%" stopColor="#F99B1C" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#fbYellow)" />
    <HeadGloss />
    
    {/* Eyes - Squinting (Correct V shape) */}
    <motion.path
      d="M15 40 L28 32 L40 40 M60 40 L72 32 L85 40"
      stroke="#593a0e" 
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: [0, 2, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    
    {/* Mouth - Open Laugh */}
    <motion.path
      d="M20 58 Q50 95 80 58 Z"
      fill="#593a0e"
      animate={{ d: ["M20 58 Q50 90 80 58 Z", "M20 58 Q50 98 80 58 Z", "M20 58 Q50 90 80 58 Z"] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    {/* Tongue */}
    <circle cx="50" cy="85" r="10" fill="#EB3F5E" />
  </svg>
);

export const WowReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <radialGradient id="fbWow" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFEA00" />
        <stop offset="60%" stopColor="#F7B125" />
        <stop offset="100%" stopColor="#F99B1C" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#fbWow)" />
    <HeadGloss />
    
    {/* Eyebrows - High Arched */}
    <motion.path
      d="M28 32 Q35 22 42 32 M58 32 Q65 22 72 32"
      stroke="#593a0e"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Eyes - Ovals */}
    <ellipse cx="35" cy="48" rx="7" ry="9" fill="#593a0e" />
    <ellipse cx="65" cy="48" rx="7" ry="9" fill="#593a0e" />
    
    {/* Mouth - Tall O */}
    <motion.ellipse
      cx="50"
      cy="72"
      rx="12"
      ry="18"
      fill="#593a0e"
      animate={{ ry: [16, 22, 16], rx: [10, 14, 10] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

export const SadReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <radialGradient id="fbSad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFEA00" />
        <stop offset="60%" stopColor="#F7B125" />
        <stop offset="100%" stopColor="#F99B1C" />
      </radialGradient>
      <linearGradient id="realTear" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#bde6ff" />
        <stop offset="100%" stopColor="#5CA1D6" />
      </linearGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#fbSad)" />
    <HeadGloss />
    
    {/* Eyebrows - Sad droop (inverted V) */}
    <path d="M25 40 Q35 32 45 42 M55 42 Q65 32 75 40" stroke="#593a0e" strokeWidth="4" fill="none" strokeLinecap="round" />
    
    {/* Eyes - Droopy */}
    <ellipse cx="35" cy="55" rx="7" ry="5" fill="#593a0e" />
    <ellipse cx="65" cy="55" rx="7" ry="5" fill="#593a0e" />
    
    {/* Mouth - Sad Curve */}
    <path d="M35 80 Q50 68 65 80" stroke="#593a0e" strokeWidth="3" fill="none" strokeLinecap="round" />
    
    {/* Tear - Single Drop */}
    <motion.path
      d="M65 55 C65 55 72 68 72 73 C72 78 68 81 65 81 C62 81 58 78 58 73 C58 68 65 55 65 55 Z"
      fill="url(#realTear)"
      stroke="#4080bf"
      strokeWidth="1"
      initial={{ y: -5, opacity: 0, scale: 0 }}
      animate={{ y: [0, 25], opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.2 }}
    />
  </svg>
);

export const AngryReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <radialGradient id="fbAngry" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FF7D58" /> {/* Highlight */}
        <stop offset="50%" stopColor="#ED4E32" /> {/* Main Red-Orange */}
        <stop offset="100%" stopColor="#B02316" /> {/* Shadow */}
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#fbAngry)" />
    <HeadGloss />
    
    {/* Eyebrows - Drawn down hard */}
    <motion.path
      d="M25 45 L48 55 M52 55 L75 45"
      stroke="#721c24"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 0.3, repeat: Infinity }}
    />
    
    {/* Eyes - Small & Mean */}
    <circle cx="38" cy="62" r="5" fill="#721c24" />
    <circle cx="62" cy="62" r="5" fill="#721c24" />
    
    {/* Mouth - Grunt frown */}
    <path d="M42 82 Q50 78 58 82" stroke="#721c24" strokeWidth="3" fill="none" strokeLinecap="round" />
    
    {/* Flush Effect */}
    <motion.circle 
      cx="50" cy="50" r="50" 
      fill="#FF0000" 
      fillOpacity="0.3"
      animate={{ opacity: [0, 0.4, 0] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
  </svg>
);
