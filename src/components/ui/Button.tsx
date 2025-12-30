import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    // Base styles + Variant styles
    const variants = {
      primary: 'bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] border-transparent',
      secondary: 'bg-white/10 text-white hover:bg-white/20 border-transparent backdrop-blur-md',
      outline: 'bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40',
      ghost: 'bg-transparent text-white hover:bg-white/10 border-transparent',
      link: 'text-primary underline-offset-4 hover:underline bg-transparent border-transparent px-0 h-auto',
      gradient: 'bg-gradient-to-r from-violet-600 to-primary text-white shadow-lg shadow-violet-500/25 border-transparent relative overflow-hidden group',
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs rounded-full',
      md: 'h-12 px-6 text-sm rounded-full',
      lg: 'h-14 px-8 text-base rounded-full',
      icon: 'h-10 w-10 p-2 rounded-full',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: props.disabled || isLoading ? 1 : 1.05 }}
        whileTap={{ scale: props.disabled || isLoading ? 1 : 0.95 }}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {/* Shimmer effect for gradient variant */}
        {variant === 'gradient' && (
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0" />
        )}
        
        <div className="relative z-10 flex items-center justify-center">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </div>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
