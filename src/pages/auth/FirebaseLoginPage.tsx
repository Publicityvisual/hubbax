// Login Page con autenticación real de Firebase
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useFirebase } from '../../contexts/FirebaseContext';

import { loginSchema, LoginFormData } from '../../lib/schemas';
import { RegisterModal } from '../../components/auth/RegisterModal';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const EnergyBackground = () => {
    const meshRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!meshRef.current) return;

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
        <div ref={meshRef} className="absolute inset-0 overflow-hidden pointer-events-none w-full h-full">
            <div className="energy-blob blob-1 absolute -top-1/4 -left-1/4 w-[80%] h-[80%] bg-[#d93025]/20 rounded-full blur-[160px] opacity-40" />
            <div className="energy-blob blob-2 absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[140px] opacity-30" />
            <div className="absolute inset-0 bg-[#18191a]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#18191a_80%)]" />
        </div>
    );
};

export default function FirebaseLoginPage() {
  const { login, loginWithGoogle, loading: authLoading } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
  };

  const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
  };

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
        setValue('email', savedEmail);
        setValue('remember', true);
      }
    } catch (e) {
      console.warn('Error al obtener email guardado:', e);
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

      // !!!!!! AUTENTICACIÓN REAL CON FIREBASE !!!!!!
      await login(data.email, data.password);
      
      // Redirigir al feed después de login exitoso
      console.log('✅ Login exitoso! Redirigiendo a feed...');
      navigate('/feed');

    } catch (error) {
      console.error('❌ Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate('/feed');
    } catch (error) {
      console.error('❌ Error login con Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // GSAP Entrance & Pulse
  useGSAP(() => {
    gsap.from(cardRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
    });

    const shineTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    shineTimeline.to('.glass-shine', {
        left: '200%',
        duration: 1.5,
        ease: 'power2.inOut'
    });
  }, { scope: cardRef });

  return (
    <div className="min-h-screen bg-[#18191a] flex flex-col font-sans overflow-x-hidden select-none relative">
      <EnergyBackground />

      <div className="flex-1 flex w-full">
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center perspective-1000">
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
                
                <div className="mb-4 h-32 flex flex-col justify-center">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-5xl font-black text-white leading-tight tracking-tighter"
                    >
                      LA RED SOCIAL
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93025] via-[#ff3b2f] to-purple-500">
                          <TypeAnimation
                              sequence={[
                                  'DEL FUTURO',
                                  2000,
                                  'DE TU VIDA',  
                                  2000,
                                  'DE TODOS',
                                  2000
                              ]}
                              wrapper="span"
                              speed={50}
                              style={{ display: 'inline-block' }}
                              repeat={Infinity}
                          />
                      </span>
                    </motion.h1>
                </div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-neutral-400 text-lg mb-10 max-w-sm font-medium"
                >
                  Conecta con el mundo a través de la inteligencia y el diseño.
                </motion.p>

                <motion.div 
                  className="relative group"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d"
                  }}
                >
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#d93025] to-purple-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                  <div 
                      className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 bg-[#1a1b1c] transform transition-transform duration-200"
                      style={{ transform: "translateZ(20px)" }}
                  >
                    <img 
                      src="/assets/hero_people.png" 
                      alt="Social" 
                      className="w-96 h-auto opacity-90 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18191a] via-transparent to-transparent opacity-60" />
                     
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </motion.div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 lg:px-12 relative z-20">
            <div ref={cardRef} className="w-full max-w-[440px] relative">
                
              <div className="lg:hidden text-center mb-8">
                <img src="/assets/logo.png" alt="Hubbax" className="h-16 mx-auto mb-3" />
                <h2 className="text-white text-xl font-bold tracking-tight">Bienvenido a Hubbax</h2>
              </div>

              <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay" />
                <div className="glass-shine absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                  <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Iniciar sesión</h2>
                  <p className="text-neutral-400 font-medium">Accede a tu cuenta profesional</p>
                </div>

                <div className="flex gap-4 mb-8 relative z-10">
                  <button 
                    onClick={handleGoogleLogin}
                    className="flex-1 flex items-center justify-center gap-2 h-14 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl text-white font-bold transition-all text-sm shadow-lg hover:-translate-y-1 active:translate-y-0 backdrop-blur-md group/social"
                  >
                    <svg className="w-5 h-5 group-hover/social:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  
                  <button 
                    onClick={handleGoogleLogin}
                    className="flex-1 flex items-center justify-center gap-2 h-14 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl text-white font-bold transition-all text-sm shadow-lg hover:-translate-y-1 active:translate-y-0 backdrop-blur-md group/social"
                  >
                    <svg className="w-5 h-5 fill-white group-hover/social:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Apple
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="flex-1 h-px bg-white/5"></div>
                  <span className="text-neutral-500 text-[11px] font-black uppercase tracking-widest">O usa tu email</span>
                  <div className="flex-1 h-px bg-white/5"></div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d93025] to-purple-600 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                    <Input 
                      type="email" 
                      placeholder="email@hubbax.com"
                      error={errors.email?.message}
                      {...register('email')}
                      className="relative h-14 bg-[#0a0a0a]/60 border-white/5 text-white placeholder:text-neutral-600 focus:border-[#d93025]/50 focus:ring-0 rounded-2xl px-5 text-base transition-all font-medium backdrop-blur-md"
                      hideLabel
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d93025] to-purple-600 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                    <Input 
                      type="password" 
                      placeholder="••••••••"
                      error={errors.password?.message}
                      {...register('password')}
                      className="relative h-14 bg-[#0a0a0a]/60 border-white/5 text-white placeholder:text-neutral-600 focus:border-[#d93025]/50 focus:ring-0 rounded-2xl px-5 text-base transition-all font-medium backdrop-blur-md"
                      hideLabel
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 text-neutral-400 cursor-pointer hover:text-white transition-colors group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-white/10 bg-transparent text-[#d93025] focus:ring-0 checked:bg-[#d93025] checked:border-transparent transition-all"
                        {...register('remember')} 
                      />
                      <span className="font-bold group-hover:text-[#d93025] transition-colors">Recordarme</span>
                    </label>
                    <Link 
                      to="/recovery" 
                      className="text-neutral-400 font-bold hover:text-[#d93025] hover:underline tracking-tight transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-black rounded-2xl bg-gradient-to-r from-[#d93025] to-[#ff3b2f] text-white transition-all shadow-[0_0_30px_rgba(217,48,37,0.3)] hover:shadow-[0_0_40px_rgba(217,48,37,0.5)] hover:scale-[1.02] active:scale-[0.98] mt-4 relative overflow-hidden ring-1 ring-white/10" 
                    size="lg" 
                    isLoading={isLoading || authLoading}
                  >
                    <span className="relative z-20 uppercase tracking-widest">{isLoading || authLoading ? "Cargando..." : "Iniciar sesión"}</span>
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
                  <button 
                    onClick={() => setIsRegisterOpen(true)}
                    className="text-white font-bold text-sm hover:text-[#d93025] transition-colors"
                  >
                    ¿No tienes cuenta? <span className="underline ml-1">Regístrate gratis</span>
                  </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] text-white font-black uppercase tracking-widest">Hubbax AI Cloud Secured</span>
                   </div>
                   <div className="w-px h-4 bg-white/10" />
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white font-black uppercase tracking-widest">v1.0.0 Firebase</span>
                   </div>
                </div>

              </div>
            </div>
          </div>
      </div>

      <footer className="absolute bottom-0 w-full py-4 text-center z-20 pointer-events-none">
          <div className="flex items-center justify-center gap-6 text-[10px] text-neutral-600 font-bold uppercase tracking-widest pointer-events-auto">
              <span className="hover:text-white cursor-pointer transition-colors">Español</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Ayuda</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Privacidad</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Términos</span>
              <span className="ml-4 opacity-50">© 2025 Hubbax Inc.</span>
          </div>
      </footer>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}