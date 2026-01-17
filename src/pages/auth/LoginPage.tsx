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
    <div className="min-h-screen relative overflow-hidden bg-[#000000] flex flex-col justify-between font-sans tracking-tight">
      {/* Subtle Static Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a0505] via-[#000000] to-[#000000] z-0 pointer-events-none opacity-40" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 px-6 lg:px-12 relative z-10 w-full max-w-7xl mx-auto pt-12 lg:pt-0">
        
        {/* Left Col: 3D Illustration & Branding */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
             >
                {/* Floating Glow Effect */}
                <div className="absolute -inset-10 bg-[#d93025] blur-[100px] opacity-20 rounded-full pointer-events-none" />
                <img 
                    src="/assets/social_connect.png" 
                    alt="Social Connection" 
                    className="w-[380px] lg:w-[480px] h-auto object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
                />
             </motion.div>
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl lg:text-3xl font-light text-neutral-300 leading-snug max-w-md"
             >
                 Conéctate con amigos y el mundo que te rodea en <span className="font-bold text-white">Hubbax</span>.
             </motion.h2>
        </div>

        {/* Right Col: Login Card & Recent Users */}
        <div className="w-full max-w-md lg:w-[420px] space-y-6">
          <div className="bg-[#0A0A0A] border border-[#2f3031] rounded-xl p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/5 group hover:border-[#d93025]/30 transition-colors duration-500">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
              <div className="space-y-4">
                <Input 
                    type="email" 
                    placeholder="Correo electrónico o teléfono"
                    error={errors.email?.message}
                    {...register('email')}
                    className="h-14 bg-[#18191A] border-[#2f3031] text-white placeholder:text-[#B0B3B8] focus:bg-[#18191A] focus:border-[#d93025] focus:ring-1 focus:ring-[#d93025]/20 rounded-md transition-all text-base px-4"
                    hideLabel
                />
                <Input 
                    type="password" 
                    placeholder="Contraseña"
                    error={errors.password?.message}
                    {...register('password')}
                    className="h-14 bg-[#18191A] border-[#2f3031] text-white placeholder:text-[#B0B3B8] focus:bg-[#18191A] focus:border-[#d93025] focus:ring-1 focus:ring-[#d93025]/20 rounded-md transition-all text-base px-4"
                    hideLabel
                />
              </div>
              
              <Button type="submit" className="w-full py-7 text-xl font-bold rounded-md bg-[#d93025] hover:bg-[#b01e15] text-white transition-all shadow-lg shadow-red-900/20" size="lg" isLoading={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Iniciar sesión"}
              </Button>
    
              <div className="flex justify-center pt-2">
                <Link 
                  to="/forgot-password" 
                  className="text-[#d93025]/80 hover:text-[#d93025] transition-colors text-sm font-medium hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="relative flex py-3 items-center">
                  <div className="flex-grow border-t border-[#2f3031]"></div>
                  <span className="flex-shrink-0 mx-4 text-neutral-500 text-[11px] uppercase font-bold tracking-widest">O</span>
                  <div className="flex-grow border-t border-[#2f3031]"></div>
              </div>
      
              <div className="flex justify-center">
                   <Button 
                      onClick={() => setIsRegisterOpen(true)}
                      type="button" 
                      className="w-[200px] py-2.5 text-[17px] font-bold bg-[#42B72A] hover:bg-[#36A420] text-white rounded-md shadow-lg transition-all"
                  >
                      Crear cuenta nueva
                   </Button>
              </div>
            </form>
          </div>

          {/* Recent Users Bar - WoWonder Style */}
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="flex items-center justify-between bg-[#111] border border-[#222] rounded-lg p-3 px-4 shadow-lg backdrop-blur-sm bg-opacity-80"
          >
             <div className="flex items-center -space-x-3">
                 {[1,2,3,4].map((i) => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111] bg-neutral-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${10+i}`} alt="User" className="w-full h-full object-cover" />
                     </div>
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-[#111] bg-[#d93025] text-white flex items-center justify-center text-[10px] font-bold">
                    +99
                 </div>
             </div>
             <div className="text-right">
                 <p className="text-white font-bold text-sm">1,208</p>
                 <p className="text-[#888] text-[10px]">usuarios nuevos</p>
             </div>
          </motion.div>
          
          <div className="text-center relative z-10">
             <p className="text-xs text-neutral-500">
               <Link to="/create-page" className="font-bold text-white hover:underline transition-colors">Crea una página</Link> para una celebridad, marca o negocio.
             </p>
           </div>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      
      {/* Wave Separator & Footer */}
      <div className="relative z-10 w-full mt-auto">
         {/* SVG Wave */}
         <div className="w-full relative -bottom-1">
             <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-[#0A0A0A] fill-current">
                 <path d="M0 60L48 65C96 70 192 80 288 83.3C384 86.7 480 83.3 576 75C672 66.7 768 53.3 864 51.7C960 50 1056 60 1152 68.3C1248 76.7 1344 83.3 1392 86.7L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" />
             </svg>
         </div>
         <footer className="w-full text-center py-6 bg-[#0A0A0A] text-neutral-600 text-xs">
           <div className="flex justify-center gap-6 mb-3 px-4 font-medium">
               <span className="hover:text-neutral-400 cursor-pointer transition-colors">Español</span>
               <span className="hover:text-neutral-400 cursor-pointer transition-colors">English (US)</span>
               <span className="hover:text-neutral-400 cursor-pointer transition-colors">Français</span>
           </div>
           Hubbax © 2025
         </footer>
      </div>
    </div>
  );
}
