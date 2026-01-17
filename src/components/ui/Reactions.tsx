import { motion } from 'framer-motion';

export const LikeReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <defs>
      <linearGradient id="likeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b96ff" />
        <stop offset="100%" stopColor="#0062cc" />
      </linearGradient>
      <filter id="likeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Main Circle */}
    <circle cx="50" cy="50" r="50" fill="url(#likeGradient)" />
    <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
    
    {/* Thumbs Up Icon - Hand */}
    <motion.path
      d="M28 58 L28 42 C28 40 30 38 32 38 L48 38 L52 24 C53 20 54 16 62 16 C68 16 66 28 66 32 L66 38 L82 38 C86 38 90 42 90 46 L90 62 C90 66 82 72 78 72 L32 72 C30 72 28 70 28 68 Z"
      fill="white"
      filter="url(#likeShadow)"
      initial={{ rotate: 0, y: 0 }}
      animate={{ 
        rotate: [0, -12, -8, -12, 0], 
        y: [0, -4, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.2, originY: 0.8 }}
    />
    
    {/* Sleeve detail */}
    <motion.path
      d="M28 68 L28 42"
      stroke="#004ba0"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ y: 0 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

export const LoveReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <defs>
      <radialGradient id="loveGradient" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ff5e62" />
        <stop offset="100%" stopColor="#d93025" />
      </radialGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#loveGradient)" />
    
    {/* Heart */}
    <motion.path
      d="M50 88 C50 88 12 58 12 35 C12 18 28 12 40 22 C45 26 50 35 50 35 C50 35 55 26 60 22 C72 12 88 18 88 35 C88 58 50 88 50 88 Z"
      fill="white"
      filter="url(#glow)"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.5, originY: 0.5 }}
    />
  </svg>
);

export const HahaReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
     <defs>
      <radialGradient id="faceGradient" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffe55e" />
        <stop offset="100%" stopColor="#f7b125" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#faceGradient)" />
    
    {/* Eyes - Squinting with improved curve */}
    <motion.path
      d="M18 38 Q30 30 42 38 M58 38 Q70 30 82 38"
      stroke="#3e2723"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      animate={{ d: ["M18 40 Q30 32 42 40 M58 40 Q70 32 82 40", "M18 35 Q30 27 42 35 M58 35 Q70 27 82 35", "M18 40 Q30 32 42 40 M58 40 Q70 32 82 40"] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    
    {/* Mouth - Opened Laugh */}
    <motion.path
      d="M20 58 Q50 95 80 58 Z"
      fill="#3e2723"
      animate={{ d: ["M20 58 Q50 90 80 58 Z", "M20 58 Q50 98 80 58 Z", "M20 58 Q50 90 80 58 Z"] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    {/* Tongue */}
    <motion.path
      d="M40 85 Q50 80 60 85"
      fill="#ff5e62"
      stroke="none"
      animate={{ y: [0, 2, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
  </svg>
);

export const WowReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <defs>
      <radialGradient id="wowGradient" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffe55e" />
        <stop offset="100%" stopColor="#f7b125" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#wowGradient)" />
    
    {/* Eyebrows used to be flat, now arched */}
    <motion.path
      d="M28 32 Q35 20 42 32 M58 32 Q65 20 72 32"
      stroke="#3e2723"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Eyes - Wide Open */}
    <ellipse cx="35" cy="45" rx="6" ry="8" fill="#3e2723" />
    <ellipse cx="65" cy="45" rx="6" ry="8" fill="#3e2723" />
    
    {/* Mouth - O shape with depth */}
    <motion.ellipse
      cx="50"
      cy="70"
      rx="12"
      ry="16"
      fill="#3e2723"
      animate={{ ry: [15, 20, 15], rx: [10, 14, 10] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

export const SadReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <defs>
      <radialGradient id="sadGradient" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffe55e" />
        <stop offset="100%" stopColor="#f7b125" />
      </radialGradient>
      <linearGradient id="tearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#87ceeb" />
        <stop offset="100%" stopColor="#2987F5" />
      </linearGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#sadGradient)" />
    
    {/* Eyebrows - Sad droop */}
    <path d="M25 35 Q35 28 45 40 M55 40 Q65 28 75 35" stroke="#3e2723" strokeWidth="4" fill="none" strokeLinecap="round" />
    
    {/* Eyes - Droopy */}
    <ellipse cx="35" cy="52" rx="6" ry="4" fill="#3e2723" />
    <ellipse cx="65" cy="52" rx="6" ry="4" fill="#3e2723" />
    
    {/* Mouth - Frown curve */}
    <path d="M35 78 Q50 65 65 78" stroke="#3e2723" strokeWidth="3" fill="none" strokeLinecap="round" />
    
    {/* Tear - detailed drop shape */}
    <motion.path
      d="M65 52 C65 52 72 65 72 70 C72 75 68 78 65 78 C62 78 58 75 58 70 C58 65 65 52 65 52 Z"
      fill="url(#tearGradient)"
      initial={{ y: -5, opacity: 0, scale: 0 }}
      animate={{ y: [0, 20], opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.2 }}
    />
  </svg>
);

export const AngryReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
    <defs>
      <linearGradient id="angryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff7043" />
        <stop offset="100%" stopColor="#d84315" />
      </linearGradient>
      <radialGradient id="flushInfo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff3d00" stopOpacity="0.4" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#angryGradient)" />
    {/* Face flush pulse */}
    <motion.circle 
      cx="50" cy="50" r="45" 
      fill="url(#flushInfo)" 
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity }}
    />

    {/* Eyebrows - Sharp V shape */}
    <motion.path
      d="M25 40 L45 52 M55 52 L75 40"
      stroke="#3e2723"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 0.3, repeat: Infinity }}
    />
    
    {/* Eyes - Small intense dots */}
    <circle cx="38" cy="58" r="4" fill="#3e2723" />
    <circle cx="62" cy="58" r="4" fill="#3e2723" />
    
    {/* Mouth - Grunt frown */}
    <path d="M42 78 Q50 72 58 78" stroke="#3e2723" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);
