import { Image, Smile, Video } from 'lucide-react';

export function CreatePost() {
  return (
    <div className="px-4 py-4 bg-[#121212]/80 backdrop-blur-lg rounded-2xl border border-white/10 mb-4 ring-1 ring-white/5">
      <div className="flex gap-3 mb-4 border-b border-white/5 pb-4">
        <div className="flex-shrink-0">
             <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#d93025] to-[#ff6b5b] p-[2px] shadow-lg shadow-[#d93025]/20">
                <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" 
                    alt="Current User" 
                    className="w-full h-full rounded-full object-cover border-2 border-[#121212]"
                />
            </div>
        </div>
        <div className="flex-1">
            <input 
                className="w-full bg-[#0A0A0A]/60 text-white/90 placeholder:text-neutral-500 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#d93025]/30 focus:bg-[#0A0A0A] hover:bg-[#0A0A0A]/80 transition-all cursor-pointer text-base border border-white/5" 
                placeholder="¿Qué estás pensando, Maria?" 
            />
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
