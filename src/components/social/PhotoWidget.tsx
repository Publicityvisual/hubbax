import { ChevronRight } from 'lucide-react';

interface PhotoWidgetProps {
  photos: string[];
  onSeeAll?: () => void;
}

export function PhotoWidget({ photos, onSeeAll }: PhotoWidgetProps) {
  return (
    <div className="bg-[#242526]/60 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-lg relative group overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-600/15 transition-colors duration-700" />

      <div className="flex justify-between items-center mb-5 relative z-10">
        <h3 className="text-xl font-black text-white tracking-tight">Fotos</h3>
        <button 
          onClick={onSeeAll}
          className="text-[#d93025] text-[14px] font-bold hover:text-white transition-colors flex items-center gap-1 group/btn"
        >
          Ver todas
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden relative z-10">
        {photos.slice(0, 9).map((url, i) => (
          <div key={i} className="aspect-square relative group/img cursor-pointer overflow-hidden rounded-lg bg-[#3A3B3C]/50">
             <img 
               src={url} 
               className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out" 
               alt={`Photo ${i}`}
             />
             <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300" />
             
             {/* Shine effect on hover */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
          </div>
        ))}
      </div>
    </div>
  );
}
