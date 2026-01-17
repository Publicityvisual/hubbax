import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { X, ChevronDown } from 'lucide-react';
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
    watch,
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-[600px] bg-[#121212]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_0_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden ring-1 ring-white/10"
      >
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d93025] to-transparent opacity-80" />

        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Registrarte</h2>
            <p className="text-neutral-400 text-base mt-1">Es rápido y fácil.</p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    type="text" 
                    placeholder="Nombre"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                    className="bg-[#0A0A0A]/50 border-white/5 text-white placeholder:text-neutral-500 focus:bg-[#0A0A0A] focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 h-14 rounded-xl text-lg transition-all px-4 shadow-inner"
                    hideLabel
                />
                <Input 
                    type="text" 
                    placeholder="Apellido"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                    className="bg-[#0A0A0A]/50 border-white/5 text-white placeholder:text-neutral-500 focus:bg-[#0A0A0A] focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 h-14 rounded-xl text-lg transition-all px-4 shadow-inner"
                    hideLabel
                />
            </div>

            <div className="space-y-4">
                <Input 
                  type="text" 
                  placeholder="Móvil o correo electrónico"
                  error={errors.email?.message}
                  {...register('email')}
                  className="bg-[#0A0A0A]/50 border-white/5 text-white placeholder:text-neutral-500 focus:bg-[#0A0A0A] focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 h-14 rounded-xl text-lg transition-all px-4 shadow-inner"
                  hideLabel
                />
                
                <Input 
                  type="password" 
                  placeholder="Contraseña nueva"
                  error={errors.password?.message}
                  {...register('password')}
                  className="bg-[#0A0A0A]/50 border-white/5 text-white placeholder:text-neutral-500 focus:bg-[#0A0A0A] focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 h-14 rounded-xl text-lg transition-all px-4 shadow-inner"
                  hideLabel
                />
            </div>

            {/* Birthdate */}
            <div className="space-y-2 pt-2">
                <div className="flex items-center gap-1 group">
                    <label className="text-sm text-neutral-400 font-medium ml-1 block group-hover:text-[#d93025] transition-colors">Fecha de nacimiento</label>
                </div>
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <select 
                            className="w-full h-12 rounded-xl bg-[#0A0A0A]/50 border border-white/5 text-white px-3 appearance-none cursor-pointer focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 transition-all font-medium text-base hover:bg-[#0A0A0A]"
                            id="birthDay"
                        >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={day} className="bg-[#18191A] text-white">{day}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-neutral-500 pointer-events-none" />
                    </div>
                    <div className="relative flex-1">
                        <select 
                            id="birthMonth"
                            className="w-full h-12 rounded-xl bg-[#0A0A0A]/50 border border-white/5 text-white px-3 appearance-none cursor-pointer focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 transition-all font-medium text-base hover:bg-[#0A0A0A]"
                        >
                            {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((month, idx) => (
                                <option key={idx} value={idx + 1} className="bg-[#18191A] text-white">{month}</option>
                            ))}
                        </select>
                         <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-neutral-500 pointer-events-none" />
                    </div>
                    <div className="relative flex-1">
                        <select 
                            id="birthYear"
                            className="w-full h-12 rounded-xl bg-[#0A0A0A]/50 border border-white/5 text-white px-3 appearance-none cursor-pointer focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 transition-all font-medium text-base hover:bg-[#0A0A0A]"
                            defaultValue={new Date().getFullYear()}
                        >
                             {Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year} className="bg-[#18191A] text-white">{year}</option>
                            ))}
                        </select>
                         <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-neutral-500 pointer-events-none" />
                    </div>
                </div>
                 {/* Hidden input for Zod validation */}
                 <input type="hidden" {...register('birthDate')} defaultValue="2000-01-01" /> 
                 {errors.birthDate && <span className="text-xs text-red-500 ml-1">{errors.birthDate.message}</span>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
                <div className="flex items-center gap-1 group">
                    <label className="text-sm text-neutral-400 font-medium ml-1 block group-hover:text-[#d93025] transition-colors">Género</label>
                </div>
                <div className="flex gap-3">
                    <label className="flex-1 flex items-center justify-between px-4 h-12 bg-[#0A0A0A]/50 border border-white/5 rounded-xl cursor-pointer transition-all hover:bg-[#18191A] hover:border-[#d93025]/50 has-[:checked]:border-[#d93025] has-[:checked]:bg-[#d93025]/10 group shadow-inner">
                        <span className="text-base font-medium text-white group-hover:text-[#d93025] transition-colors">Mujer</span>
                        <input type="radio" value="female" {...register('gender')} className="scale-125 text-[#d93025] focus:ring-0 bg-[#3A3B3C] border-none accent-[#d93025]" />
                    </label>
                     <label className="flex-1 flex items-center justify-between px-4 h-12 bg-[#0A0A0A]/50 border border-white/5 rounded-xl cursor-pointer transition-all hover:bg-[#18191A] hover:border-[#d93025]/50 has-[:checked]:border-[#d93025] has-[:checked]:bg-[#d93025]/10 group shadow-inner">
                        <span className="text-base font-medium text-white group-hover:text-[#d93025] transition-colors">Hombre</span>
                        <input type="radio" value="male" {...register('gender')} className="scale-125 text-[#d93025] focus:ring-0 bg-[#3A3B3C] border-none accent-[#d93025]" />
                    </label>
                     <label className="flex-1 flex items-center justify-between px-4 h-12 bg-[#0A0A0A]/50 border border-white/5 rounded-xl cursor-pointer transition-all hover:bg-[#18191A] hover:border-[#d93025]/50 has-[:checked]:border-[#d93025] has-[:checked]:bg-[#d93025]/10 group shadow-inner">
                        <span className="text-base font-medium text-white group-hover:text-[#d93025] transition-colors">Personalizado</span>
                        <input type="radio" value="other" {...register('gender')} className="scale-125 text-[#d93025] focus:ring-0 bg-[#3A3B3C] border-none accent-[#d93025]" />
                    </label>
                </div>
                {errors.gender && <span className="text-xs text-red-500 ml-1">{errors.gender.message}</span>}
                
                {/* Custom Gender Fields */}
                {watch('gender') === 'other' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 pt-2 overflow-hidden"
                  >
                     <div className="relative">
                         <select 
                           className="w-full h-12 rounded-xl bg-[#0A0A0A]/50 border border-white/5 text-base text-white px-3 appearance-none cursor-pointer focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 transition-all hover:bg-[#0A0A0A]"
                         >
                            <option value="" disabled selected className="bg-[#18191A]">Selecciona tu pronombre</option>
                            <option value="she" className="bg-[#18191A]">Ella</option>
                            <option value="he" className="bg-[#18191A]">Él</option>
                            <option value="they" className="bg-[#18191A]">Neutro</option>
                         </select>
                         <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-neutral-500 pointer-events-none" />
                     </div>
                     <Input 
                        type="text" 
                        placeholder="Género (opcional)"
                        className="bg-[#0A0A0A]/50 border border-white/5 text-white placeholder:text-neutral-500 focus:bg-[#0A0A0A] focus:border-[#d93025] focus:ring-4 focus:ring-[#d93025]/10 h-12 rounded-xl text-lg transition-all shadow-inner"
                        hideLabel
                    />
                  </motion.div>
                )}
            </div>

            <div className="text-xs text-neutral-500 leading-relaxed px-1 mt-4">
                Es posible que las personas que usan nuestro servicio hayan subido tu información de contacto a Hubbax.
                <br />
                Al hacer clic en "Registrarte", aceptas nuestras <span className="text-[#d93025] cursor-pointer hover:underline">Condiciones</span>.
            </div>

            <div className="flex justify-center pt-6 pb-2">
                <Button type="submit" className="w-full py-4 text-xl font-bold bg-gradient-to-r from-[#00A400] to-[#008f00] hover:brightness-110 text-white rounded-xl shadow-lg transition-all h-auto hover:-translate-y-0.5" size="lg" isLoading={isLoading}>
                  Registrarte
                </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
