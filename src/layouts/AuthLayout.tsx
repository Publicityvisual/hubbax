import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
  subtitle?: string;
}

export function AuthLayout({ children, subtitle = "Connect with the world." }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050505]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="w-full max-w-md p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">
            Hubbax<span className="text-primary">.</span>
          </h1>
          <p className="text-white/40 text-sm">{subtitle}</p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl shadow-black/50"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
