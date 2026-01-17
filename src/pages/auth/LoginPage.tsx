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
    <div className="min-h-screen relative overflow-hidden bg-[#000000] flex flex-col items-center justify-center font-sans tracking-tight">
      {/* Subtle Static Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-[#000000] to-[#000000] z-0 pointer-events-none" />

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-6 lg:px-12 relative z-10 w-full max-w-6xl mx-auto">
        
        {/* Left Col: Brand / Slogan - Clean & Typography Focused */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
             >
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-4">
                    hubbax
                </h1>
                <h2 className="text-2xl lg:text-3xl font-normal text-neutral-400 leading-snug">
                    Conéctate con tu mundo <br/> en la siguiente generación social.
                </h2>
             </motion.div>
        </div>

        {/* Right Col: Solid Premium Card */}
        <div className="w-full max-w-md lg:w-[400px]">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
              <div className="space-y-4">
                <Input 
                    type="email" 
                    placeholder="Correo electrónico o teléfono"
                    error={errors.email?.message}
                    {...register('email')}
                    className="h-12 bg-[#1A1A1A] border-transparent text-white placeholder:text-neutral-500 focus:bg-[#202020] focus:ring-1 focus:ring-white/20 rounded-lg transition-all"
                    hideLabel
                />
                <Input 
                    type="password" 
                    placeholder="Contraseña"
                    error={errors.password?.message}
                    {...register('password')}
                    className="h-12 bg-[#1A1A1A] border-transparent text-white placeholder:text-neutral-500 focus:bg-[#202020] focus:ring-1 focus:ring-white/20 rounded-lg transition-all"
                    hideLabel
                />
              </div>
              
              <Button type="submit" className="w-full py-6 text-lg font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-900/20" size="lg" isLoading={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Iniciar sesión"}
              </Button>
    
              <div className="flex justify-center pt-2">
                <Link 
                  to="/forgot-password" 
                  className="text-blue-400/80 hover:text-blue-400 transition-colors text-sm font-medium hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="relative flex py-3 items-center">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink-0 mx-4 text-neutral-600 text-[10px] uppercase font-bold tracking-widest">O</span>
                  <div className="flex-grow border-t border-white/5"></div>
              </div>
      
              <div className="flex justify-center">
                   <Button 
                      onClick={() => setIsRegisterOpen(true)}
                      type="button" 
                      variant="outline" 
                      className="w-full py-5 text-base font-medium border-white/10 hover:bg-white/5 text-white transition-colors bg-transparent rounded-lg"
                  >
                      Crear cuenta nueva
                   </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center relative z-10">
             <p className="text-xs text-neutral-500">
               <Link to="/create-page" className="font-bold hover:text-white transition-colors">Crea una página</Link> para una celebridad, marca o negocio.
             </p>
           </div>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      
      {/* Clean Footer */}
      <footer className="relative z-10 w-full text-center py-8 text-neutral-600 text-xs">
          <div className="flex justify-center gap-6 mb-3 px-4 font-medium">
              <span className="hover:text-neutral-400 cursor-pointer transition-colors">Español</span>
              <span className="hover:text-neutral-400 cursor-pointer transition-colors">English (US)</span>
              <span className="hover:text-neutral-400 cursor-pointer transition-colors">Français</span>
          </div>
          Hubbax © 2025
      </footer>
    </div>
  );
}
