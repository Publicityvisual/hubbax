import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 border-transparent',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
      outline: 'bg-transparent border-white/20 text-foreground hover:bg-white/5 hover:border-white/40',
      ghost: 'bg-transparent text-foreground hover:bg-white/10 border-transparent',
      link: 'text-primary underline-offset-4 hover:underline bg-transparent border-transparent px-0 h-auto'
    };

    const sizes = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-11 px-6 text-sm',
      lg: 'h-14 px-8 text-base'
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: props.disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: props.disabled || isLoading ? 1 : 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
