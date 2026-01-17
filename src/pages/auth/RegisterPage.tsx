import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SplitAuthLayout } from '../../layouts/SplitAuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, User, ArrowRight, Calendar, Users } from 'lucide-react';
import { registerSchema, RegisterFormData } from '../../lib/schemas';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    // Simulate reg
    console.log('Register Data:', data);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/feed');
    }, 2000);
  };

  return (
    <SplitAuthLayout 
      title="Crear Cuenta" 
      subtitle="Únete a la red exclusiva hoy."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">


        <div className="grid grid-cols-2 gap-4">
            <Input 
                label="Nombre" 
                type="text" 
                icon={<User className="w-4 h-4" />}
                error={errors.firstName?.message}
                {...register('firstName')}
            />
            <Input 
                label="Apellido" 
                type="text" 
                icon={<User className="w-4 h-4" />}
                error={errors.lastName?.message}
                {...register('lastName')}
            />
        </div>

        <Input 
          label="Número de celular o correo electrónico" 
          type="text" 
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        
        <div className="grid grid-cols-2 gap-4">
             <Input 
                label="Fecha de Nacimiento" 
                type="date" 
                icon={<Calendar className="w-4 h-4" />}
                className="[&::-webkit-calendar-picker-indicator]:invert"
                error={errors.birthDate?.message}
                {...register('birthDate')}
            />
             <div className="relative w-full group">
                 <select 
                   className={cn(
                     "w-full h-[54px] rounded-full border bg-white/5 backdrop-blur-xl text-sm text-white px-5 pl-12 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 outline-none appearance-none transition-all cursor-pointer",
                     errors.gender ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "border-white/10"
                   )}
                   {...register('gender')}
                   defaultValue=""
                 >
                    <option value="" disabled>Género</option>
                    <option value="male" className="bg-black">Masculino</option>
                    <option value="female" className="bg-black">Femenino</option>
                    <option value="other" className="bg-black">Otro</option>
                 </select>
                 <Users className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                 
                 <AnimatePresence>
                    {errors.gender && (
                        <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center mt-1.5 ml-2"
                        >
                            <div className="w-1 h-1 rounded-full bg-red-500 mr-2" />
                            <span className="text-xs text-red-400 font-medium">{errors.gender.message}</span>
                        </motion.div>
                    )}
                 </AnimatePresence>
             </div>
        </div>

        <Input 
          label="Contraseña" 
          type="password" 
          icon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register('password')}
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
