import { useState } from 'react';
import { Image, Smile, Video, Send } from 'lucide-react';
import { CURRENT_USER } from '../../data/masterUsers';

interface CreatePostProps {
  onPost?: (content: string) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim()) return;
    
    onPost?.(content);
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="px-3 py-3 md:px-4 md:py-4 bg-[#121212]/80 backdrop-blur-lg md:rounded-2xl border-b md:border border-white/10 mb-2 md:mb-4 ring-0 md:ring-1 ring-white/5">
      <div className="flex gap-3 mb-4 border-b border-white/5 pb-4">
        <div className="flex-shrink-0">
             <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#d93025] to-[#ff6b5b] p-[2px] shadow-lg shadow-[#d93025]/20">
                <img 
                    src={CURRENT_USER.avatarImage} 
                    alt={CURRENT_USER.fullName} 
                    className="w-full h-full rounded-full object-cover border-2 border-[#121212]"
                />
            </div>
        </div>
        <div className="flex-1 relative">
            <input 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#0A0A0A]/60 text-white/90 placeholder:text-neutral-500 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#d93025]/30 focus:bg-[#0A0A0A] hover:bg-[#0A0A0A]/80 transition-all cursor-pointer text-base border border-white/5 pr-12" 
                placeholder={`¿Qué estás pensando, ${CURRENT_USER.fullName.split(' ')[0]}?`} 
            />
            {content.trim().length > 0 && (
              <button 
                onClick={() => handleSubmit()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-[#d93025] hover:bg-[#b01e15] text-white transition-all shadow-lg shadow-red-500/20"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            )}
        </div>
      </div>

      <div className="flex items-center gap-1">
          <button className="flex-1 flex items-center justify-center gap-2 text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-[14px] h-11 rounded-xl transition-all duration-200 active:scale-95">
              <Video className="w-5 h-5 text-[#F02849]" />
              <span className="hidden sm:inline">Video en vivo</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-[14px] h-11 rounded-xl transition-all duration-200 active:scale-95">
              <Image className="w-5 h-5 text-[#45BD62]" />
              <span className="hidden sm:inline">Foto/video</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-[14px] h-11 rounded-xl transition-all duration-200 active:scale-95">
              <Smile className="w-5 h-5 text-[#F7B928]" />
              <span className="hidden sm:inline">Sentimiento</span>
          </button>
      </div>
    </div>
  );
}
