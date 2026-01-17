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
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-[500px] bg-[#18191A] border border-[#2f3031] rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/5"
      >

        <div className="flex items-center justify-between p-5 border-b border-[#2f3031]">
          <div>
            <h2 className="text-3xl font-bold text-[#E4E6EB] tracking-tight">Registrarte</h2>
            <p className="text-[#B0B3B8] text-[15px] mt-1">Es rápido y fácil.</p>
          </div>
          <button onClick={onClose} className="text-[#B0B3B8] hover:text-[#E4E6EB] transition-colors p-2 hover:bg-[#3A3B3C] rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <Input 
                    type="text" 
                    placeholder="Nombre"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                    className="bg-[#242526] border border-[#2f3031] text-[#E4E6EB] placeholder:text-[#B0B3B8] focus:bg-[#242526] focus:border-[#d93025]/50 focus:ring-2 focus:ring-[#d93025]/20 h-11 rounded-md text-[15px] transition-all"
                    hideLabel
                />
                <Input 
                    type="text" 
                    placeholder="Apellido"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                    className="bg-[#242526] border border-[#2f3031] text-[#E4E6EB] placeholder:text-[#B0B3B8] focus:bg-[#242526] focus:border-[#d93025]/50 focus:ring-2 focus:ring-[#d93025]/20 h-11 rounded-md text-[15px] transition-all"
                    hideLabel
                />
            </div>

            <Input 
              type="text" 
              placeholder="Número de celular o correo electrónico"
              error={errors.email?.message}
              {...register('email')}
              className="bg-[#242526] border border-[#2f3031] text-[#E4E6EB] placeholder:text-neutral-500 focus:bg-[#242526] focus:border-[#d93025]/50 focus:ring-2 focus:ring-[#d93025]/20 h-11 rounded-md text-[15px] transition-all"
              hideLabel
            />
            
            <Input 
              type="password" 
              placeholder="Contraseña nueva"
              error={errors.password?.message}
              {...register('password')}
              className="bg-[#242526] border border-[#2f3031] text-[#E4E6EB] placeholder:text-neutral-500 focus:bg-[#242526] focus:border-[#d93025]/50 focus:ring-2 focus:ring-[#d93025]/20 h-11 rounded-md text-[15px] transition-all"
              hideLabel
            />

            {/* Birthdate: Split into Day, Month, Year */}
            <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1 group">
                    <label className="text-[11px] text-[#B0B3B8] font-medium ml-1 mb-1 block group-hover:text-[#d93025] transition-colors">Fecha de nacimiento</label>
                </div>
                <div className="flex gap-3">
                    {/* Day */}
                    <div className="relative flex-1">
                        <select 
                            className="w-full h-10 rounded-md bg-[#242526] border border-[#2f3031] text-[#E4E6EB] px-3 appearance-none cursor-pointer focus:border-[#d93025] focus:ring-1 focus:ring-[#d93025] transition-all font-medium text-[15px]"
                            id="birthDay"
                        >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={day} className="bg-[#242526] text-[#E4E6EB]">{day}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-[#B0B3B8] pointer-events-none" />
                    </div>
                    
                    {/* Month */}
                    <div className="relative flex-1">
                        <select 
                            id="birthMonth"
                            className="w-full h-10 rounded-md bg-[#242526] border border-[#2f3031] text-[#E4E6EB] px-3 appearance-none cursor-pointer focus:border-[#d93025] focus:ring-1 focus:ring-[#d93025] transition-all font-medium text-[15px]"
                        >
                            {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((month, idx) => (
                                <option key={idx} value={idx + 1} className="bg-[#242526] text-[#E4E6EB]">{month}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-[#B0B3B8] pointer-events-none" />
                    </div>

                    {/* Year */}
                    <div className="relative flex-1">
                        <select 
                            id="birthYear"
                            className="w-full h-10 rounded-md bg-[#242526] border border-[#2f3031] text-[#E4E6EB] px-3 appearance-none cursor-pointer focus:border-[#d93025] focus:ring-1 focus:ring-[#d93025] transition-all font-medium text-[15px]"
                            defaultValue={new Date().getFullYear()}
                        >
                             {Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year} className="bg-[#242526] text-[#E4E6EB]">{year}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-[#B0B3B8] pointer-events-none" />
                    </div>
                </div>
                {/* Hidden input for Zod validation - Mocked value to pass validation for UI demo */}
                <input type="hidden" {...register('birthDate')} defaultValue="2000-01-01" /> 
                {errors.birthDate && <span className="text-xs text-red-500 ml-1">{errors.birthDate.message}</span>}
            </div>

            {/* Gender: Radio Style Cards */}
            <div className="space-y-1">
                <div className="flex items-center gap-1 group">
                    <label className="text-[11px] text-[#B0B3B8] font-medium ml-1 mb-1 block group-hover:text-[#d93025] transition-colors">Género</label>
                </div>
                <div className="flex gap-3">
                    <label className="flex-1 flex items-center justify-between px-3 h-10 bg-[#242526] border border-[#2f3031] rounded-md cursor-pointer transition-all hover:bg-[#3A3B3C] has-[:checked]:border-[#d93025] has-[:checked]:bg-[#2a2b2c] group">
                        <span className="text-[15px] font-medium text-[#E4E6EB] group-hover:text-[#d93025] transition-colors">Mujer</span>
                        <input type="radio" value="female" {...register('gender')} className="text-[#d93025] focus:ring-0 bg-[#3A3B3C] border-none accent-[#d93025]" />
                    </label>
                     <label className="flex-1 flex items-center justify-between px-3 h-10 bg-[#242526] border border-[#2f3031] rounded-md cursor-pointer transition-all hover:bg-[#3A3B3C] has-[:checked]:border-[#d93025] has-[:checked]:bg-[#2a2b2c] group">
                        <span className="text-[15px] font-medium text-[#E4E6EB] group-hover:text-[#d93025] transition-colors">Hombre</span>
                        <input type="radio" value="male" {...register('gender')} className="text-[#d93025] focus:ring-0 bg-[#3A3B3C] border-none accent-[#d93025]" />
                    </label>
                     <label className="flex-1 flex items-center justify-between px-3 h-10 bg-[#242526] border border-[#2f3031] rounded-md cursor-pointer transition-all hover:bg-[#3A3B3C] has-[:checked]:border-[#d93025] has-[:checked]:bg-[#2a2b2c] group">
                        <span className="text-[15px] font-medium text-[#E4E6EB] group-hover:text-[#d93025] transition-colors">Personalizado</span>
                        <input type="radio" value="other" {...register('gender')} className="text-[#d93025] focus:ring-0 bg-[#3A3B3C] border-none accent-[#d93025]" />
                    </label>
                </div>
                {errors.gender && <span className="text-xs text-red-500 ml-1">{errors.gender.message}</span>}
                
                {/* Custom Gender Fields (Conditional) */}
                {watch('gender') === 'other' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 pt-2 overflow-hidden"
                  >
                     <div className="relative">
                         <select 
                           className="w-full h-10 rounded-md bg-[#242526] border border-[#2f3031] text-[15px] text-[#E4E6EB] px-3 appearance-none cursor-pointer focus:border-[#d93025] focus:ring-1 focus:ring-[#d93025] transition-all"
                         >
                            <option value="" disabled selected className="bg-[#242526]">Selecciona tu pronombre</option>
                            <option value="she" className="bg-[#242526]">Ella: "Deséale un feliz cumpleaños a ella"</option>
                            <option value="he" className="bg-[#242526]">Él: "Deséale un feliz cumpleaños a él"</option>
                            <option value="they" className="bg-[#242526]">Neutro: "Deséale un feliz cumpleaños"</option>
                         </select>
                         <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-[#B0B3B8] pointer-events-none" />
                     </div>
                     
                     <div className="space-y-1">
                        <label className="text-[11px] text-[#B0B3B8] ml-1">Tu género (opcional)</label>
                        <Input 
                            type="text" 
                            placeholder="Género (opcional)"
                            className="bg-[#242526] border border-[#2f3031] text-[#E4E6EB] placeholder:text-[#B0B3B8] focus:bg-[#242526] focus:border-[#d93025]/50 focus:ring-2 focus:ring-[#d93025]/20 h-10 rounded-md text-[15px] transition-all"
                            hideLabel
                        />
                     </div>
                  </motion.div>
                )}
            </div>

            <div className="text-[11px] text-[#B0B3B8] leading-relaxed px-1 mt-2">
                Es posible que las personas que usan nuestro servicio hayan subido tu información de contacto a Hubbax. <span className="text-[#d93025] hover:text-[#b01e15] cursor-pointer transition-colors font-medium hover:underline">Obtén más información.</span>
                <br /><br />
                Al hacer clic en "Registrarte", aceptas nuestras <span className="text-[#d93025] hover:text-[#b01e15] cursor-pointer transition-colors font-medium hover:underline">Condiciones</span>, la <span className="text-[#d93025] hover:text-[#b01e15] cursor-pointer transition-colors font-medium hover:underline">Política de privacidad</span> y la <span className="text-[#d93025] hover:text-[#b01e15] cursor-pointer transition-colors font-medium hover:underline">Política de cookies</span>.
            </div>

            <div className="flex justify-center pt-4 pb-2">
                <Button type="submit" className="w-[194px] py-2.5 text-[17px] font-bold bg-[#00A400] hover:bg-[#008f00] text-white rounded-md shadow-none transition-all h-9" size="lg" isLoading={isLoading}>
                  Registrarte
                </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
