import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_STORIES = [
  {
    id: 'user-story',
    isUser: true,
    name: 'Crear historia',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', // User avatar
  },
  {
    id: '1',
    name: 'Sarah Connor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '2',
    name: 'John Wick',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '3',
    name: 'Elena Fisher',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '4',
    name: 'Nathan Drake',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

export function Stories() {
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-0 sm:px-0">
        
        {/* User 'Add Story' Card */}
        <div className="relative flex-shrink-0 w-[110px] h-[200px] bg-[#242526] rounded-xl overflow-hidden cursor-pointer group shadow-lg transition-transform hover:scale-[1.02] border border-white/5">
            <div className="h-[75%] w-full overflow-hidden">
                 <img 
                    src={MOCK_STORIES[0].image} 
                    alt="My Story" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                 />
            </div>
            <div className="absolute bottom-0 w-full h-[25%] bg-[#242526] flex flex-col items-center justify-center pt-3 relative">
                 <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#242526] rounded-full flex items-center justify-center p-1">
                     <div className="w-full h-full bg-[#d93025] rounded-full flex items-center justify-center shadow-lg shadow-[#d93025]/30">
                        <Plus className="text-white w-6 h-6" />
                     </div>
                 </div>
                 <span className="text-white text-xs font-medium pb-2">Crear historia</span>
            </div>
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
        </div>

        {/* Friends Stories */}
        {MOCK_STORIES.slice(1).map((story) => (
             <motion.div 
                key={story.id}
                whileHover={{ scale: 1.02 }}
                className="relative flex-shrink-0 w-[110px] h-[200px] rounded-xl overflow-hidden cursor-pointer group border border-white/5"
             >
                <img 
                    src={story.image} 
                    alt={story.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                
                {/* Avatar Ring */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#d93025] to-purple-600 ring-2 ring-black/50">
                     <img 
                        src={story.avatar} 
                        alt={story.name} 
                        className="w-full h-full rounded-full object-cover border-2 border-black" 
                     />
                </div>

                <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium truncate shadow-black drop-shadow-md">
                    {story.name}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
             </motion.div>
        ))}
        
      </div>
    </div>
  );
}
