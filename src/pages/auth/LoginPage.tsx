import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Loader2 } from 'lucide-react';
import { loginSchema, LoginFormData } from '../../lib/schemas';
import { RegisterModal } from '../../components/auth/RegisterModal';

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
    <div className="min-h-screen bg-[#0a0a0a] flex font-sans">
      {/* Left Panel - Hero (Desktop only) */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden items-center justify-center bg-gradient-to-br from-[#d93025]/10 via-[#0a0a0a] to-purple-900/10">
        {/* Decorative Orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#d93025]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-10 max-w-md">
          <img src="/assets/logo.png" alt="Hubbax" className="h-24 object-contain mb-6" />
          
          <h1 className="text-3xl font-bold text-white leading-tight mb-4">
            Donde las conexiones
            <br />
            <span className="text-[#d93025]">cobran vida</span>
          </h1>
          <p className="text-neutral-400 text-sm mb-8">
            Únete a millones de personas que comparten momentos únicos.
          </p>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#d93025] to-purple-600 rounded-2xl blur opacity-30" />
            <img 
              src="/assets/hero_people.png" 
              alt="Social" 
              className="relative w-72 h-auto rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 lg:px-12">
        <div className="w-full max-w-[480px]">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img src="/assets/logo.png" alt="Hubbax" className="h-14 mx-auto mb-3" />
            <p className="text-neutral-500 text-sm">Donde las conexiones cobran vida</p>
          </div>

          {/* Login Card */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">¡Bienvenido!</h2>
              <p className="text-neutral-400">Ingresa a tu cuenta</p>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all">
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
                className="w-full h-14 text-lg font-bold rounded-xl bg-[#d93025] hover:bg-[#b01e15] text-white transition-all" 
                size="lg" 
                isLoading={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Iniciar sesión"}
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-neutral-400">
                ¿No tienes cuenta?{' '}
                <button 
                  onClick={() => setIsRegisterOpen(true)}
                  className="text-[#d93025] font-semibold hover:underline"
                >
                  Regístrate
                </button>
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center text-neutral-500 text-xs flex items-center justify-center gap-4">
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Privacidad</a>
            <span>© 2025 Hubbax</span>
          </div>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
