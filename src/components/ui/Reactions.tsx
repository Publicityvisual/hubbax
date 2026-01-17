import { motion } from 'framer-motion';

// Common Gloss Overlay for "Glass/Plastic" Look
const GlossOverlay = () => (
  <path
    d="M50 2 C76.5 2 98 23.5 98 50 C98 55 96 60 94 64 C94 40 76 18 50 18 C24 18 6 40 6 64 C4 60 2 55 2 50 C2 23.5 23.5 2 50 2 Z"
    fill="white"
    fillOpacity="0.15"
    pointerEvents="none"
  />
);

const SpecularHighlight = () => (
  <ellipse cx="50" cy="20" rx="30" ry="12" fill="white" fillOpacity="0.25" filter="url(#blurHighlight)" />
);

export const LikeReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <linearGradient id="likeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4e8cff" />
        <stop offset="50%" stopColor="#0666eb" />
        <stop offset="100%" stopColor="#004ba0" />
      </linearGradient>
      <filter id="likeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.4"/>
      </filter>
      <filter id="blurHighlight">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
    </defs>
    
    {/* Main Circle with Depth */}
    <circle cx="50" cy="50" r="50" fill="url(#likeGradient)" />
    
    {/* Specular Highlight Top */}
    <SpecularHighlight />
    
    {/* Rim Light Bottom */}
    <path d="M20 85 Q50 100 80 85" stroke="white" strokeWidth="2" strokeOpacity="0.3" fill="none" strokeLinecap="round" />
    
    {/* Gloss Overlay */}
    <GlossOverlay />
    
    {/* Border Ring */}
    <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" />
    
    {/* Thumbs Up Icon - Hand with Shadow */}
    <motion.path
      d="M28 60 L28 44 C28 42 30 40 32 40 L48 40 L52 26 C53 22 54 18 62 18 C68 18 66 30 66 34 L66 40 L82 40 C86 40 90 44 90 48 L90 64 C90 68 82 74 78 74 L32 74 C30 74 28 72 28 70 Z"
      fill="white"
      filter="url(#likeShadow)"
      initial={{ rotate: 0, y: 0 }}
      animate={{ 
        rotate: [0, -15, -5, -15, 0], 
        y: [0, -5, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.2, originY: 0.8 }}
    />
    
    {/* Sleeve detail */}
    <motion.path
      d="M28 70 L28 44"
      stroke="#003c80"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ y: 0 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

export const LoveReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <radialGradient id="loveGradient" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#ff758c" />
        <stop offset="40%" stopColor="#ff3d57" />
        <stop offset="100%" stopColor="#b3002d" />
      </radialGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="blurHighlight">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
      </filter>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#loveGradient)" />
    
    {/* Specular Highlight Top */}
    <SpecularHighlight />
    
     {/* Rim Light Bottom */}
    <path d="M25 88 Q50 98 75 88" stroke="#ffb3c1" strokeWidth="2" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
    
    {/* Gloss Overlay */}
    <GlossOverlay />
    
    {/* Heart with Glow */}
    <motion.path
      d="M50 88 C50 88 12 58 12 35 C12 18 28 12 40 22 C45 26 50 35 50 35 C50 35 55 26 60 22 C72 12 88 18 88 35 C88 58 50 88 50 88 Z"
      fill="white"
      filter="url(#glow)"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.5, originY: 0.5 }}
    />
  </svg>
);

