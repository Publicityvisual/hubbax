import { Image, Smile, Video } from 'lucide-react';
import { currentUser } from '../../data/masterUsers';

export function CreatePost({ currentUser: propsUser }: { currentUser?: any }) {
  // Use the imported master user if no props provided
  const user = propsUser || currentUser;
  // Logic for a real input would go here, currently using as a simplified trigger

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/5 mb-6 p-4 relative overflow-hidden group/card transform transition-all duration-300 hover:border-white/10">
      
      {/* Upper Part: Avatar + Input */}
      <div className="flex gap-4 mb-4 items-center">
        <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d93025] to-purple-500 rounded-full blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            <img 
                src={user.avatarImage} 
                alt={user.fullName} 
                className="w-11 h-11 rounded-full object-cover cursor-pointer hover:scale-105 transition-all relative z-10 border-2 border-transparent"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black z-20"></div>
        </div>
        <div className="flex-1 relative">
            <button 
                onClick={() => {}} 
                className="w-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 text-left px-5 py-3 rounded-full transition-all duration-200 font-light flex items-center h-11 border border-white/5 hover:border-white/20 backdrop-blur-sm"
            >
                ¿Qué estás pensando, <span className="text-white/90 font-medium ml-1">{user.fullName.split(' ')[0]}</span>?
            </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4 mb-3"></div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-1 gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F02849]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Video className="w-5 h-5 text-[#F02849] drop-shadow-md group-hover:scale-110 transition-transform relative z-10" />
              <span className="hidden sm:inline relative z-10">Video en vivo</span>
          </button>
          
          <button className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#45BD62]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image className="w-5 h-5 text-[#45BD62] drop-shadow-md group-hover:scale-110 transition-transform relative z-10" />
              <span className="hidden sm:inline relative z-10">Foto/video</span>
          </button>
          
          <button className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7B928]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Smile className="w-5 h-5 text-[#F7B928] drop-shadow-md group-hover:scale-110 transition-transform relative z-10" />
              <span className="hidden sm:inline relative z-10">Sentimiento</span>
          </button>
      </div>
    </div>
  );
}
