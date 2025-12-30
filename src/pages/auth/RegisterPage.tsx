import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SplitAuthLayout } from '../../layouts/SplitAuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, User, ArrowRight, Github, Calendar, Users } from 'lucide-react';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate reg
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <SplitAuthLayout 
      title="Crear Cuenta" 
      subtitle="Únete a la red exclusiva hoy."
    >
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
         <div className="space-y-4">
             <Button type="button" variant="outline" className="w-full relative py-6" size="lg">
                <Github className="w-5 h-5 absolute left-4" />
                Registrarse con Github
             </Button>
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#050505] px-2 text-white/30">O regístrate con tu email</span>
                </div>
             </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Input 
                label="Nombre" 
                type="text" 
                icon={<User className="w-4 h-4" />}
                required
            />
            <Input 
                label="Apellido" 
                type="text" 
                icon={<User className="w-4 h-4" />}
                required
            />
        </div>

        <Input 
          label="Dirección de Correo" 
          type="email" 
          icon={<Mail className="w-4 h-4" />}
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
             <Input 
                label="Fecha de Nacimiento" 
                type="date" 
                icon={<Calendar className="w-4 h-4" />}
                required
                className="[&::-webkit-calendar-picker-indicator]:invert"
            />
             <div className="relative w-full group">
                 <select className="w-full h-[52px] rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-sm text-white px-5 pl-12 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 outline-none appearance-none transition-all cursor-pointer">
                    <option value="" disabled selected>Género</option>
                    <option value="male" className="bg-black">Masculino</option>
                    <option value="female" className="bg-black">Femenino</option>
                    <option value="other" className="bg-black">Otro</option>
                 </select>
                 <Users className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
             </div>
        </div>

        <Input 
          label="Contraseña" 
          type="password" 
          icon={<Lock className="w-4 h-4" />}
          required
        />
        <Input 
          label="Confirmar Contraseña" 
          type="password" 
          icon={<Lock className="w-4 h-4" />}
          required
        />
        
        <div className="text-xs text-center text-white/40 leading-relaxed px-4">
            Al hacer clic en "Crear Cuenta", aceptas nuestros <span className="text-primary cursor-pointer hover:underline">Términos de Servicio</span> y <span className="text-primary cursor-pointer hover:underline">Política de Privacidad</span>.
        </div>

        <Button type="submit" className="w-full py-6 text-lg" size="lg" isLoading={isLoading} variant="gradient">
          Crear Cuenta
          {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
        </Button>

        <p className="text-center text-sm text-white/40 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Inicia Sesión
          </Link>
        </p>
      </form>
    </SplitAuthLayout>
  );
}