export const HahaReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
     <defs>
      <radialGradient id="faceGradient" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffeb80" />
        <stop offset="50%" stopColor="#f7b125" />
        <stop offset="100%" stopColor="#e09200" />
      </radialGradient>
      <filter id="blurHighlight">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
      <filter id="mouthShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#faceGradient)" />
    
    {/* Specular Highlight Top */}
    <SpecularHighlight />
    
    {/* Gloss Overlay */}
    <GlossOverlay />
    
    {/* Eyes - Squinting with improved curve and shadow */}
    <motion.path
      d="M18 42 Q30 32 42 42 M58 42 Q70 32 82 42"
      stroke="#3e2723"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      filter="url(#mouthShadow)"
      animate={{ d: ["M18 44 Q30 34 42 44 M58 44 Q70 34 82 44", "M18 38 Q30 28 42 38 M58 38 Q70 28 82 38", "M18 44 Q30 34 42 44 M58 44 Q70 34 82 44"] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    
    {/* Mouth - Opened Laugh */}
    <motion.path
      d="M20 60 Q50 100 80 60 Z"
      fill="#3e2723"
      animate={{ d: ["M20 60 Q50 95 80 60 Z", "M20 60 Q50 105 80 60 Z", "M20 60 Q50 95 80 60 Z"] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
    {/* Tongue - Moving */}
    <motion.path
      d="M40 90 Q50 85 60 90"
      fill="#ff5e62"
      stroke="none"
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
  </svg>
);

export const WowReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <radialGradient id="wowGradient" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffeb80" />
        <stop offset="50%" stopColor="#f7b125" />
        <stop offset="100%" stopColor="#e09200" />
      </radialGradient>
      <filter id="blurHighlight">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#wowGradient)" />
    
    {/* Specular Highlight Top */}
    <SpecularHighlight />
    
    {/* Gloss Overlay */}
    <GlossOverlay />
    
    {/* Eyebrows - Arched */}
    <motion.path
      d="M28 35 Q35 22 42 35 M58 35 Q65 22 72 35"
      stroke="#3e2723"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Eyes - Wide Open + Shine */}
    <ellipse cx="35" cy="48" rx="6" ry="8" fill="#3e2723" />
    <circle cx="37" cy="46" r="2" fill="white" fillOpacity="0.6"/>
    <ellipse cx="65" cy="48" rx="6" ry="8" fill="#3e2723" />
    <circle cx="67" cy="46" r="2" fill="white" fillOpacity="0.6"/>
    
    {/* Mouth - O shape with depth */}
    <motion.ellipse
      cx="50"
      cy="75"
      rx="12"
      ry="16"
      fill="#3e2723"
      animate={{ ry: [16, 22, 16], rx: [12, 16, 12] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

export const SadReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <radialGradient id="sadGradient" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffeb80" />
        <stop offset="50%" stopColor="#f7b125" />
        <stop offset="100%" stopColor="#e09200" />
      </radialGradient>
      <linearGradient id="tearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#bde6ff" />
        <stop offset="100%" stopColor="#2987F5" />
      </linearGradient>
      <filter id="blurHighlight">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#sadGradient)" />
    
    {/* Highlight & Gloss */}
    <SpecularHighlight />
    <GlossOverlay />
    
    {/* Eyebrows - Sad droop */}
    <path d="M25 38 Q35 30 45 42 M55 42 Q65 30 75 38" stroke="#3e2723" strokeWidth="4" fill="none" strokeLinecap="round" />
    
    {/* Eyes - Droopy + Shine */}
    <ellipse cx="35" cy="55" rx="6" ry="4" fill="#3e2723" />
    <circle cx="36" cy="54" r="1.5" fill="white" />
    <ellipse cx="65" cy="55" rx="6" ry="4" fill="#3e2723" />
    <circle cx="66" cy="54" r="1.5" fill="white" />
    
    {/* Mouth - Frown curve */}
    <path d="M35 80 Q50 68 65 80" stroke="#3e2723" strokeWidth="3" fill="none" strokeLinecap="round" />
    
    {/* Tear - detailed drop shape with specular */}
    <motion.g
      initial={{ y: -5, opacity: 0, scale: 0 }}
      animate={{ y: [0, 25], opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.2 }}
    >
      <path
        d="M65 55 C65 55 72 68 72 73 C72 78 68 81 65 81 C62 81 58 78 58 73 C58 68 65 55 65 55 Z"
        fill="url(#tearGradient)"
      />
      <circle cx="63" cy="73" r="2" fill="white" fillOpacity="0.6" />
    </motion.g>
  </svg>
);

export const AngryReaction = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <defs>
      <radialGradient id="angryGradient" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ff8a50" />
        <stop offset="50%" stopColor="#e64a19" />
        <stop offset="100%" stopColor="#bf360c" />
      </radialGradient>
      <radialGradient id="flushInfo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff1744" stopOpacity="0.5" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <filter id="blurHighlight">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#angryGradient)" />
    
    {/* Highlight & Gloss */}
    <SpecularHighlight />
    <GlossOverlay />
    
    {/* Face flush pulse */}
    <motion.circle 
      cx="50" cy="50" r="45" 
      fill="url(#flushInfo)" 
      animate={{ opacity: [0.2, 0.8, 0.2] }}
      transition={{ duration: 0.6, repeat: Infinity }}
    />

    {/* Eyebrows - Sharp V shape */}
    <motion.path
      d="M25 42 L45 54 M55 54 L75 42"
      stroke="#3e2723"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      animate={{ y: [0, 4, 0], rotate: [0, -2, 0] }}
      transition={{ duration: 0.3, repeat: Infinity }}
    />
    
    {/* Eyes - Small intense dots */}
    <circle cx="38" cy="60" r="4" fill="#3e2723" />
    <circle cx="62" cy="60" r="4" fill="#3e2723" />
    
    {/* Mouth - Grunt frown */}
    <path d="M42 80 Q50 74 58 80" stroke="#3e2723" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);
