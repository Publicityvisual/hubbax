import { Briefcase, MapPin, Calendar, Globe, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

interface IntroWidgetProps {
  headline: string;
  location: string;
  joinDate: string;
  website?: string;
  relationship?: string;
  onEdit?: () => void;
}

export function IntroWidget({ headline, location, joinDate, website, relationship, onEdit }: IntroWidgetProps) {
  return (
    <div className="bg-[#242526]/60 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-lg overflow-hidden relative group">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d93025]/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#d93025]/15 transition-colors duration-700" />
      
      <h3 className="text-xl font-black text-white mb-5 relative z-10 tracking-tight">Detalles</h3>
      
      <div className="space-y-4 relative z-10">
        <div className="flex items-start gap-4 text-neutral-300 group/item">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#d93025]/10 transition-colors">
             <Briefcase className="w-4 h-4 text-neutral-400 group-hover/item:text-[#d93025] transition-colors" />
          </div>
          <div className="pt-1">
             <span className="text-[15px] leading-snug block">Trabaja como <strong className="text-white font-bold">{headline}</strong></span>
             <span className="text-[13px] text-neutral-500 font-medium">Hubbax Inc.</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-neutral-300 group/item">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#d93025]/10 transition-colors">
            <MapPin className="w-4 h-4 text-neutral-400 group-hover/item:text-[#d93025] transition-colors" />
          </div>
          <span className="text-[15px]">Vive en <strong className="text-white font-bold">{location}</strong></span>
        </div>

        <div className="flex items-center gap-4 text-neutral-300 group/item">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#d93025]/10 transition-colors">
            <Calendar className="w-4 h-4 text-neutral-400 group-hover/item:text-[#d93025] transition-colors" />
          </div>
          <span className="text-[15px]">Se unió en <span className="text-white">{joinDate}</span></span>
        </div>

        {website && (
            <div className="flex items-center gap-4 text-neutral-300 group/item">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#d93025]/10 transition-colors">
                    <Globe className="w-4 h-4 text-neutral-400 group-hover/item:text-[#d93025] transition-colors" />
                </div>
                <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#d93025] hover:underline font-medium">{website}</a>
            </div>
        )}

        {relationship && (
            <div className="flex items-center gap-4 text-neutral-300 group/item">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#d93025]/10 transition-colors">
                    <Heart className="w-4 h-4 text-neutral-400 group-hover/item:text-[#d93025] transition-colors" />
                 </div>
                 <span className="text-[15px]">{relationship}</span>
            </div>
        )}

      </div>
      <Button 
        onClick={onEdit}
        className="w-full mt-6 bg-[#3A3B3C]/50 hover:bg-[#4E4F50]/60 text-white border border-white/5 font-bold py-2.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm backdrop-blur-md"
      >
        Editar detalles
      </Button>
    </div>
  );
}
