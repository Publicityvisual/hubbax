import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  hideLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, endIcon, hideLabel, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="relative w-full group">
        {!hideLabel && label && <label className="text-sm font-medium text-white/80 ml-1 block mb-2">{label}</label>}
        <div className={cn(
            "relative flex items-center w-full rounded-full border bg-white/5 backdrop-blur-xl transition-all duration-300 overflow-hidden",
            error ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : 
            isFocused ? "border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] bg-white/10" : 
            "border-white/10 hover:border-white/20 hover:bg-white/10",
            className
          )}
        >
          {icon && (
            <div className={cn(
              "pl-5 transition-colors duration-300",
              isFocused ? "text-violet-400" : "text-white/40"
            )}>
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "flex w-full bg-transparent px-5 py-4 text-sm text-white placeholder-white/40 focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
              icon ? "pl-3" : ""
            )}
            placeholder={hideLabel ? props.placeholder : ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {!hideLabel && (
             <label
                className={cn(
                "absolute left-5 top-1/2 -translate-y-1/2 text-sm transition-all duration-300 pointer-events-none",
                (isFocused || hasValue || props.value) ? "top-3.5 text-[10px] text-violet-300 font-medium tracking-wide opacity-0" : "text-white/40 opacity-0",
                icon ? (isFocused || hasValue || props.value ? "left-5 translate-x-0" : "left-12") : ""
                )}
            >
                {label}
            </label>
          )}

          {(isPassword || endIcon) && (
            <div className="pr-5 text-white/40 hover:text-white transition-colors cursor-pointer">
               {isPassword ? (
                 <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                 >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                 </button>
               ) : endIcon}
            </div>
          )}
        </div>
        
        {/* Error Message with float in animation */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center mt-1.5 ml-2"
            >
                <div className="w-1 h-1 rounded-full bg-red-500 mr-2" />
                <span className="text-xs text-red-400 font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
