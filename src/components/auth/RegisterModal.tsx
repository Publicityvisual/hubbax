import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { X, ChevronDown, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 perspective-1000">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#000]/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateX: 10, y: 40 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateX: 10, y: 40 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[480px] bg-[#1a1b1c]/90 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto custom-scrollbar overflow-hidden group/modal"
      >
        {/* Cinematic Lighting Effects */}
        <div className="absolute -top-[200px] -left-[100px] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute -bottom-[200px] -right-[100px] w-[400px] h-[400px] bg-[#d93025]/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none mix-blend-overlay" />
        
        {/* Top Shine */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.5)]" />

        {/* Header */}
        <div className="relative p-6 md:p-8 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d93025]" />
                <span className="text-xs font-bold text-[#d93025] uppercase tracking-widest">Nueva Cuenta</span>
             </div>
             <button onClick={onClose} className="text-neutral-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all hover:scale-110 active:scale-95">
               <X className="w-6 h-6" />
             </button>
          </div>
          <h2 className="text-[32px] md:text-[36px] font-black text-white leading-tight tracking-tight mt-1">
             Únete a <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Hubbax</span>
          </h2>
          <p className="text-[17px] text-neutral-400 font-medium mt-1">La red social del futuro, hoy.</p>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 pt-6 relative z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <Input 
                        type="text" 
                        placeholder="Nombre"
                        error={errors.firstName?.message}
                        {...register('firstName')}
                        className="h-12 bg-[#0a0a0a]/40 border-white/5 text-white placeholder:text-neutral-500 focus:border-[#d93025]/50 focus:ring-4 focus:ring-[#d93025]/10 rounded-xl px-4 text-[16px] transition-all font-medium backdrop-blur-sm hover:bg-[#0a0a0a]/60"
                        hideLabel
                    />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                    <Input 
                        type="text" 
                        placeholder="Apellido"
                        error={errors.lastName?.message}
                        {...register('lastName')}
                        className="h-12 bg-[#0a0a0a]/40 border-white/5 text-white placeholder:text-neutral-500 focus:border-[#d93025]/50 focus:ring-4 focus:ring-[#d93025]/10 rounded-xl px-4 text-[16px] transition-all font-medium backdrop-blur-sm hover:bg-[#0a0a0a]/60"
                        hideLabel
                    />
                </motion.div>
            </div>

            {/* Email/Pass */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Input 
                    type="text" 
                    placeholder="Número de celular o correo electrónico"
                    error={errors.email?.message}
                    {...register('email')}
                    className="h-12 bg-[#0a0a0a]/40 border-white/5 text-white placeholder:text-neutral-500 focus:border-[#d93025]/50 focus:ring-4 focus:ring-[#d93025]/10 rounded-xl px-4 text-[16px] transition-all font-medium backdrop-blur-sm hover:bg-[#0a0a0a]/60"
                    hideLabel
                />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Input 
                    type="password" 
                    placeholder="Contraseña nueva"
                    error={errors.password?.message}
                    {...register('password')}
                    className="h-12 bg-[#0a0a0a]/40 border-white/5 text-white placeholder:text-neutral-500 focus:border-[#d93025]/50 focus:ring-4 focus:ring-[#d93025]/10 rounded-xl px-4 text-[16px] transition-all font-medium backdrop-blur-sm hover:bg-[#0a0a0a]/60"
                    hideLabel
                />
            </motion.div>

            {/* Birthdate Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pt-2">
                <div className="flex items-center gap-1.5 mb-2.5">
                   <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                      Fecha de nacimiento
                   </label>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="relative group">
                        <select 
                            value={birthDay}
                            onChange={(e) => setBirthDay(e.target.value)}
                            className="w-full h-11 bg-[#0a0a0a]/40 border border-white/5 rounded-xl px-3 text-[15px] text-white appearance-none cursor-pointer focus:border-[#d93025]/50 outline-none transition-all hover:bg-white/5 hover:border-white/10"
                        >
                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => <option key={d} value={d} className="bg-[#242526]">{d}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-neutral-500 pointer-events-none group-hover:text-white transition-colors" />
                    </div>
                    <div className="relative group">
                        <select 
                            value={birthMonth}
                            onChange={(e) => setBirthMonth(e.target.value)}
                            className="w-full h-11 bg-[#0a0a0a]/40 border border-white/5 rounded-xl px-3 text-[15px] text-white appearance-none cursor-pointer focus:border-[#d93025]/50 outline-none transition-all hover:bg-white/5 hover:border-white/10"
                        >
                            {['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'].map(m => <option key={m} value={m} className="bg-[#242526]">{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-neutral-500 pointer-events-none group-hover:text-white transition-colors" />
                    </div>
                    <div className="relative group">
                        <select 
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                            className="w-full h-11 bg-[#0a0a0a]/40 border border-white/5 rounded-xl px-3 text-[15px] text-white appearance-none cursor-pointer focus:border-[#d93025]/50 outline-none transition-all hover:bg-white/5 hover:border-white/10"
                        >
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(y => <option key={y} value={y} className="bg-[#242526]">{y}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-neutral-500 pointer-events-none group-hover:text-white transition-colors" />
                    </div>
                </div>
                {errors.birthDate && <p className="text-[#d93025] text-[11px] mt-1 font-medium pl-1">{errors.birthDate.message}</p>}
            </motion.div>

            {/* Gender Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="pt-2">
                <div className="flex items-center gap-1.5 mb-2.5">
                   <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                      Género
                   </label>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {['female', 'male', 'other'].map((g) => (
                        <label 
                            key={g} 
                            className={`flex items-center justify-between px-3 h-11 bg-[#0a0a0a]/40 border ${selectedGender === g ? 'border-[#d93025] bg-[#d93025]/10 shadow-[0_0_15px_rgba(217,48,37,0.15)]' : 'border-white/5'} rounded-xl cursor-pointer transition-all hover:bg-white/5 hover:border-white/10 group`}
                        >
                            <span className={`text-[15px] font-medium transition-colors ${selectedGender === g ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                                {g === 'female' ? 'Mujer' : g === 'male' ? 'Hombre' : 'Otro'}
                            </span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${selectedGender === g ? 'border-[#d93025]' : 'border-neutral-600 group-hover:border-neutral-400'}`}>
                                {selectedGender === g && <div className="w-2 h-2 rounded-full bg-[#d93025]" />}
                            </div>
                            <input type="radio" value={g} {...register('gender')} className="hidden" />
                        </label>
                    ))}
                </div>
                {errors.gender && <p className="text-[#d93025] text-[11px] mt-1 font-medium pl-1">{errors.gender.message}</p>}

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
                          className="w-full h-11 bg-[#0a0a0a]/40 border border-white/5 rounded-xl px-3 text-[15px] text-white appearance-none cursor-pointer focus:border-[#d93025]/50 outline-none transition-all hover:bg-white/5"
                        >
                          <option value="" disabled className="bg-[#242526]">Selecciona tu pronombre</option>
                          <option value="she" className="bg-[#242526]">Ella: "Felicítala por su cumpleaños"</option>
                          <option value="he" className="bg-[#242526]">Él: "Felicítalo por su cumpleaños"</option>
                          <option value="they" className="bg-[#242526]">Ellos: "Felicítalos por su cumpleaños"</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-neutral-500 pointer-events-none group-hover:text-white transition-colors" />
                      </div>
                      <Input 
                        type="text"
                        placeholder="Género (opcional)"
                        {...register('customGender')}
                        className="h-11 bg-[#0a0a0a]/40 border-white/5 text-white placeholder:text-neutral-500 px-4 rounded-xl text-base focus:border-[#d93025]/50 transition-all hover:bg-white/5"
                        hideLabel
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
            </motion.div>

            {/* Disclaimer */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-[11px] text-neutral-500 leading-tight space-y-2 pt-2 border-t border-white/5 mt-2">
                <p>
                    Al hacer clic en "Registrarte", aceptas nuestras <a href="#" className="text-neutral-300 hover:text-[#d93025] hover:underline font-bold transition-colors">Condiciones</a>, la <a href="#" className="text-neutral-300 hover:text-[#d93025] hover:underline font-bold transition-colors">Política de privacidad</a> y la <a href="#" className="text-neutral-300 hover:text-[#d93025] hover:underline font-bold transition-colors">Política de cookies</a>.
                </p>
            </motion.div>

            {/* Submit Button */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex flex-col items-center justify-center pt-2 pb-2 gap-6">
                <Button 
                    type="submit" 
                    isLoading={isLoading}
                    className="w-[240px] h-12 bg-gradient-to-r from-[#00a400] via-[#00c200] to-[#008a00] hover:to-[#007000] text-white text-[18px] font-black tracking-wide rounded-xl shadow-[0_10px_30px_-5px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.05] active:scale-[0.98] relative overflow-hidden group/btn"
                >
                    <span className="relative z-10">REGISTRARTE</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out transform skew-x-12" />
                </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
