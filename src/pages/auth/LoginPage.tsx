import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Loader2, Users, MessageCircle, Heart, Globe } from 'lucide-react';
import { loginSchema, LoginFormData } from '../../lib/schemas';
import { RegisterModal } from '../../components/auth/RegisterModal';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
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

  // Abstract social icons for visual appeal (no real user data)
  const socialIcons = ['💬', '❤️', '🔔', '📸', '🎉'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] flex font-sans overflow-hidden">
      {/* Left Panel - Hero (Desktop only) */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#d93025]/20 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-12 max-w-2xl">
          {/* Logo with Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#d93025] to-purple-600 rounded-full blur-xl opacity-30" />
            <img src="/assets/logo.png" alt="Hubbax" className="relative h-36 lg:h-44 object-contain" />
          </motion.div>
          
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              La red social del
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93025] via-[#ff6b5b] to-purple-500">futuro</span>
            </h1>
            <p className="text-neutral-400 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
              Conecta, comparte y descubre un mundo de posibilidades con millones de personas.
            </p>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 mb-10 w-full max-w-md"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-[#d93025]/20 rounded-xl mx-auto mb-2">
                <Users className="w-5 h-5 text-[#d93025]" />
              </div>
              <div className="text-2xl font-bold text-white">10M+</div>
              <div className="text-neutral-500 text-xs">Usuarios</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-500/20 rounded-xl mx-auto mb-2">
                <MessageCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">50M+</div>
              <div className="text-neutral-500 text-xs">Mensajes</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-pink-500/20 rounded-xl mx-auto mb-2">
                <Heart className="w-5 h-5 text-pink-400" />
              </div>
              <div className="text-2xl font-bold text-white">100M+</div>
              <div className="text-neutral-500 text-xs">Reacciones</div>
            </div>
          </motion.div>

          {/* Hero Image with Floating Avatars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#d93025] to-purple-600 rounded-3xl blur-xl opacity-40" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="/assets/hero_people.png" 
                alt="Social" 
                className="w-[500px] h-auto"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Online indicator */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">1,234 usuarios en línea</span>
              </div>
            </div>

            {/* Floating emoji icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center shadow-xl text-2xl"
            >
              ❤️
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl text-xl"
            >
              💬
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 -right-6 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl text-lg"
            >
              🔔
            </motion.div>
          </motion.div>

          {/* Activity Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex gap-2">
              {socialIcons.map((icon, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg"
                >
                  {icon}
                </div>
              ))}
            </div>
            <div className="text-neutral-400 text-sm">
              <span className="text-white font-semibold">+50,000</span> nuevos hoy
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 lg:px-12 bg-[#0a0a0a]/50 backdrop-blur-sm">
        <div className="w-full max-w-[460px]">
          {/* Mobile Logo & Stats */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden text-center mb-8"
          >
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#d93025] to-purple-600 rounded-full blur-lg opacity-30" />
              <img src="/assets/logo.png" alt="Hubbax" className="relative h-20 mx-auto" />
            </div>
            <p className="text-neutral-400 text-sm">La red social del futuro</p>
            
            {/* Mobile stats */}
            <div className="flex justify-center gap-6 mt-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">10M+</div>
                <div className="text-neutral-500 text-xs">Usuarios</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">50M+</div>
                <div className="text-neutral-500 text-xs">Posts</div>
              </div>
            </div>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#111111] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">¡Bienvenido!</h2>
              <p className="text-neutral-400">Ingresa a tu cuenta</p>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 h-14 bg-white hover:bg-gray-100 rounded-xl text-gray-800 font-medium transition-all shadow-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-14 bg-black hover:bg-gray-900 border border-white/20 rounded-xl text-white font-medium transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-neutral-500 text-sm">o usa tu email</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input 
                type="email" 
                placeholder="Correo electrónico"
                error={errors.email?.message}
                {...register('email')}
                className="h-14 bg-[#0a0a0a] border-white/10 text-white placeholder:text-neutral-500 focus:border-[#d93025] rounded-xl px-4"
                hideLabel
              />
              <Input 
                type="password" 
                placeholder="Contraseña"
                error={errors.password?.message}
                {...register('password')}
                className="h-14 bg-[#0a0a0a] border-white/10 text-white placeholder:text-neutral-500 focus:border-[#d93025] rounded-xl px-4"
                hideLabel
              />

              {/* Options Row */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-neutral-400 cursor-pointer hover:text-white">
                  <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/20 text-[#d93025]" />
                  Recordarme
                </label>
                <Link to="/forgot-password" className="text-[#d93025] hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Submit */}
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-[#d93025] to-[#ff4444] hover:brightness-110 text-white transition-all shadow-lg shadow-[#d93025]/30" 
                size="lg" 
                isLoading={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Iniciar sesión"}
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-neutral-400 mb-4">¿No tienes cuenta?</p>
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:brightness-110 text-white transition-all shadow-lg shadow-green-600/30"
              >
                Crear cuenta nueva
              </button>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="flex items-center justify-center gap-4 text-neutral-500 text-xs mb-3">
              <Globe className="w-4 h-4" />
              <span>Español (MX)</span>
              <span>•</span>
              <span>English</span>
              <span>•</span>
              <span>Français</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-neutral-500 text-xs">
              <a href="#" className="hover:text-white">Términos</a>
              <a href="#" className="hover:text-white">Privacidad</a>
              <a href="#" className="hover:text-white">Ayuda</a>
              <span>© 2025 Hubbax</span>
            </div>
          </motion.div>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
