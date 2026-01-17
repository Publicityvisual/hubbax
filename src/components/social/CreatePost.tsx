import { Image, Smile, Video } from 'lucide-react';
import { Button } from '../ui/Button';

export function CreatePost() {
  return (
    <div className="px-4 py-3 bg-[#242526] rounded-xl border border-white/5 mb-4">
      <div className="flex gap-3 mb-3 border-b border-white/10 pb-3">
        <div className="flex-shrink-0">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-500 p-[2px]">
                <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" 
                    alt="Current User" 
                    className="w-full h-full rounded-full object-cover border-2 border-[#242526]"
                />
            </div>
        </div>
        <div className="flex-1">
            <input 
                className="w-full bg-[#3A3B3C] text-white/90 placeholder:text-[#B0B3B8] rounded-full px-4 py-2.5 focus:outline-none hover:bg-[#4E4F50] transition-colors cursor-pointer text-[15px]" // Facebook Pill Style
                placeholder="¿Qué estás pensando, Maria?" 
            />
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
          <Button variant="ghost" className="flex-1 flex gap-2 text-[#B0B3B8] hover:bg-white/5 font-medium text-[14px]">
              <Video className="w-6 h-6 text-[#F02849]" /> {/* Live Video Red */}
              Video en vivo
          </Button>
          <Button variant="ghost" className="flex-1 flex gap-2 text-[#B0B3B8] hover:bg-white/5 font-medium text-[14px]">
              <Image className="w-6 h-6 text-[#45BD62]" /> {/* Photo/Video Green */}
              Foto/video
          </Button>
          <Button variant="ghost" className="flex-1 flex gap-2 text-[#B0B3B8] hover:bg-white/5 font-medium text-[14px] hidden sm:flex">
              <Smile className="w-6 h-6 text-[#F7B928]" /> {/* Feeling/Activity Yellow */}
              Sentimiento/actividad
          </Button>
      </div>
    </div>
  );
}
