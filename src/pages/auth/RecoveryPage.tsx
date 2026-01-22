import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Zap, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { Button } from '../../components/ui/Button';

export default function RecoveryPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reuse the premium background effect from Login
  useEffect(() => {
    // Basic mouse animation for background mesh if needed
    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to('.hero-mesh', {
            x: x,
            y: y,
            duration: 2,
            ease: 'power2.out'
        });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#d93025]/30">
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-[-10%] w-[70vw] h-[70vw] bg-[#d93025]/20 rounded-full blur-[120px] opacity-40 hero-mesh animate-pulse duration-[5000ms]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[100px] opacity-30 hero-mesh delay-1000" />
            <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px]" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ opacity: 0.05 }} />
        </div>

        {/* Glass Card */}
        <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md relative z-10"
        >
            <div className="bg-[#18191a]/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                 
                 {/* Top Shine */}
                 <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                 
                 <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d93025] to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(217,48,37,0.5)]">
                        <Zap className="w-8 h-8 text-white fill-white" />
                    </div>
                 </div>

                 {!isSubmitted ? (
                    <>
                        <div className="text-center mb-8 space-y-2">
                            <h1 className="text-3xl font-black tracking-tight text-white">Recuperar Acceso</h1>
                            <p className="text-neutral-400">Ingresa tu correo para restablecer tu contraseña.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 ml-1 uppercase tracking-wider">Correo Electrónico</label>
                                <div className="relative group/input">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-[#d93025] transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ejemplo@hubbax.com"
                                        className="w-full h-14 bg-[#0a0a0a]/50 border border-white/5 rounded-xl pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#d93025]/50 focus:ring-4 focus:ring-[#d93025]/10 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <Button className="w-full h-14 bg-gradient-to-r from-[#d93025] to-[#b01e15] hover:from-[#ff4e42] hover:to-[#d93025] text-white font-black text-lg rounded-xl shadow-[0_10px_30px_rgba(217,48,37,0.3)] hover:shadow-[0_15px_40px_rgba(217,48,37,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                                Enviar Enlace
                            </Button>
                        </form>
                    </>
                 ) : (
                    <div className="text-center py-4">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                            className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/20"
                        >
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white mb-2">¡Correo Enviado!</h2>
                        <p className="text-neutral-400 mb-8">
                            Hemos enviado las instrucciones a <br/>
                            <span className="text-white font-medium">{email}</span>
                        </p>
                        <Button 
                            onClick={() => setIsSubmitted(false)}
                            className="text-neutral-400 hover:text-white font-medium text-sm hover:underline"
                        >
                            ¿Intentar con otro correo?
                        </Button>
                    </div>
                 )}

                 <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-white transition-colors group/link p-2">
                        <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>
                 </div>
            </div>
            
            {/* Footer Links */}
            <div className="mt-8 flex justify-center gap-6 text-xs font-medium text-neutral-600">
                <a href="#" className="hover:text-neutral-400 transition-colors">Privacidad</a>
                <a href="#" className="hover:text-neutral-400 transition-colors">Términos</a>
                <a href="#" className="hover:text-neutral-400 transition-colors">Ayuda</a>
            </div>

        </motion.div>
    </div>
  );
}
