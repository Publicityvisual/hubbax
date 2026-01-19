import { Image, Smile, Video } from 'lucide-react';
import { CURRENT_USER } from '../../data/masterUsers';

interface CreatePostProps {
  onPost?: (content: string) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  // Logic for a real input would go here, currently using as a simplified trigger
  // Silencing unused onPost if needed, but better to keep it for future expansion
  console.log('CreatePost initialized with onPost:', !!onPost);

  return (
    <div className="bg-[#242526] rounded-xl shadow-sm mb-4 p-3 md:p-4">
      {/* Upper Part: Avatar + Input */}
      <div className="flex gap-2 mb-3">
        <div className="flex-shrink-0">
            <img 
                src={CURRENT_USER.avatarImage} 
                alt={CURRENT_USER.fullName} 
                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:brightness-90 transition-all"
            />
        </div>
        <div className="flex-1 relative">
            <button 
                onClick={() => {}} // This usually opens a modal in real FB
                className="w-full bg-[#3A3B3C] text-[#B0B3B8] hover:bg-[#4E4F50] text-left px-4 py-2.5 rounded-full transition-colors font-normal flex items-center h-10"
            >
                ¿Qué estás pensando, {CURRENT_USER.fullName.split(' ')[0]}?
            </button>
            
            {/* Real Hidden Input or Dynamic expansion would go here */}
            {/* For this demo, let's keep it simple or allow typing if you want */}
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#3E4042] mx-1 mb-2"></div>

      {/* Bottom Actions */}
      <div className="flex items-center">
          <button className="flex-1 flex items-center justify-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C] font-semibold text-[14px] h-10 rounded-lg transition-colors group">
              <Video className="w-6 h-6 text-[#F02849]" />
              <span className="hidden sm:inline">Video en vivo</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C] font-semibold text-[14px] h-10 rounded-lg transition-colors group">
              <Image className="w-6 h-6 text-[#45BD62]" />
              <span className="hidden sm:inline">Foto/video</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C] font-semibold text-[14px] h-10 rounded-lg transition-colors group">
              <Smile className="w-6 h-6 text-[#F7B928]" />
              <span className="hidden sm:inline">Sentimiento/actividad</span>
          </button>
      </div>
    </div>
  );
}
