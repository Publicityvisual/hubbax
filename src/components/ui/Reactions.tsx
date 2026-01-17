import { motion } from 'framer-motion';

// --- SVG PATHS (High Fidelity Vector Data) ---
// --- SVG PATHS (High Fidelity Vector Data) ---
const PATHS = {
  like: "M26 12h-6V6a3 3 0 0 0-3-3h-2.13a2.01 2.01 0 0 0-1.98 1.72L12.05 10.64 8.46 16H2v14h21a7 7 0 0 0 7-7v-7a4 4 0 0 0-4-4z",
  love: "M50 88s-41-23.5-41-53a25 25 0 0 1 50 0c0-29.5 50-29.5 50 0 0 29.5-41 53-41 53z", // Full Heart Shape
  haha_face: "M50 2.5a47.5 47.5 0 1 0 47.5 47.5A47.5 47.5 0 0 0 50 2.5z",
  haha_mouth: "M26 66c0 14.36 10.74 26 24 26s24-11.64 24-26H26z",
  haha_eyes: "M28 42l10-4 10 4-10 4-10-4zm34 0l10-4 10 4-10 4-10-4z",
  wow_face: "M50 2.5a47.5 47.5 0 1 0 47.5 47.5A47.5 47.5 0 0 0 50 2.5z",
  wow_mouth: "M50 58a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
  wow_brows: "M32 38c0-5 5-8 8-8s8 3 8 8m4 0c0-5 5-8 8-8s8 3 8 8",
  sad_face: "M50 2.5a47.5 47.5 0 1 0 47.5 47.5A47.5 47.5 0 0 0 50 2.5z",
  sad_mouth: "M34 78c4-5 12-5 16-5s12 0 16 5",
  sad_brows: "M30 38c2-4 8-6 12-4m16-4c4-2 10 0 12 4",
  sad_tear: "M62 62s-4-6-4-9a4 4 0 0 1 8 0c0 3-4 9-4 9z", // Teardrop
  angry_face: "M50 2.5a47.5 47.5 0 1 0 47.5 47.5A47.5 47.5 0 0 0 50 2.5z",
  angry_brows: "M30 46l14 8m12 0l14-8",
  angry_mouth: "M38 72h24"
};

const BaseIcon = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-lg ${className}`}>
    {children}
  </svg>
);

export const LikeReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2, rotate: -15 }}>
        <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md">
            <circle cx="16" cy="16" r="16" fill="#1877F2"/>
            <path d="M23 11h-5V8a2 2 0 0 0-2-2h-1.42a1.34 1.34 0 0 0-1.32 1.15L12.7 10.43 10.31 14H6v9.33h14a4.67 4.67 0 0 0 4.67-4.67v-4.66A2.67 2.67 0 0 0 23 11z" fill="white"/>
             <path d="M6 14v9.33h4.31V14z" fill="#0e5cbd"/>
        </svg>
    </motion.div>
);

export const LoveReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2 }}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Pure Heart Shape - No Circle Background */}
             <defs>
                <linearGradient id="heartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#F3425F" />
                    <stop offset="100%" stopColor="#E0245E" />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="white" className="opacity-0"/> {/* Spacer for centering */}
            <path d={PATHS.love} fill="url(#heartGradient)" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.2))"/>
        </svg>
    </motion.div>
);

export const HahaReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2, rotate: 10 }}>
        <BaseIcon>
            <path d={PATHS.haha_face} fill="url(#faceGradient)" />
            <path d={PATHS.haha_eyes} fill="#593616" />
            <path d={PATHS.haha_mouth} fill="#593616" />
            <defs>
                <linearGradient id="faceGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FFEA00" />
                    <stop offset="100%" stopColor="#F7B125" />
                </linearGradient>
            </defs>
        </BaseIcon>
    </motion.div>
);

export const WowReaction = () => (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.2 }}>
         <BaseIcon>
             <defs>
                <linearGradient id="faceGradient-wow" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FFEA00" />
                    <stop offset="100%" stopColor="#F7B125" />
                </linearGradient>
            </defs>
            <path d={PATHS.wow_face} fill="url(#faceGradient-wow)" />
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
        <BaseIcon>
            <defs>
                <linearGradient id="faceGradient-sad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FFEA00" />
                    <stop offset="100%" stopColor="#F7B125" />
                </linearGradient>
            </defs>
            <path d={PATHS.sad_face} fill="url(#faceGradient-sad)" />
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
         <BaseIcon>
             <defs>
                <linearGradient id="angryGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#F5503E" />
                    <stop offset="100%" stopColor="#E43A29" />
                </linearGradient>
            </defs>
            <path d={PATHS.angry_face} fill="url(#angryGradient)" />
            <path d={PATHS.angry_brows} stroke="#581F13" strokeWidth="4" fill="none" />
            <path d={PATHS.angry_mouth} stroke="#581F13" strokeWidth="3" fill="none" strokeLinecap="round" />
             <g fill="#581F13">
                 <circle cx="38" cy="56" r="3"/>
                 <circle cx="62" cy="56" r="3"/>
            </g>
        </BaseIcon>
    </motion.div>
);
