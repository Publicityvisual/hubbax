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
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex flex-col">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse delay-700" />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 px-6 lg:px-12 relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Left Col: Brand / Slogan */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-4">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
             >
                <div className="inline-block p-1 rounded-2xl bg-gradient-to-tr from-primary/20 to-transparent backdrop-blur-sm border border-white/5 mb-6">
                    <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-primary to-violet-500 pb-2">
                        hubbax
                    </h1>
                </div>
                <h2 className="text-2xl lg:text-3xl font-medium text-white/90 leading-tight">
                    Conéctate con tu mundo <br/> en la siguiente generación social.
                </h2>
             </motion.div>
        </div>

        {/* Right Col: Glass Card Form */}
        <div className="w-full max-w-md lg:w-[420px]">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
          >
            {/* Glossy sheen effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
              <Input 
                label="Correo electrónico" 
                type="email" 
                error={errors.email?.message}
                {...register('email')}
                className="h-[56px] bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40 transition-all rounded-xl text-lg backdrop-blur-sm"
              />
              <Input 
                label="Contraseña" 
                type="password" 
                error={errors.password?.message}
                {...register('password')}
                className="h-[56px] bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40 transition-all rounded-xl text-lg backdrop-blur-sm"
              />
              
              <Button type="submit" className="w-full py-7 text-xl font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" size="lg" isLoading={isLoading} variant="gradient">
                {isLoading ? <Loader2 className="animate-spin" /> : "Iniciar Sesión"}
              </Button>
    
              <div className="flex justify-center pt-2">
                <Link 
                  to="/forgot-password" 
                  className="text-primary/80 hover:text-primary transition-colors text-sm font-medium hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-white/30 text-xs uppercase font-medium tracking-wider">O</span>
                  <div className="flex-grow border-t border-white/10"></div>
              </div>
      
              <div className="flex justify-center">
                   <Button 
                      onClick={() => setIsRegisterOpen(true)}
                      type="button" 
                      variant="outline" 
                      className="w-full py-6 text-lg border-white/20 hover:bg-white/5 hover:text-white hover:border-white/40 transition-all bg-transparent backdrop-blur-sm"
                  >
                      Crear cuenta nueva
                   </Button>
              </div>
            </form>
          </motion.div>
          
          <div className="mt-8 text-center relative z-10">
             <p className="text-sm text-white/40">
               <Link to="/create-page" className="font-bold hover:text-white transition-colors">Crea una página</Link> para una celebridad, marca o negocio.
             </p>
           </div>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      
      {/* Footer (Simplified for Aesthetics) */}
      <footer className="relative z-10 w-full text-center py-6 text-white/20 text-xs">
          <div className="flex justify-center gap-4 mb-2 flex-wrap px-4">
              <span className="hover:text-white/40 cursor-pointer transition-colors">Español</span>
              <span className="hover:text-white/40 cursor-pointer transition-colors">English (US)</span>
              <span className="hover:text-white/40 cursor-pointer transition-colors">Français</span>
          </div>
          Hubbax © 2025
      </footer>
    </div>
  );
}
