import { motion } from 'framer-motion';

// --- SVG PATHS (Authentic Meta 3D Vector Data) ---
const PATHS = {
  // Like: Blue circle with white thumb. 3D effect via radial overlay.
  like_thumb: "M23 11h-5V8a2 2 0 0 0-2-2h-1.42a1.34 1.34 0 0 0-1.32 1.15L12.7 10.43 10.31 14H6v9.33h14a4.67 4.67 0 0 0 4.67-4.67v-4.66A2.67 2.67 0 0 0 23 11z",
  like_sleeve: "M6 14v9.33h4.31V14z",
  
  // Love: Red Heart pulsating. 3D gradient built-in.
  love: "M50 88s-41-23.5-41-53a25 25 0 0 1 50 0c0-29.5 50-29.5 50 0 0 29.5-41 53-41 53z",

  // Care: Smiley hugging a heart.
  care_face: "M50 2.5a47.5 47.5 0 1 0 47.5 47.5A47.5 47.5 0 0 0 50 2.5z",
  care_eyes: "M32 38c0-4 4-7 8-7s8 3 8 7m16 0c0-4 4-7 8-7s8 3 8 7",
  care_heart: "M68 56a20 20 0 0 0-36 0c-5 12 18 28 18 28s23-16 18-28z",
  care_hands: "M24 70c-2 8 8 16 16 10m36 0c2 8-8 16-16 10", // Simplified hug

  // Haha: Squinting X-eyes + Open Smile.
  haha_face: "M50 2.5a47.5 47.5 0 1 0 47.5 47.5A47.5 47.5 0 0 0 50 2.5z",
  haha_eyes: "M28 40l12-6m6 6l-12-6m36 0l12 6m-12 0l12-6", // X shape
  haha_mouth: "M26 66c0 14.36 10.74 26 24 26s24-11.64 24-26H26z",

  // Wow: Eyebrows up + O mouth.
  wow_face: "M50 2.5a47.5 47.5 0 1 0 47.5 47.5A47.5 47.5 0 0 0 50 2.5z",
  wow_mouth: "M50 58a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
  wow_brows: "M32 38c0-5 5-8 8-8s8 3 8 8m4 0c0-5 5-8 8-8s8 3 8 8",

  // Sad: Frown + Tear.
  sad_face: "M50 2.5a47.5 47.5 0 1 0 47.5 47.5A47.5 47.5 0 0 0 50 2.5z",
  sad_mouth: "M34 78c4-5 12-5 16-5s12 0 16 5",
  sad_brows: "M30 38c2-4 8-6 12-4m16-4c4-2 10 0 12 4",
  sad_tear: "M62 62s-4-6-4-9a4 4 0 0 1 8 0c0 3-4 9-4 9z",

  // Angry: Red face + Angled brows.
  angry_face: "M50 2.5a47.5 47.5 0 1 0 47.5 47.5A47.5 47.5 0 0 0 50 2.5z",
  angry_brows: "M30 46l14 8m12 0l14-8",
  angry_mouth: "M38 72h24"
};

