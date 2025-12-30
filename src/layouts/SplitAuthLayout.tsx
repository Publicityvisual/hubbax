import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SplitAuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
}

export function SplitAuthLayout({ 
  children, 
  title = "Hubbax.", 
  subtitle = "Connect efficiently.", 
  image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
}: SplitAuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-[#000000] text-foreground font-sans overflow-hidden">
      
      {/* Left Panel - Brand/Visuals */}
      <div className="hidden lg:flex flex-col relative w-1/2 h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={image} 
            alt="Background" 
            className="w-full h-full object-cover opacity-60 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        {/* Animated Orbs/Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primary/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />

        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col justify-between h-full">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg rotate-3" />
                    Hubbax<span className="text-primary">.</span>
                </div>
            </motion.div>

            <div className="space-y-6 max-w-lg">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl font-bold leading-tight"
                >
                    Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Future</span> of Social Connection.
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg text-white/60"
                >
                    Join millions of users who are already shaping the future. Secure, fast, and designed for you.
                </motion.p>
            </div>

            <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="flex items-center gap-4 text-xs text-white/30"
            >
                <p>&copy; 2025 Hubbax Inc.</p>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <p>Privacy Policy</p>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <p>Terms of Service</p>
            </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto relative flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Mobile Mobile Background */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
            <div className="absolute inset-0 bg-primary/5 blur-[100px]" />
            <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-20" />
        </div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8 relative z-10"
        >
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                <p className="mt-2 text-sm text-white/50">{subtitle}</p>
            </div>

            {children}
        </motion.div>
      </div>
    </div>
  );
}
