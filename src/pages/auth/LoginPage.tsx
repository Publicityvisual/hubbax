import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SplitAuthLayout } from '../../layouts/SplitAuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Loader2 } from 'lucide-react';
import { loginSchema, LoginFormData } from '../../lib/schemas';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
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
                onClick={() => navigate('/register')}
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
  );
}
