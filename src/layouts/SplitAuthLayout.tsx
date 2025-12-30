import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AvatarStack } from '../components/ui/AvatarStack';

interface SplitAuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function SplitAuthLayout({ 
  children, 
  title = "Hubbax.", 
  subtitle = "Connect efficiently." 
}: SplitAuthLayoutProps) {
  
  const avatars = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026302d",
    "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#050505] text-foreground font-sans overflow-hidden selection:bg-primary/20">
      
      {/* Left Panel - Brand/Visuals */}
      <div className="hidden lg:flex flex-col relative w-1/2 h-screen overflow-hidden bg-black">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
             <div className="absolute top-0 left-[-20%] w-[80%] h-[80%] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob opacity-40" />
             <div className="absolute top-[20%] right-[-20%] w-[80%] h-[80%] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 opacity-40" />
             <div className="absolute -bottom-32 left-[20%] w-[80%] h-[80%] bg-orange-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000 opacity-40" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-16 flex flex-col justify-between h-full">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="text-3xl font-bold tracking-tighter flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-primary to-violet-500 rounded-xl rotate-3 shadow-lg shadow-primary/20 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    Hubbax<span className="text-primary">.</span>
                </div>
            </motion.div>

            <div className="space-y-8 max-w-xl">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl font-bold leading-tight tracking-tight"
                >
                    Connect with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-primary to-orange-400 animate-shimmer bg-[length:200%_auto]">Global Energy.</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-white/50 leading-relaxed max-w-sm"
                >
                    The next generation of social networking is here. Faster, sleeker, and designed for the creators of tomorrow.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <AvatarStack images={avatars} count={12500} />
                </motion.div>
            </div>

            <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="flex items-center gap-6 text-xs text-white/20 font-medium tracking-wide uppercase"
            >
                <p>&copy; 2025 Hubbax Inc.</p>
                <p className="hover:text-white transition-colors cursor-pointer">Privacy</p>
                <p className="hover:text-white transition-colors cursor-pointer">Terms</p>
                <p className="hover:text-white transition-colors cursor-pointer">Support</p>
            </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto relative flex flex-col items-center justify-center p-6 lg:p-24 bg-[#050505]">
        {/* Mobile Mobile Background */}
        <div className="absolute inset-0 lg:hidden pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-violet-500/10 rounded-full blur-[80px]" />
        </div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm space-y-8 relative z-10"
        >
            <div className="text-center lg:text-left space-y-2">
                <h2 className="text-4xl font-bold tracking-tight text-white">{title}</h2>
                <p className="text-base text-white/40">{subtitle}</p>
            </div>

            {children}
        </motion.div>
      </div>
    </div>
  );
}
