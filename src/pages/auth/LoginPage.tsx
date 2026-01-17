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
    <div className="min-h-screen relative overflow-hidden bg-[#050505] flex flex-col justify-between font-sans tracking-tight selection:bg-[#d93025] selection:text-white">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#d93025]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 relative z-10 w-full py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full max-w-6xl">
        
        {/* Left Col: Branding & Visuals */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
             <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="flex flex-col items-center lg:items-start"
             >
                 <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#d93025] to-purple-600 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500 rounded-full" />
                    <img src="/assets/logo.png" alt="Caramelo Brand" className="relative h-28 lg:h-36 object-contain mb-6 drop-shadow-2xl" />
                 </div>
                 <h2 className="text-3xl lg:text-4xl font-medium text-neutral-200 leading-snug max-w-lg tracking-tight">
                     Conéctate con tu mundo. <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93025] to-purple-500 font-bold">Sin límites.</span>
                 </h2>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
             >
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#d93025] to-purple-600 rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                <div className="relative rounded-[1.8rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <img 
                        src="/assets/hero_people.png" 
                        alt="Social Connection" 
                        className="w-[400px] lg:w-[500px] h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
             </motion.div>
        </div>

        {/* Right Col: Glassmorphic Login Card */}
        <div className="w-full max-w-md lg:w-[460px]">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#121212]/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 lg:p-12 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Top Shine */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="space-y-5">
                <div className="relative group">
                    <Input 
                        type="email" 
                        placeholder="Correo electrónico o teléfono"
                        error={errors.email?.message}
                        {...register('email')}
                        className="h-[60px] bg-[#0A0A0A]/60 border-white/5 text-white placeholder:text-neutral-500 focus:bg-[#0A0A0A] focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 rounded-xl transition-all text-lg px-5 shadow-inner"
                        hideLabel
                    />
                </div>
                <div className="relative group">
                    <Input 
                        type="password" 
                        placeholder="Contraseña"
                        error={errors.password?.message}
                        {...register('password')}
                        className="h-[60px] bg-[#0A0A0A]/60 border-white/5 text-white placeholder:text-neutral-500 focus:bg-[#0A0A0A] focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 rounded-xl transition-all text-lg px-5 shadow-inner"
                        hideLabel
                    />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-8 text-xl font-bold rounded-xl bg-gradient-to-r from-[#d93025] to-[#b01e15] hover:brightness-110 text-white transition-all shadow-lg shadow-[#d93025]/20 transform hover:-translate-y-0.5" 
                size="lg" 
                isLoading={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Iniciar sesión"}
              </Button>
    
              <div className="flex justify-center pt-2">
                <Link 
                  to="/forgot-password" 
                  className="text-neutral-400 hover:text-[#d93025] transition-colors text-base font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-neutral-600 text-xs uppercase font-extrabold tracking-widest">O</span>
                  <div className="flex-grow border-t border-white/10"></div>
              </div>
      
              <div className="flex justify-center">
                   <Button 
                      onClick={() => setIsRegisterOpen(true)}
                      type="button" 
                      className="px-8 py-4 h-auto text-[17px] font-bold bg-[#2f3031] hover:bg-[#3A3B3C] border border-white/5 text-white rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                      Crear cuenta nueva
                   </Button>
              </div>
            </form>
          </motion.div>

          <div className="text-center pt-6 space-y-2">
             <p className="text-sm text-neutral-500">
               <Link to="/create-page" className="font-semibold text-neutral-300 hover:text-white hover:underline transition-colors">Crea una página</Link> para una celebridad, marca o negocio.
             </p>
           </div>
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
