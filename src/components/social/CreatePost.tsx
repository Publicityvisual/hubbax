import { Image, Smile, Video } from 'lucide-react';
import { CURRENT_USER } from '../../data/masterUsers';

export function CreatePost() {
  // Logic for a real input would go here, currently using as a simplified trigger

  return (
    <div className="bg-[#242526] rounded-xl shadow-lg border border-white/5 mb-4 p-3 md:p-4 backdrop-blur-sm relative overflow-hidden group/card">
      {/* Upper Part: Avatar + Input */}
      <div className="flex gap-3 mb-3 items-center">
        <div className="flex-shrink-0 relative">
            <img 
                src={CURRENT_USER.avatarImage} 
                alt={CURRENT_USER.fullName} 
                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:brightness-110 transition-all ring-2 ring-transparent group-hover/card:ring-[#2D88FF]/30"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#242526]"></div>
        </div>
        <div className="flex-1 relative">
            <button 
                onClick={() => {}} 
                className="w-full bg-[#3A3B3C]/50 hover:bg-[#4E4F50]/60 text-[#B0B3B8] hover:text-[#E4E6EB] text-left px-4 py-2.5 rounded-full transition-all duration-200 font-normal flex items-center h-10 border border-transparent hover:border-white/5"
            >
                ¿Qué estás pensando, {CURRENT_USER.fullName.split(' ')[0]}?
            </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#3E4042]/50 mx-2 mb-2"></div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-1">
          <button className="flex-1 flex items-center justify-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C]/50 font-semibold text-[14px] h-10 rounded-lg transition-all group hover:scale-[1.02] active:scale-95">
              <Video className="w-6 h-6 text-[#F02849] drop-shadow-md group-hover:animate-pulse" />
              <span className="hidden sm:inline group-hover:text-white transition-colors">Video en vivo</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C]/50 font-semibold text-[14px] h-10 rounded-lg transition-all group hover:scale-[1.02] active:scale-95">
              <Image className="w-6 h-6 text-[#45BD62] drop-shadow-md" />
              <span className="hidden sm:inline group-hover:text-white transition-colors">Foto/video</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C]/50 font-semibold text-[14px] h-10 rounded-lg transition-all group hover:scale-[1.02] active:scale-95">
              <Smile className="w-6 h-6 text-[#F7B928] drop-shadow-md" />
              <span className="hidden sm:inline group-hover:text-white transition-colors">Sentimiento</span>
          </button>
      </div>
    </div>
  );
}
