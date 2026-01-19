import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export function Skeleton({ className, variant = 'rectangular', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-800/50",
        variant === 'circular' && "rounded-full",
        variant === 'rectangular' && "rounded-lg",
        variant === 'text' && "h-4 rounded w-3/4",
        className
      )}
      {...props}
    />
  );
}
