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
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-[480px] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5"
      >

        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#111]">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Crear cuenta</h2>
            <p className="text-neutral-500 text-sm mt-0.5">Es rápido y fácil.</p>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    type="text" 
                    placeholder="Nombre"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                    className="bg-[#1A1A1A] border-transparent text-white placeholder:text-neutral-600 focus:bg-[#202020] focus:ring-1 focus:ring-white/10 h-10 rounded-lg text-sm"
                    hideLabel
                />
                <Input 
                    type="text" 
                    placeholder="Apellido"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                    className="bg-[#1A1A1A] border-transparent text-white placeholder:text-neutral-600 focus:bg-[#202020] focus:ring-1 focus:ring-white/10 h-10 rounded-lg text-sm"
                    hideLabel
                />
            </div>

            <Input 
              type="text" 
              placeholder="Número de celular o correo electrónico"
              error={errors.email?.message}
              {...register('email')}
              className="bg-[#1A1A1A] border-transparent text-white placeholder:text-neutral-600 focus:bg-[#202020] focus:ring-1 focus:ring-white/10 h-10 rounded-lg text-sm"
              hideLabel
            />
            
            <Input 
              type="password" 
              placeholder="Contraseña nueva"
              error={errors.password?.message}
              {...register('password')}
              className="bg-[#1A1A1A] border-transparent text-white placeholder:text-neutral-600 focus:bg-[#202020] focus:ring-1 focus:ring-white/10 h-10 rounded-lg text-sm"
              hideLabel
            />

            <div className="space-y-2 pt-1">
                <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold ml-1">Fecha de nacimiento</label>
                <Input 
                    type="date" 
                    className="bg-[#1A1A1A] border-transparent text-white [&::-webkit-calendar-picker-indicator]:invert h-10 rounded-lg text-sm focus:bg-[#202020]"
                    error={errors.birthDate?.message}
                    {...register('birthDate')}
                    hideLabel
                />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold ml-1">Género</label>
                <div className="relative">
                     <select 
                       className={cn(
                         "w-full h-10 rounded-lg bg-[#1A1A1A] text-sm text-white px-3 focus:outline-none appearance-none transition-all cursor-pointer border-transparent focus:bg-[#202020]",
                         errors.gender ? "border-red-500" : ""
                       )}
                       {...register('gender')}
                       defaultValue=""
                     >
                        <option value="" disabled className="bg-[#1A1A1A]">Selecciona...</option>
                        <option value="male" className="bg-[#1A1A1A]">Hombre</option>
                        <option value="female" className="bg-[#1A1A1A]">Mujer</option>
                        <option value="other" className="bg-[#1A1A1A]">Personalizado</option>
                     </select>
                </div>
                {errors.gender && <span className="text-xs text-red-500">{errors.gender.message}</span>}
            </div>

            <div className="text-[10px] text-neutral-600 leading-relaxed px-1">
                Es posible que las personas que usan nuestro servicio hayan subido tu información de contacto a Hubbax. <span className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors">Obtén más información.</span>
                <br /><br />
                Al hacer clic en "Registrarte", aceptas nuestras <span className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors">Condiciones</span>, la <span className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors">Política de privacidad</span> y la <span className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors">Política de cookies</span>.
            </div>

            <div className="flex justify-center pt-4 pb-2">
                <Button type="submit" className="w-1/2 py-5 text-base font-medium bg-green-600 hover:bg-green-500 text-white rounded-lg shadow-lg shadow-green-900/20" size="lg" isLoading={isLoading}>
                  Registrarte
                </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
