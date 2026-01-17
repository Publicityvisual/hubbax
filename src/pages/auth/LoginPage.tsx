import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Loader2 } from 'lucide-react';
import { loginSchema, LoginFormData } from '../../lib/schemas';
import { RegisterModal } from '../../components/auth/RegisterModal';
import { motion } from 'framer-motion';
import { LikeReaction, LoveReaction, HahaReaction, WowReaction, SadReaction, AngryReaction } from '../../components/ui/Reactions';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<number | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log('Login Data:', data);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/feed');
    }, 2000);
  };

  const reactions = [
    { name: 'Me gusta', Component: LikeReaction },
    { name: 'Me encanta', Component: LoveReaction },
    { name: 'Me divierte', Component: HahaReaction },
    { name: 'Me asombra', Component: WowReaction },
    { name: 'Me entristece', Component: SadReaction },
    { name: 'Me enoja', Component: AngryReaction },
  ];

  return (
    <div className="h-screen bg-[#0a0a0a] flex font-sans overflow-hidden">
      {/* Left Panel - Hero (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-80 h-80 bg-[#d93025]/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-6"
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-[#d93025] to-purple-600 rounded-full blur-xl opacity-25" />
            <img src="/assets/logo.png" alt="Hubbax" className="relative h-28 object-contain" />
          </motion.div>
          
          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold text-white leading-tight mb-3"
          >
            La red social del
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93025] to-purple-500">futuro</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 text-base mb-8 max-w-sm"
          >
            Conecta, comparte y descubre con millones de personas.
          </motion.p>

          {/* Hero Image with Floating Reactions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#d93025] to-purple-600 rounded-2xl blur-lg opacity-30" />
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/hero_people.png" 
                alt="Social" 
                className="w-80 h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Reactions with Advanced SVG Animation */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-20 h-20 drop-shadow-2xl"
            >
              <LoveReaction />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 -left-8 w-16 h-16 drop-shadow-2xl"
            >
              <LikeReaction />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 -right-8 w-14 h-14 drop-shadow-2xl"
            >
              <HahaReaction />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 left-12 w-16 h-16 drop-shadow-2xl"
            >
              <WowReaction />
            </motion.div>
          </motion.div>

          {/* Reactions Bar - Advanced SVG Animations */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center gap-4 shadow-2xl">
              {reactions.map((reaction, i) => (
                <div key={i} className="relative group">
                  <motion.div
                    onHoverStart={() => setHoveredReaction(i)}
                    onHoverEnd={() => setHoveredReaction(null)}
                    animate={hoveredReaction === i ? { scale: 1.5, y: -20, zIndex: 10 } : { scale: 1, y: 0, zIndex: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-12 h-12 cursor-pointer relative"
                  >
                    <reaction.Component />
                  </motion.div>
                  {/* Tooltip */}
                  {hoveredReaction === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -45, scale: 1 }}
                      className="absolute left-1/2 -translate-x-1/2 top-0 whitespace-nowrap bg-black/90 text-white text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none"
                    >
                      {reaction.name}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 bg-[#0a0a0a]">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <img src="/assets/logo.png" alt="Hubbax" className="h-14 mx-auto mb-2" />
            <p className="text-neutral-500 text-sm">La red social del futuro</p>
            
            {/* Mobile Animated Reactions */}
            <div className="flex justify-center gap-4 mt-6">
              {reactions.slice(0, 5).map((reaction, i) => (
                <div key={i} className="w-10 h-10 drop-shadow-lg">
                  <reaction.Component />
                </div>
              ))}
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-7">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">¡Bienvenido!</h2>
              <p className="text-neutral-400 text-sm">Ingresa a tu cuenta</p>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 mb-5">
              <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-white hover:bg-gray-100 rounded-xl text-gray-800 font-medium transition-all text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-black border border-white/20 rounded-xl text-white font-medium transition-all text-sm hover:bg-gray-900">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-neutral-500 text-xs">o usa tu email</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <Input 
                type="email" 
                placeholder="Correo electrónico"
                error={errors.email?.message}
                {...register('email')}
                className="h-12 bg-[#0a0a0a] border-white/10 text-white placeholder:text-neutral-500 focus:border-[#d93025] rounded-xl px-4 text-sm"
                hideLabel
              />
              <Input 
                type="password" 
                placeholder="Contraseña"
                error={errors.password?.message}
                {...register('password')}
                className="h-12 bg-[#0a0a0a] border-white/10 text-white placeholder:text-neutral-500 focus:border-[#d93025] rounded-xl px-4 text-sm"
                hideLabel
              />

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-neutral-400 cursor-pointer hover:text-white">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded bg-white/5 border-white/20 text-[#d93025]" />
                  Recordarme
                </label>
                <Link to="/forgot-password" className="text-[#d93025] hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold rounded-xl bg-[#d93025] hover:bg-[#b01e15] text-white transition-all" 
                size="lg" 
                isLoading={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Iniciar sesión"}
              </Button>
            </form>

            <div className="mt-5 pt-5 border-t border-white/10 text-center">
              <p className="text-neutral-400 text-sm mb-3">¿No tienes cuenta?</p>
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="w-full h-12 text-base font-bold rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all"
              >
                Crear cuenta nueva
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-neutral-500 text-xs flex items-center justify-center gap-3">
            <a href="#" className="hover:text-white">Términos</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Privacidad</a>
            <span>•</span>
            <span>© 2025 Hubbax</span>
          </div>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
