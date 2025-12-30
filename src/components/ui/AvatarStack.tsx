import { cn } from "../../lib/utils";

interface AvatarStackProps {
  images: string[];
  count?: number;
  className?: string;
}

export function AvatarStack({ images, count = 100, className }: AvatarStackProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex -space-x-3">
        {images.map((src, index) => (
          <div 
            key={index}
            className="w-10 h-10 rounded-full border-2 border-background ring-2 ring-white/10 overflow-hidden relative z-10 hover:z-20 hover:scale-110 transition-all duration-300"
          >
            <img 
                src={src} 
                alt={`User ${index + 1}`} 
                className="w-full h-full object-cover" 
            />
          </div>
        ))}
      </div>
      {count > 0 && (
         <div className="flex flex-col ml-4">
            <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-white tracking-tight">+{count.toLocaleString()}</span>
            </div>
            <span className="text-xs text-white/50 font-medium">Active users joined</span>
         </div>
      )}
    </div>
  );
}
