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
      <div className="absolute inset-0 bg-[#000]/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-[432px] bg-[#242526]/90 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] max-h-[90vh] overflow-y-auto custom-scrollbar overflow-hidden group"
      >
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay" />
        
        {/* Top Shine */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-5 border-b border-white/5">
          <div>
            <h2 className="text-[32px] font-black text-white leading-tight tracking-tight">Registrarte</h2>
            <p className="text-[15px] text-neutral-400 font-medium">Es rápido, fácil y libre.</p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 relative z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                    <Input 
                        type="text" 
                        placeholder="Nombre"
                        error={errors.firstName?.message}
                        {...register('firstName')}
                        className="h-11 bg-[#0a0a0a]/50 border-white/5 text-white placeholder:text-neutral-500 focus:border-[#d93025]/50 focus:ring-4 focus:ring-[#d93025]/5 rounded-xl px-4 text-[15px] transition-all font-medium backdrop-blur-sm"
                        hideLabel
                    />
                </div>
                <div className="relative group">
                    <Input 
                        type="text" 
                        placeholder="Apellido"
                        error={errors.lastName?.message}
                        {...register('lastName')}
                        className="h-11 bg-[#0a0a0a]/50 border-white/5 text-white placeholder:text-neutral-500 focus:border-[#d93025]/50 focus:ring-4 focus:ring-[#d93025]/5 rounded-xl px-4 text-[15px] transition-all font-medium backdrop-blur-sm"
                        hideLabel
                    />
                </div>
            </div>

            {/* Email/Pass */}
            <div className="relative group">
                <Input 
                    type="text" 
                    placeholder="Número de celular o correo electrónico"
                    error={errors.email?.message}
                    {...register('email')}
                    className="h-11 bg-[#0a0a0a]/50 border-white/5 text-white placeholder:text-neutral-500 focus:border-[#d93025]/50 focus:ring-4 focus:ring-[#d93025]/5 rounded-xl px-4 text-[15px] transition-all font-medium backdrop-blur-sm"
                    hideLabel
                />
            </div>
            
            <div className="relative group">
                <Input 
                    type="password" 
                    placeholder="Contraseña nueva"
                    error={errors.password?.message}
                    {...register('password')}
                    className="h-11 bg-[#0a0a0a]/50 border-white/5 text-white placeholder:text-neutral-500 focus:border-[#d93025]/50 focus:ring-4 focus:ring-[#d93025]/5 rounded-xl px-4 text-[15px] transition-all font-medium backdrop-blur-sm"
                    hideLabel
                />
            </div>

            {/* Birthdate Section */}
            <div className="pt-2">
                <div className="flex items-center gap-1.5 mb-2">
                   <label className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider">Fecha de nacimiento</label>
                   <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="relative group">
                        <select 
                            value={birthDay}
                            onChange={(e) => setBirthDay(e.target.value)}
                            className="w-full h-10 bg-[#0a0a0a]/50 border border-white/5 rounded-xl px-3 text-[15px] text-white appearance-none cursor-pointer focus:border-[#d93025]/50 outline-none transition-all hover:bg-white/5"
                        >
                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => <option key={d} value={d} className="bg-[#242526]">{d}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-neutral-500 pointer-events-none group-hover:text-white transition-colors" />
                    </div>
                    <div className="relative group">
                        <select 
                            value={birthMonth}
                            onChange={(e) => setBirthMonth(e.target.value)}
                            className="w-full h-10 bg-[#0a0a0a]/50 border border-white/5 rounded-xl px-3 text-[15px] text-white appearance-none cursor-pointer focus:border-[#d93025]/50 outline-none transition-all hover:bg-white/5"
                        >
                            {['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'].map(m => <option key={m} value={m} className="bg-[#242526]">{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-neutral-500 pointer-events-none group-hover:text-white transition-colors" />
                    </div>
                    <div className="relative group">
                        <select 
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                            className="w-full h-10 bg-[#0a0a0a]/50 border border-white/5 rounded-xl px-3 text-[15px] text-white appearance-none cursor-pointer focus:border-[#d93025]/50 outline-none transition-all hover:bg-white/5"
                        >
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(y => <option key={y} value={y} className="bg-[#242526]">{y}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-neutral-500 pointer-events-none group-hover:text-white transition-colors" />
                    </div>
                </div>
                {errors.birthDate && <p className="text-[#d93025] text-[11px] mt-1 font-medium">{errors.birthDate.message}</p>}
            </div>

            {/* Gender Section */}
            <div className="pt-2">
                <div className="flex items-center gap-1.5 mb-2">
                   <label className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider">Género</label>
                   <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <label className={`flex items-center justify-between px-3 h-10 bg-[#0a0a0a]/50 border ${selectedGender === 'female' ? 'border-[#d93025] bg-[#d93025]/5' : 'border-white/5'} rounded-xl cursor-pointer transition-all hover:bg-white/5`}>
                        <span className="text-[15px] text-white font-medium">Mujer</span>
                        <input type="radio" value="female" {...register('gender')} className="accent-[#d93025]" />
                    </label>
                    <label className={`flex items-center justify-between px-3 h-10 bg-[#0a0a0a]/50 border ${selectedGender === 'male' ? 'border-[#d93025] bg-[#d93025]/5' : 'border-white/5'} rounded-xl cursor-pointer transition-all hover:bg-white/5`}>
                        <span className="text-[15px] text-white font-medium">Hombre</span>
                        <input type="radio" value="male" {...register('gender')} className="accent-[#d93025]" />
                    </label>
                    <label className={`flex items-center justify-between px-3 h-10 bg-[#0a0a0a]/50 border ${selectedGender === 'other' ? 'border-[#d93025] bg-[#d93025]/5' : 'border-white/5'} rounded-xl cursor-pointer transition-all hover:bg-white/5`}>
                        <span className="text-[15px] text-white font-medium">Otro</span>
                        <input type="radio" value="other" {...register('gender')} className="accent-[#d93025]" />
                    </label>
                </div>
                {errors.gender && <p className="text-[#d93025] text-[11px] mt-1 font-medium">{errors.gender.message}</p>}

                {/* Conditional Gender Info */}
                <AnimatePresence>
                  {selectedGender === 'other' && (
                    <motion.div 
                      key="other-gender"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-3 overflow-hidden"
                    >
                      <div className="relative group">
                        <select 
                          {...register('pronoun')}
                          className="w-full h-10 bg-[#0a0a0a]/50 border border-white/5 rounded-xl px-3 text-[15px] text-white appearance-none cursor-pointer focus:border-[#d93025]/50 outline-none transition-all hover:bg-white/5"
                        >
                          <option value="" disabled className="bg-[#242526]">Selecciona tu pronombre</option>
                          <option value="she" className="bg-[#242526]">Ella: "Felicítala por su cumpleaños"</option>
                          <option value="he" className="bg-[#242526]">Él: "Felicítalo por su cumpleaños"</option>
                          <option value="they" className="bg-[#242526]">Ellos: "Felicítalos por su cumpleaños"</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-neutral-500 pointer-events-none group-hover:text-white transition-colors" />
                      </div>
                      <Input 
                        type="text"
                        placeholder="Género (opcional)"
                        {...register('customGender')}
                        className="h-10 bg-[#0a0a0a]/50 border-white/5 text-white placeholder:text-neutral-500 px-3 rounded-xl text-base focus:border-[#d93025]/50"
                        hideLabel
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            {/* Disclaimer */}
            <div className="text-[11px] text-neutral-500 leading-tight space-y-2 pt-2">
                <p>
                    Las personas que usan nuestro servicio pueden haber subido tu información de contacto a Hubbax. <a href="#" className="text-[#d93025] hover:underline font-bold">Obtén más información</a>.
                </p>
                <p>
                    Al hacer clic en "Registrarte", aceptas nuestras <a href="#" className="text-[#d93025] hover:underline font-bold">Condiciones</a>, la <a href="#" className="text-[#d93025] hover:underline font-bold">Política de privacidad</a> y la <a href="#" className="text-[#d93025] hover:underline font-bold">Política de cookies</a>.
                </p>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center justify-center pt-2 pb-4 gap-6">
                <Button 
                    type="submit" 
                    isLoading={isLoading}
                    className="w-[200px] h-10 bg-gradient-to-r from-[#00a400] to-[#008a00] hover:to-[#007000] text-white text-[17px] font-bold rounded-xl shadow-lg transition-all hover:scale-[1.05] active:scale-[0.98] shadow-green-900/20"
                >
                    Registrarte
                </Button>

                {/* Legitimacy Badge */}
                <div className="flex items-center gap-2 opacity-40">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-[10px] text-white font-black uppercase tracking-widest">Hubbax Secure</span>
                </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
