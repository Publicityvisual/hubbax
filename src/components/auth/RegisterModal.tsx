import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
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

            {/* Birthdate: Split into Day, Month, Year */}
            <div className="space-y-2 pt-1">
                <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold ml-1">Fecha de nacimiento</label>
                <div className="flex gap-3">
                    {/* Day */}
                    <select 
                        className="flex-1 h-10 rounded-lg bg-[#1A1A1A] text-sm text-white px-3 focus:outline-none appearance-none cursor-pointer border-transparent focus:bg-[#202020] hover:bg-[#202020] transition-colors"
                        id="birthDay"
                    >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day} className="bg-[#1A1A1A] text-white">{day}</option>
                        ))}
                    </select>
                    
                    {/* Month */}
                    <select 
                        id="birthMonth"
                        className="flex-1 h-10 rounded-lg bg-[#1A1A1A] text-sm text-white px-3 focus:outline-none appearance-none cursor-pointer border-transparent focus:bg-[#202020] hover:bg-[#202020] transition-colors"
                    >
                        {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((month, idx) => (
                            <option key={idx} value={idx + 1} className="bg-[#1A1A1A] text-white">{month}</option>
                        ))}
                    </select>

                    {/* Year */}
                    <select 
                        id="birthYear"
                        className="flex-1 h-10 rounded-lg bg-[#1A1A1A] text-sm text-white px-3 focus:outline-none appearance-none cursor-pointer border-transparent focus:bg-[#202020] hover:bg-[#202020] transition-colors"
                        defaultValue={new Date().getFullYear()}
                    >
                         {Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year} className="bg-[#1A1A1A] text-white">{year}</option>
                        ))}
                    </select>
                </div>
                {/* Hidden input for Zod validation - Mocked value to pass validation for UI demo */}
                <input type="hidden" {...register('birthDate')} defaultValue="2000-01-01" /> 
                {errors.birthDate && <span className="text-xs text-red-500 ml-1">{errors.birthDate.message}</span>}
            </div>

            {/* Gender: Radio Style Cards */}
            <div className="space-y-2">
                <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold ml-1">Género</label>
                <div className="flex gap-3">
                    <label className="flex-1 flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg border border-transparent hover:border-white/10 cursor-pointer transition-all group">
                        <span className="text-sm text-white group-hover:text-blue-400 transition-colors">Mujer</span>
                        <input type="radio" value="female" {...register('gender')} className="text-blue-500 focus:ring-0 bg-[#3A3B3C] border-none" />
                    </label>
                     <label className="flex-1 flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg border border-transparent hover:border-white/10 cursor-pointer transition-all group">
                        <span className="text-sm text-white group-hover:text-blue-400 transition-colors">Hombre</span>
                        <input type="radio" value="male" {...register('gender')} className="text-blue-500 focus:ring-0 bg-[#3A3B3C] border-none" />
                    </label>
                     <label className="flex-1 flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg border border-transparent hover:border-white/10 cursor-pointer transition-all group">
                        <span className="text-sm text-white group-hover:text-blue-400 transition-colors">Personalizado</span>
                        <input type="radio" value="other" {...register('gender')} className="text-blue-500 focus:ring-0 bg-[#3A3B3C] border-none" />
                    </label>
                </div>
                {errors.gender && <span className="text-xs text-red-500 ml-1">{errors.gender.message}</span>}
                
                {/* Custom Gender Fields (Conditional) */}
                {watch('gender') === 'other' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 pt-1 overflow-hidden"
                  >
                     <select 
                       className="w-full h-10 rounded-lg bg-[#1A1A1A] text-sm text-white px-3 focus:outline-none appearance-none cursor-pointer border-transparent focus:bg-[#202020]"
                     >
                        <option value="" disabled selected className="bg-[#1A1A1A]">Selecciona tu pronombre</option>
                        <option value="she" className="bg-[#1A1A1A]">Ella: "Deséale un feliz cumpleaños a ella"</option>
                        <option value="he" className="bg-[#1A1A1A]">Él: "Deséale un feliz cumpleaños a él"</option>
                        <option value="they" className="bg-[#1A1A1A]">Neutro: "Deséale un feliz cumpleaños"</option>
                     </select>
                     
                     <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 ml-1">Tu género (opcional)</label>
                        <Input 
                            type="text" 
                            placeholder="Género (opcional)"
                            className="bg-[#1A1A1A] border-transparent text-white placeholder:text-neutral-600 focus:bg-[#202020] focus:ring-1 focus:ring-white/10 h-10 rounded-lg text-sm"
                            hideLabel
                        />
                     </div>
                  </motion.div>
                )}
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
