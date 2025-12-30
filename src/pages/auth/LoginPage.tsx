import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SplitAuthLayout } from '../../layouts/SplitAuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <SplitAuthLayout 
      title="Bienvenido de nuevo" 
      subtitle="Ingresa tus credenciales para acceder a tu cuenta."
    >
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="space-y-4">
             <Button type="button" variant="outline" className="w-full relative py-6" size="lg">
                <Github className="w-5 h-5 absolute left-4" />
                Continuar con Github
             </Button>
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#050505] px-2 text-white/30">O continúa con tu email</span>
                </div>
             </div>
        </div>

        <Input 
          label="Dirección de Correo" 
          type="email" 
          icon={<Mail className="w-4 h-4" />}
          required
        />
        <Input 
          label="Contraseña" 
          type="password" 
          icon={<Lock className="w-4 h-4" />}
          required
        />
        
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center space-x-2 cursor-pointer group">
             <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-primary transition-colors cursor-pointer" />
             <span className="text-white/40 group-hover:text-white/60 transition-colors">Recuérdame</span>
          </label>
          <Link 
            to="/forgot-password" 
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button type="submit" className="w-full py-6 text-lg" size="lg" isLoading={isLoading} variant="gradient">
          Iniciar Sesión
          {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
        </Button>

        <p className="text-center text-sm text-white/40 mt-6">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Regístrate gratis
          </Link>
        </p>
      </form>
    </SplitAuthLayout>
  );
}
