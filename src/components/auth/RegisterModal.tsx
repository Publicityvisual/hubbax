import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import { registerSchema, RegisterFormData } from '../../lib/schemas';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-[480px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />

        <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Crear cuenta</h2>
            <p className="text-white/60 text-[15px] mt-1">Es rápido y fácil.</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 relative z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    type="text" 
                    placeholder="Nombre"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                    className="bg-black/20 border-white/5 text-white placeholder:text-white/40 focus:ring-0 focus:border-primary/50 focus:bg-black/40 h-11 rounded-xl"
                    hideLabel
                />
                <Input 
                    type="text" 
                    placeholder="Apellido"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                    className="bg-black/20 border-white/5 text-white placeholder:text-white/40 focus:ring-0 focus:border-primary/50 focus:bg-black/40 h-11 rounded-xl"
                    hideLabel
                />
            </div>

            <Input 
              type="text" 
              placeholder="Número de celular o correo electrónico"
              error={errors.email?.message}
              {...register('email')}
              className="bg-black/20 border-white/5 text-white placeholder:text-white/40 focus:ring-0 focus:border-primary/50 focus:bg-black/40 h-11 rounded-xl"
              hideLabel
            />
            
            <Input 
              type="password" 
              placeholder="Contraseña nueva"
              error={errors.password?.message}
              {...register('password')}
              className="bg-black/20 border-white/5 text-white placeholder:text-white/40 focus:ring-0 focus:border-primary/50 focus:bg-black/40 h-11 rounded-xl"
              hideLabel
            />

            <div className="space-y-2 pt-1">
                <label className="text-xs text-white/50 uppercase tracking-wider font-semibold ml-1">Fecha de nacimiento</label>
                <Input 
                    type="date" 
                    className="bg-black/20 border-white/5 text-white [&::-webkit-calendar-picker-indicator]:invert h-11 rounded-xl focus:border-primary/50 focus:bg-black/40"
                    error={errors.birthDate?.message}
                    {...register('birthDate')}
                    hideLabel
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-wider font-semibold ml-1">Género</label>
                <div className="relative">
                     <select 
                       className={cn(
                         "w-full h-11 rounded-xl bg-black/20 text-sm text-white px-3 focus:outline-none appearance-none transition-all cursor-pointer border border-white/5 focus:border-primary/50 focus:bg-black/40",
                         errors.gender ? "border-red-500" : ""
                       )}
                       {...register('gender')}
                       defaultValue=""
                     >
                        <option value="" disabled className="bg-[#242526]">Selecciona...</option>
                        <option value="male" className="bg-[#242526]">Hombre</option>
                        <option value="female" className="bg-[#242526]">Mujer</option>
                        <option value="other" className="bg-[#242526]">Personalizado</option>
                     </select>
                </div>
                {errors.gender && <span className="text-xs text-red-500">{errors.gender.message}</span>}
            </div>

            <div className="text-[11px] text-white/30 leading-relaxed px-1">
                Es posible que las personas que usan nuestro servicio hayan subido tu información de contacto a Hubbax. <span className="text-primary hover:text-white cursor-pointer transition-colors">Obtén más información.</span>
                <br /><br />
                Al hacer clic en "Registrarte", aceptas nuestras <span className="text-primary hover:text-white cursor-pointer transition-colors">Condiciones</span>, la <span className="text-primary hover:text-white cursor-pointer transition-colors">Política de privacidad</span> y la <span className="text-primary hover:text-white cursor-pointer transition-colors">Política de cookies</span>.
            </div>

            <div className="flex justify-center pt-4 pb-2">
                <Button type="submit" className="w-1/2 py-6 text-lg font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all rounded-xl" size="lg" isLoading={isLoading} variant="success">
                  Registrarte
                </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