const BaseIcon = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-md ${className}`}>
    {children}
  </svg>
);

// --- 3D GRADIENT DEFS (Shared) ---
// These simulate the Meta "shiny plastic" look
const FaceGradients = () => (
    <svg width="0" height="0">
        <defs>
            <radialGradient id="grad-yellow" cx="50%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#FFEE55" /> {/* Highlight */}
                <stop offset="100%" stopColor="#F7B125" /> {/* Shadow */}
            </radialGradient>
            <radialGradient id="grad-red" cx="50%" cy="30%" r="60%">
                 <stop offset="0%" stopColor="#FF6B6B" />
                 <stop offset="100%" stopColor="#E43A29" />
            </radialGradient>
            <radialGradient id="grad-blue" cx="50%" cy="30%" r="60%">
                 <stop offset="0%" stopColor="#4096FF" />
                 <stop offset="100%" stopColor="#1877F2" />
            </radialGradient>
             <radialGradient id="grad-love" cx="30%" cy="30%" r="70%">
                 <stop offset="0%" stopColor="#FF5C84" />
                 <stop offset="100%" stopColor="#D91642" />
            </radialGradient>
        </defs>
    </svg>
);

export const LikeReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2, rotate: -15 }}>
        <FaceGradients />
        <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md">
            <circle cx="16" cy="16" r="16" fill="url(#grad-blue)"/>
            <path d="M23 11h-5V8a2 2 0 0 0-2-2h-1.42a1.34 1.34 0 0 0-1.32 1.15L12.7 10.43 10.31 14H6v9.33h14a4.67 4.67 0 0 0 4.67-4.67v-4.66A2.67 2.67 0 0 0 23 11z" fill="white"/>
             <path d="M6 14v9.33h4.31V14z" fill="rgba(0,0,0,0.2)"/>
        </svg>
    </motion.div>
);

export const LoveReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2 }}>
        <FaceGradients />
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <circle cx="50" cy="50" r="48" fill="white" className="opacity-0"/>
            <path d={PATHS.love} fill="url(#grad-love)" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.3))"/>
        </svg>
    </motion.div>
);

export const CareReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2 }}>
        <FaceGradients />
        <BaseIcon>
            <path d={PATHS.care_face} fill="url(#grad-yellow)" />
            <path d={PATHS.care_eyes} stroke="#593616" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d={PATHS.care_heart} fill="url(#grad-love)" stroke="white" strokeWidth="2" />
            <path d={PATHS.care_hands} stroke="#593616" strokeWidth="4" fill="none" strokeLinecap="round" />
        </BaseIcon>
    </motion.div>
);

export const HahaReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2, rotate: 10 }}>
        <FaceGradients />
        <BaseIcon>
            <path d={PATHS.haha_face} fill="url(#grad-yellow)" />
            <path d={PATHS.haha_eyes} stroke="#593616" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d={PATHS.haha_mouth} fill="#593616" />
        </BaseIcon>
    </motion.div>
);

export const WowReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2 }}>
        <FaceGradients />
         <BaseIcon>
            <path d={PATHS.wow_face} fill="url(#grad-yellow)" />
            <path d={PATHS.wow_brows} stroke="#593616" strokeWidth="3" fill="none" />
            <path d={PATHS.wow_mouth} fill="#593616" />
             <g fill="#593616">
                 <circle cx="36" cy="46" r="4"/>
                 <circle cx="64" cy="46" r="4"/>
             </g>
        </BaseIcon>
    </motion.div>
);

export const SadReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.1, y: 5 }}>
        <FaceGradients />
        <BaseIcon>
            <path d={PATHS.sad_face} fill="url(#grad-yellow)" />
            <path d={PATHS.sad_brows} stroke="#593616" strokeWidth="3" fill="none" />
            <path d={PATHS.sad_mouth} stroke="#593616" strokeWidth="3" fill="none" strokeLinecap="round" />
            <motion.path 
                d={PATHS.sad_tear} 
                fill="#56C1FF"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
            <g fill="#593616">
                 <circle cx="36" cy="50" r="4"/>
                 <circle cx="64" cy="50" r="4"/>
            </g>
        </BaseIcon>
    </motion.div>
);

export const AngryReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2, x: [0, -2, 2, 0] }}>
         <FaceGradients />
         <BaseIcon>
            <path d={PATHS.angry_face} fill="url(#grad-red)" />
            <path d={PATHS.angry_brows} stroke="#8B0000" strokeWidth="4" fill="none" />
            <path d={PATHS.angry_mouth} stroke="#8B0000" strokeWidth="3" fill="none" strokeLinecap="round" />
             <g fill="#8B0000">
                 <circle cx="38" cy="56" r="3"/>
                 <circle cx="62" cy="56" r="3"/>
            </g>
        </BaseIcon>
    </motion.div>
);
