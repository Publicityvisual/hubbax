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
        className="relative w-full max-w-[432px] bg-[#242526] rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-bold text-white">Registrarte</h2>
            <p className="text-white/60 text-[15px]">Es rápido y fácil.</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <Input 
                    type="text" 
                    placeholder="Nombre"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                    className="bg-[#3A3B3C] border-0 text-white placeholder:text-white/60 focus:ring-0"
                    hideLabel
                />
                <Input 
                    type="text" 
                    placeholder="Apellido"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                    className="bg-[#3A3B3C] border-0 text-white placeholder:text-white/60 focus:ring-0"
                    hideLabel
                />
            </div>

            <Input 
              type="text" 
              placeholder="Número de celular o correo electrónico"
              error={errors.email?.message}
              {...register('email')}
              className="bg-[#3A3B3C] border-0 text-white placeholder:text-white/60 focus:ring-0"
              hideLabel
            />
            
            <Input 
              type="password" 
              placeholder="Contraseña nueva"
              error={errors.password?.message}
              {...register('password')}
              className="bg-[#3A3B3C] border-0 text-white placeholder:text-white/60 focus:ring-0"
              hideLabel
            />

            <div className="space-y-1">
                <label className="text-xs text-white/60">Fecha de nacimiento</label>
                <Input 
                    type="date" 
                    className="bg-[#3A3B3C] border-0 text-white [&::-webkit-calendar-picker-indicator]:invert"
                    error={errors.birthDate?.message}
                    {...register('birthDate')}
                    hideLabel
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs text-white/60">Género</label>
                <div className="relative">
                     <select 
                       className={cn(
                         "w-full h-[40px] rounded-md bg-[#3A3B3C] text-sm text-white px-3 focus:outline-none appearance-none transition-all cursor-pointer border border-[#3A3B3C]",
                         errors.gender ? "border-red-500" : ""
                       )}
                       {...register('gender')}
                       defaultValue=""
                     >
                        <option value="" disabled>Selecciona...</option>
                        <option value="male">Hombre</option>
                        <option value="female">Mujer</option>
                        <option value="other">Personalizado</option>
                     </select>
                </div>
                {errors.gender && <span className="text-xs text-red-500">{errors.gender.message}</span>}
            </div>

            <div className="text-[11px] text-white/40 leading-tight">
                Es posible que las personas que usan nuestro servicio hayan subido tu información de contacto a Hubbax. <span className="text-primary hover:underline cursor-pointer">Obtén más información.</span>
                <br /><br />
                Al hacer clic en "Registrarte", aceptas nuestras <span className="text-primary hover:underline cursor-pointer">Condiciones</span>, la <span className="text-primary hover:underline cursor-pointer">Política de privacidad</span> y la <span className="text-primary hover:underline cursor-pointer">Política de cookies</span>.
            </div>

            <div className="flex justify-center pt-2 pb-2">
                <Button type="submit" className="w-[194px]" size="lg" isLoading={isLoading} variant="success">
                  Registrarte
                </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
