import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { X, ChevronDown, HelpCircle } from 'lucide-react';
import { registerSchema, RegisterFormData } from '../../lib/schemas';
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
    console.log('Register Data:', data);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/feed');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#f0f2f5]/60 dark:bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[432px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_12px_28px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.1)] max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#dadde1] dark:border-[#3E4042]">
          <div>
            <h2 className="text-[32px] font-bold text-[#1c1e21] dark:text-white leading-tight">Registrarte</h2>
            <p className="text-[15px] text-[#606770] dark:text-[#B0B3B8]">Es rápido, fácil y libre.</p>
          </div>
          <button onClick={onClose} className="text-[#606770] dark:text-[#B0B3B8] hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
                <Input 
                    type="text" 
                    placeholder="Nombre"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                    className="h-10 bg-[#f5f6f7] dark:bg-[#1c1e21] border-[#dddfe2] dark:border-white/10 text-black dark:text-white placeholder:text-[#8d949e] px-3 rounded-lg text-base"
                    hideLabel
                />
                <Input 
                    type="text" 
                    placeholder="Apellido"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                    className="h-10 bg-[#f5f6f7] dark:bg-[#1c1e21] border-[#dddfe2] dark:border-white/10 text-black dark:text-white placeholder:text-[#8d949e] px-3 rounded-lg text-base"
                    hideLabel
                />
            </div>

            {/* Email/Pass */}
            <Input 
                type="text" 
                placeholder="Número de celular o correo electrónico"
                error={errors.email?.message}
                {...register('email')}
                className="h-10 bg-[#f5f6f7] dark:bg-[#1c1e21] border-[#dddfe2] dark:border-white/10 text-black dark:text-white placeholder:text-[#8d949e] px-3 rounded-lg text-base"
                hideLabel
            />
            
            <Input 
                type="password" 
                placeholder="Contraseña nueva"
                error={errors.password?.message}
                {...register('password')}
                className="h-10 bg-[#f5f6f7] dark:bg-[#1c1e21] border-[#dddfe2] dark:border-white/10 text-black dark:text-white placeholder:text-[#8d949e] px-3 rounded-lg text-base"
                hideLabel
            />

            {/* Birthdate Section */}
            <div className="pt-1">
                <div className="flex items-center gap-1 mb-1">
                   <label className="text-[12px] text-[#606770] dark:text-[#B0B3B8]">Fecha de nacimiento</label>
                   <HelpCircle className="w-3 h-3 text-[#606770] dark:text-[#B0B3B8] cursor-help" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                        <select className="w-full h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md px-2 text-[15px] dark:text-white appearance-none cursor-pointer">
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d}>{d}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-[#606770] pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select className="w-full h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md px-2 text-[15px] dark:text-white appearance-none cursor-pointer">
                            {['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'].map(m => <option key={m}>{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-[#606770] pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select className="w-full h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md px-2 text-[15px] dark:text-white appearance-none cursor-pointer">
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(y => <option key={y}>{y}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-[#606770] pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Gender Section */}
            <div className="pt-1">
                <div className="flex items-center gap-1 mb-1">
                   <label className="text-[12px] text-[#606770] dark:text-[#B0B3B8]">Género</label>
                   <HelpCircle className="w-3 h-3 text-[#606770] dark:text-[#B0B3B8] cursor-help" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center justify-between px-3 h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md cursor-pointer">
                        <span className="text-[15px] dark:text-white">Mujer</span>
                        <input type="radio" value="female" {...register('gender')} className="accent-[#d93025]" />
                    </label>
                    <label className="flex items-center justify-between px-3 h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md cursor-pointer">
                        <span className="text-[15px] dark:text-white">Hombre</span>
                        <input type="radio" value="male" {...register('gender')} className="accent-[#d93025]" />
                    </label>
                    <label className="flex items-center justify-between px-3 h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md cursor-pointer">
                        <span className="text-[15px] dark:text-white">Otro</span>
                        <input type="radio" value="other" {...register('gender')} className="accent-[#d93025]" />
                    </label>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="text-[11px] text-[#777] dark:text-[#B0B3B8] leading-tight space-y-2 py-2">
                <p>Es posible que las personas que usan nuestro servicio hayan subido tu información de contacto a Hubbax. <span className="text-[#385898] dark:text-[#42b72a] cursor-pointer hover:underline">Obtén más información</span>.</p>
                <p>Al hacer clic en "Registrarte", aceptas nuestras <span className="text-[#385898] dark:text-[#42b72a] cursor-pointer hover:underline">Condiciones</span>, la <span className="text-[#385898] dark:text-[#42b72a] cursor-pointer hover:underline">Política de privacidad</span> y la <span className="text-[#385898] dark:text-[#42b72a] cursor-pointer hover:underline">Política de cookies</span>.</p>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-2">
                <Button 
                    type="submit" 
                    className="w-[194px] h-9 bg-[#00a400] hover:bg-[#008d00] text-white font-bold text-[18px] rounded-md transition-all active:scale-[0.98]"
                    isLoading={isLoading}
                >
                    Registrarte
                </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
