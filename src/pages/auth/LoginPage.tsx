import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import { loginSchema, LoginFormData } from '../../lib/schemas';
import { RegisterModal } from '../../components/auth/RegisterModal';
import { motion } from 'framer-motion';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const EnergyBackground = () => {
    const meshRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!meshRef.current) return;

        // Create fluid background movement
        const moveBg = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            gsap.to('.energy-blob', {
                x: xPos,
                y: yPos,
                duration: 2,
                ease: 'power2.out',
                stagger: 0.1
            });
        };

        window.addEventListener('mousemove', moveBg);

        // Infinite Pulse Animations
        gsap.to('.blob-1', {
            scale: 1.2,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        gsap.to('.blob-2', {
            scale: 1.3,
            duration: 12,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 2
        });

        return () => window.removeEventListener('mousemove', moveBg);
    }, { scope: meshRef });

    return (
        <div ref={meshRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="energy-blob blob-1 absolute -top-1/4 -left-1/4 w-[80%] h-[80%] bg-[#d93025]/20 rounded-full blur-[160px] opacity-40" />
            <div className="energy-blob blob-2 absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[140px] opacity-30" />
            <div className="absolute inset-0 bg-[#18191a]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#18191a_80%)]" />
        </div>
    );
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: '',
        remember: false
      }
    });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedEmail = localStorage.getItem('hubbax_remembered_email');
      if (savedEmail) {
        const timer = setTimeout(() => {
          setValue('email', savedEmail, { shouldDirty: true });
          setValue('remember', true, { shouldDirty: true });
        }, 100);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Hydration error:', e);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      if (data.remember) {
        localStorage.setItem('hubbax_remembered_email', data.email);
      } else {
        localStorage.removeItem('hubbax_remembered_email');
      }
    } catch {
      // Ignore storage errors
    }

    setTimeout(() => {
      setIsLoading(false);
      navigate('/feed');
    }, 2000);
  };

  // GSAP Entrance & Pulse
  useGSAP(() => {
    // Hero breathing
    if (heroRef.current) {
        gsap.to(heroRef.current, {
            y: -10,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    // Login Card Entrance
    gsap.from(cardRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
    });

    // Glass Shine Loop
    const shineTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    shineTimeline.to('.glass-shine', {
        left: '200%',
        duration: 1.5,
        ease: 'power2.inOut'
    });
  }, { scope: cardRef });

  return (
    <div className="min-h-screen bg-[#18191a] flex font-sans overflow-hidden select-none">
      
      {/* Cinematic Energy Background */}
      <EnergyBackground />

      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <div className="relative z-10 flex flex-col items-center text-center px-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-8"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#d93025] to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse" />
            <img src="/assets/logo.png" alt="Hubbax" className="relative h-32 object-contain" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-black text-white leading-tight mb-4 tracking-tighter"
          >
            LA RED SOCIAL DEL
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93025] via-[#ff3b2f] to-purple-500">FUTURO</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-neutral-400 text-lg mb-10 max-w-sm font-medium"
          >
            Conecta con el mundo a través de la inteligencia y el diseño.
          </motion.p>

          {/* Hero Image */}
          <div ref={heroRef} className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#d93025] to-purple-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 bg-[#1a1b1c]">
              <img 
                src="/assets/hero_people.png" 
                alt="Social" 
                className="w-96 h-auto opacity-90 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18191a] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 relative z-20">
        <div ref={cardRef} className="w-full max-w-[440px] relative">
          
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img src="/assets/logo.png" alt="Hubbax" className="h-16 mx-auto mb-3" />
            <h2 className="text-white text-xl font-bold tracking-tight">Bienvenido a Hubbax</h2>
          </div>

          {/* Glass Login Card */}
          <div className="bg-[#242526]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative overflow-hidden group">
            
            {/* Glass Shine Effect */}
            <div className="glass-shine absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] pointer-events-none" />

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Iniciar sesión</h2>
              <p className="text-neutral-400 font-medium">Accede a tu cuenta profesional</p>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="flex-1 flex items-center justify-center gap-2 h-14 bg-white hover:bg-neutral-100 rounded-2xl text-gray-900 font-black transition-all text-sm shadow-xl hover:-translate-y-1 active:translate-y-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-14 bg-black border border-white/10 rounded-2xl text-white font-black transition-all text-sm hover:border-white/20 hover:-translate-y-1 active:translate-y-0 shadow-xl">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-white/5"></div>
              <span className="text-neutral-500 text-[11px] font-black uppercase tracking-widest">O usa tu email</span>
              <div className="flex-1 h-px bg-white/5"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="email@hubbax.com"
                  error={errors.email?.message}
                  {...register('email')}
                  className="h-16 bg-[#0a0a0a]/40 border-white/5 text-white placeholder:text-neutral-600 focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/5 rounded-2xl px-5 text-base transition-all font-medium"
                  hideLabel
                />
              </div>
              <div className="relative">
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register('password')}
                  className="h-16 bg-[#0a0a0a]/40 border-white/5 text-white placeholder:text-neutral-600 focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/5 rounded-2xl px-5 text-base transition-all font-medium"
                  hideLabel
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-neutral-400 cursor-pointer hover:text-white transition-colors group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-white/10 bg-transparent text-[#d93025] focus:ring-0 checked:bg-[#d93025]"
                    {...register('remember')} 
                  />
                  <span className="font-bold">Recordarme</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-[#d93025] font-black hover:underline tracking-tight"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-16 text-xl font-black rounded-2xl bg-gradient-to-r from-[#d93025] to-[#ff3b2f] text-white transition-all shadow-2xl shadow-[#d93025]/30 hover:scale-[1.02] active:scale-[0.98] mt-4 relative overflow-hidden" 
                size="lg" 
                isLoading={isLoading}
              >
                <span className="relative z-20 uppercase tracking-widest">{isLoading ? "Cargando..." : "Iniciar sesión"}</span>
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="text-white font-black text-sm hover:text-[#d93025] transition-colors"
              >
                ¿No tienes cuenta? <span className="underline ml-1">Regístrate gratis</span>
              </button>
            </div>
          </div>

          {/* New Legitimacy Badge */}
          <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-white font-black uppercase tracking-widest">Hubbax AI Cloud Secured</span>
             </div>
             <div className="w-px h-4 bg-white/10" />
             <div className="flex items-center gap-2">
                <span className="text-[10px] text-white font-black uppercase tracking-widest">v0.0.4 Diamond</span>
             </div>
          </div>

        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
