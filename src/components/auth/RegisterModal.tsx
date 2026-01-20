import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { X, ChevronDown, HelpCircle } from 'lucide-react';
import { registerSchema, RegisterFormData } from '../../lib/schemas';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Month mapping for the Date constructor
const monthMap: Record<string, number> = {
  'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
  'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
};

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      gender: 'female',
    }
  });

  const selectedGender = watch('gender');
  const [birthDay, setBirthDay] = useState('1');
  const [birthMonth, setBirthMonth] = useState('ene');
  const [birthYear, setBirthYear] = useState(new Date().getFullYear().toString());
  const [daysInMonth, setDaysInMonth] = useState(31);

  // Sync Birthdate to the hidden field for validation
  useEffect(() => {
    const month = monthMap[birthMonth] || 0;
    const year = parseInt(birthYear);
    
    // Calculate days in month
    const d = new Date(year, month + 1, 0).getDate();
    setDaysInMonth(d);
    
    // If current selected day > d, reset to d
    if (parseInt(birthDay) > d) {
      setBirthDay(d.toString());
    }

    const date = new Date(year, month, parseInt(birthDay));
    
    // Safety check for valid date
    if (!isNaN(date.getTime())) {
      setValue('birthDate', date.toISOString().split('T')[0], { shouldValidate: true });
    }
  }, [birthDay, birthMonth, birthYear, setValue]);

  const onSubmit = async () => {
    setIsLoading(true);
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
                        <select 
                            value={birthDay}
                            onChange={(e) => setBirthDay(e.target.value)}
                            className="w-full h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md px-2 text-[15px] dark:text-white appearance-none cursor-pointer focus:border-[#d93025] outline-none transition-colors shadow-sm"
                        >
                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-[#606770] pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select 
                            value={birthMonth}
                            onChange={(e) => setBirthMonth(e.target.value)}
                            className="w-full h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md px-2 text-[15px] dark:text-white appearance-none cursor-pointer"
                        >
                            {['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'].map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-[#606770] pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select 
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                            className="w-full h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md px-2 text-[15px] dark:text-white appearance-none cursor-pointer"
                        >
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-[#606770] pointer-events-none" />
                    </div>
                </div>
                {errors.birthDate && <p className="text-[#d93025] text-[11px] mt-1">{errors.birthDate.message}</p>}
            </div>

            {/* Gender Section */}
            <div className="pt-1">
                <div className="flex items-center gap-1 mb-1">
                   <label className="text-[12px] text-[#606770] dark:text-[#B0B3B8]">Género</label>
                   <HelpCircle className="w-3 h-3 text-[#606770] dark:text-[#B0B3B8] cursor-help" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <label className={`flex items-center justify-between px-3 h-9 bg-white dark:bg-[#242526] border ${selectedGender === 'female' ? 'border-[#d93025]' : 'border-[#ccd0d5] dark:border-white/10'} rounded-md cursor-pointer transition-colors`}>
                        <span className="text-[15px] dark:text-white">Mujer</span>
                        <input type="radio" value="female" {...register('gender')} className="accent-[#d93025]" />
                    </label>
                    <label className={`flex items-center justify-between px-3 h-9 bg-white dark:bg-[#242526] border ${selectedGender === 'male' ? 'border-[#d93025]' : 'border-[#ccd0d5] dark:border-white/10'} rounded-md cursor-pointer transition-colors`}>
                        <span className="text-[15px] dark:text-white">Hombre</span>
                        <input type="radio" value="male" {...register('gender')} className="accent-[#d93025]" />
                    </label>
                    <label className={`flex items-center justify-between px-3 h-9 bg-white dark:bg-[#242526] border ${selectedGender === 'other' ? 'border-[#d93025]' : 'border-[#ccd0d5] dark:border-white/10'} rounded-md cursor-pointer transition-colors`}>
                        <span className="text-[15px] dark:text-white">Otro</span>
                        <input type="radio" value="other" {...register('gender')} className="accent-[#d93025]" />
                    </label>
                </div>
                {errors.gender && <p className="text-[#d93025] text-[11px] mt-1">{errors.gender.message}</p>}

                {/* Conditional Gender Info (Facebook Standard) */}
                <AnimatePresence>
                  {selectedGender === 'other' && (
                    <motion.div 
                      key="other-gender"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-3 overflow-hidden"
                    >
                      <div className="relative">
                        <select 
                          {...register('pronoun')}
                          className="w-full h-9 bg-white dark:bg-[#242526] border border-[#ccd0d5] dark:border-white/10 rounded-md px-2 text-[15px] dark:text-white appearance-none cursor-pointer focus:border-[#d93025] outline-none"
                        >
                          <option value="" disabled>Selecciona tu pronombre</option>
                          <option value="she">Ella: "Felicítala por su cumpleaños"</option>
                          <option value="he">Él: "Felicítalo por su cumpleaños"</option>
                          <option value="they">Ellos: "Felicítalos por su cumpleaños"</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-[#606770] pointer-events-none" />
                      </div>
                      {errors.pronoun && <p className="text-[#d93025] text-[11px] mt-1">{errors.pronoun.message}</p>}
                      <p className="text-[11px] text-[#777] dark:text-[#B0B3B8]">Tu pronombre es visible para todos.</p>
                      <Input 
                        type="text"
                        placeholder="Género (opcional)"
                        {...register('customGender')}
                        className="h-9 bg-[#f5f6f7] dark:bg-[#1c1e21] border-[#dddfe2] dark:border-white/10 text-black dark:text-white placeholder:text-[#8d949e] px-3 rounded-lg text-base"
                        hideLabel
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            {/* Disclaimer */}
            <div className="text-[11px] text-[#777] dark:text-[#B0B3B8] leading-tight space-y-2 pt-2">
                <p>
                    Las personas que usan nuestro servicio pueden haber subido tu información de contacto a Hubbax. <a href="/help/contact-upload" className="text-[#385898] dark:text-[#4599FF] hover:underline">Obtén más información</a>.
                </p>
                <p>
                    Al hacer clic en "Registrarte", aceptas nuestras <a href="/legal/terms" className="text-[#385898] dark:text-[#4599FF] hover:underline">Condiciones</a>, la <a href="/legal/privacy" className="text-[#385898] dark:text-[#4599FF] hover:underline">Política de privacidad</a> y la <a href="/legal/cookies" className="text-[#385898] dark:text-[#4599FF] hover:underline">Política de cookies</a>. Es posible que te enviemos notificaciones por SMS, que puedes desactivar cuando quieras.
                </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2 pb-4">
                <Button 
                    type="submit" 
                    isLoading={isLoading}
                    className="w-[194px] h-9 bg-[#00a400] hover:bg-[#008a00] text-white text-[18px] font-bold rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    animate={Object.keys(errors).length > 0 ? { x: [0, -10, 10, -10, 10, 0] } : undefined}
                    transition={{ duration: 0.5 }}
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
