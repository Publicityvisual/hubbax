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

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex font-sans selection:bg-[#d93025] selection:text-white">
      {/* Left Panel - Hero/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d93025]/20 via-[#0a0a0a] to-purple-900/20" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#d93025]/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-12 w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#d93025] to-[#ff6b5b] rounded-2xl flex items-center justify-center shadow-xl shadow-[#d93025]/30">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
              <span className="text-white text-4xl font-bold tracking-tight">Hubbax</span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Donde las<br />
              conexiones<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93025] to-purple-500">cobran vida</span>
            </h1>
            <p className="text-neutral-400 text-xl max-w-md leading-relaxed">
              Únete a millones de personas que ya comparten momentos, historias y experiencias únicas.
            </p>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {['🔒 Privacidad Total', '⚡ Súper Rápido', '🌍 Global', '💎 Premium'].map((feature, i) => (
              <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-neutral-300 text-sm font-medium backdrop-blur-sm">
                {feature}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-16 relative">
        {/* Mobile Logo (visible only on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden flex items-center gap-3 mb-10"
        >
          <div className="w-11 h-11 bg-gradient-to-tr from-[#d93025] to-[#ff6b5b] rounded-xl flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-white text-2xl font-bold">Hubbax</span>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Card Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">¡Bienvenido de nuevo!</h2>
            <p className="text-neutral-400">Ingresa tus datos para continuar</p>
          </div>

          {/* Social Logins */}
          <div className="flex gap-3 mb-8">
            <button className="flex-1 flex items-center justify-center gap-3 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all duration-200 hover:border-white/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all duration-200 hover:border-white/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-4 text-neutral-500 text-sm">o continúa con email</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Input 
                type="email" 
                placeholder="Correo electrónico"
                error={errors.email?.message}
                {...register('email')}
                className="h-14 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:bg-white/10 focus:border-[#d93025] focus:ring-2 focus:ring-[#d93025]/20 rounded-xl transition-all text-base px-5"
                hideLabel
              />
            </div>
            <div>
              <Input 
                type="password" 
                placeholder="Contraseña"
                error={errors.password?.message}
                {...register('password')}
                className="h-14 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:bg-white/10 focus:border-[#d93025] focus:ring-2 focus:ring-[#d93025]/20 rounded-xl transition-all text-base px-5"
                hideLabel
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#d93025] focus:ring-[#d93025]/20" />
                <span className="text-neutral-400 text-sm group-hover:text-white transition-colors">Recordarme</span>
              </label>
              <Link to="/forgot-password" className="text-[#d93025] hover:text-[#ff6b5b] text-sm font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-[#d93025] to-[#ff4444] hover:brightness-110 text-white transition-all shadow-lg shadow-[#d93025]/30 hover:shadow-[#d93025]/50" 
              size="lg" 
              isLoading={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Iniciar sesión"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-neutral-400">
              ¿No tienes cuenta?{' '}
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="text-[#d93025] hover:text-[#ff6b5b] font-semibold transition-colors"
              >
                Regístrate gratis
              </button>
            </p>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="mt-auto pt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-neutral-500 text-xs">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Ayuda</a>
            <span>© 2025 Hubbax</span>
          </div>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      
      {/* Modern Professional Footer */}
      <footer className="relative z-10 w-full mt-auto bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Compañía</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Acerca de</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Empleos</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Prensa</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Blog</a></li>
              </ul>
            </div>
            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Condiciones</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Privacidad</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Cookies</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Licencias</a></li>
              </ul>
            </div>
            {/* Help */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Ayuda</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Seguridad</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Comunidad</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Contacto</a></li>
              </ul>
            </div>
            {/* Social */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Síguenos</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Instagram</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Twitter</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">YouTube</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#d93025] to-[#ff6b5b] rounded-xl flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <span className="text-white font-bold text-lg">Hubbax</span>
            </div>
            
            <div className="flex items-center gap-6">
              <select className="bg-transparent text-neutral-400 text-sm border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:border-white/20 focus:outline-none focus:border-[#d93025] transition-colors">
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
              </select>
              <span className="text-neutral-500 text-sm">© 2025 Hubbax. Todos los derechos reservados.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
