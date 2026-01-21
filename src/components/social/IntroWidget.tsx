import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

interface IntroWidgetProps {
  headline: string;
  location: string;
  joinDate: string;
  onEdit?: () => void;
}

export function IntroWidget({ headline, location, joinDate, onEdit }: IntroWidgetProps) {
  return (
    <div className="bg-[#18191a] rounded-xl p-4 border border-white/5 shadow-sm">
      <h3 className="text-xl font-bold text-white mb-4">Detalles</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-neutral-300">
          <Briefcase className="w-5 h-5 text-neutral-500 flex-shrink-0" />
          <span className="text-[15px] leading-tight">Trabaja como <strong className="text-white font-semibold">{headline}</strong> en <strong className="text-white font-semibold">Hubbax Inc.</strong></span>
        </div>
        <div className="flex items-center gap-3 text-neutral-300">
          <MapPin className="w-5 h-5 text-neutral-500 flex-shrink-0" />
          <span className="text-[15px]">Vive en <strong className="text-white font-semibold">{location}</strong></span>
        </div>
        <div className="flex items-center gap-3 text-neutral-300">
          <Calendar className="w-5 h-5 text-neutral-500 flex-shrink-0" />
          <span className="text-[15px]">Se unió en <span className="text-white/80">{joinDate}</span></span>
        </div>
      </div>
      <Button 
        onClick={onEdit}
        className="w-full mt-6 bg-[#242526] hover:bg-[#3a3b3c] text-white border border-white/5 font-semibold py-2 px-4 rounded-lg transition-all"
      >
        Editar detalles
      </Button>
    </div>
  );
}
