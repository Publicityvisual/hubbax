import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

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
        <div className={cn(
            "relative flex items-center w-full rounded-xl border bg-black/40 backdrop-blur-sm transition-all duration-300",
            error ? "border-red-500" : isFocused ? "border-primary ring-1 ring-primary/20" : "border-white/10 hover:border-white/20",
            className
          )}
        >
          {icon && (
            <div className={cn(
              "pl-4 transition-colors duration-300",
              isFocused ? "text-primary" : "text-white/40"
            )}>
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            className={cn(
              "flex w-full bg-transparent px-4 py-3 pt-5 pb-2 text-sm text-white placeholder-transparent focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
              icon ? "pl-2" : ""
            )}
            placeholder={label}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          <label
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-all duration-300 pointer-events-none",
              (isFocused || hasValue || props.value) ? "top-3 text-[10px] text-white/50" : "text-white/40",
              icon ? (isFocused || hasValue || props.value ? "left-4 translate-x-0" : "left-10") : ""
            )}
          >
            {label}
          </label>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1 text-xs text-red-500 font-medium ml-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
