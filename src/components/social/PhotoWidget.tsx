interface PhotoWidgetProps {
  photos: string[];
  onSeeAll?: () => void;
}

export function PhotoWidget({ photos, onSeeAll }: PhotoWidgetProps) {
  return (
    <div className="bg-[#18191a] rounded-xl p-4 border border-white/5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Fotos</h3>
        <button 
          onClick={onSeeAll}
          className="text-[#d93025] text-[15px] font-medium hover:underline transition-all"
        >
          Ver todas
        </button>
      </div>
      <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden border border-white/5 bg-[#242526]/30">
        {photos.slice(0, 9).map((url, i) => (
          <div key={i} className="aspect-square relative group cursor-pointer overflow-hidden">
             <img 
               src={url} 
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
               alt={`Photo ${i}`}
             />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
