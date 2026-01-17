import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SplitAuthLayout } from '../../layouts/SplitAuthLayout';
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
    // Simulate login
    console.log('Login Data:', data);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/feed');
    }, 2000);
  };

  return (
    <>
      <SplitAuthLayout 
        title="Hubbax" 
        subtitle="Hubbax te ayuda a comunicarte y compartir con las personas que forman parte de tu vida."
      >
        <div className="w-full space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-2xl shadow-xl">
            
            <Input 
              label="Correo electrónico o teléfono" 
              type="email" 
              error={errors.email?.message}
              {...register('email')}
              className="h-[52px]"
            />
            <Input 
              label="Contraseña" 
              type="password" 
              error={errors.password?.message}
              {...register('password')}
              className="h-[52px]"
            />
            
            <Button type="submit" className="w-full py-6 text-xl font-bold" size="lg" isLoading={isLoading} variant="gradient">
              {isLoading ? <Loader2 className="animate-spin" /> : "Iniciar Sesión"}
            </Button>
  
            <div className="flex justify-center pt-2">
              <Link 
                to="/forgot-password" 
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>
  
          <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-white/30 text-xs uppercase font-medium">O</span>
              <div className="flex-grow border-t border-white/10"></div>
          </div>
  
          <div className="flex justify-center">
               <Button 
                  onClick={() => setIsRegisterOpen(true)}
                  type="button" 
                  variant="success" 
                  className="w-auto px-8 py-6 text-lg"
              >
                  Crear cuenta nueva
               </Button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-white/60">
            <Link to="/create-page" className="font-bold hover:underline text-white">Crea una página</Link> para una celebridad, una marca o un negocio.
          </p>
        </div>
      </SplitAuthLayout>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      
      {/* Official Footer */}
      <footer className="w-full bg-[#050505] text-[#737373] text-xs py-8 px-4 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/60">
                <span className="text-white/40">Español</span>
                <span className="hover:underline cursor-pointer">English (US)</span>
                <span className="hover:underline cursor-pointer">Français (France)</span>
                <span className="hover:underline cursor-pointer">Português (Brasil)</span>
                <span className="hover:underline cursor-pointer">Italiano</span>
                <span className="hover:underline cursor-pointer">Deutsch</span>
            </div>
            <div className="border-t border-white/10 pt-4 flex flex-wrap gap-x-4 gap-y-2">
                <span className="hover:underline cursor-pointer">Registrarte</span>
                <span className="hover:underline cursor-pointer">Entrar</span>
                <span className="hover:underline cursor-pointer">Messenger</span>
                <span className="hover:underline cursor-pointer">Facebook Lite</span>
                <span className="hover:underline cursor-pointer">Video</span>
                <span className="hover:underline cursor-pointer">Lugares</span>
                <span className="hover:underline cursor-pointer">Juegos</span>
                <span className="hover:underline cursor-pointer">Marketplace</span>
                <span className="hover:underline cursor-pointer">Meta Pay</span>
                <span className="hover:underline cursor-pointer">Meta Store</span>
                <span className="hover:underline cursor-pointer">Meta Quest</span>
                <span className="hover:underline cursor-pointer">Instagram</span>
                <span className="hover:underline cursor-pointer">Threads</span>
                <span className="hover:underline cursor-pointer">Recaudaciones de fondos</span>
                <span className="hover:underline cursor-pointer">Servicios</span>
                <span className="hover:underline cursor-pointer">Centro de información de votación</span>
                <span className="hover:underline cursor-pointer">Política de privacidad</span>
                <span className="hover:underline cursor-pointer">Centro de privacidad</span>
                <span className="hover:underline cursor-pointer">Grupos</span>
                <span className="hover:underline cursor-pointer">Información</span>
                <span className="hover:underline cursor-pointer">Crear anuncio</span>
                <span className="hover:underline cursor-pointer">Crear página</span>
                <span className="hover:underline cursor-pointer">Desarrolladores</span>
                <span className="hover:underline cursor-pointer">Empleo</span>
                <span className="hover:underline cursor-pointer">Cookies</span>
                <span className="hover:underline cursor-pointer">Opciones de anuncios</span>
                <span className="hover:underline cursor-pointer">Condiciones</span>
                <span className="hover:underline cursor-pointer">Ayuda</span>
                <span className="hover:underline cursor-pointer">Subir contactos y no usuarios</span>
            </div>
            <div className="pt-2">
                Hubbax © 2025
            </div>
        </div>
      </footer>
    </>
  );
}
