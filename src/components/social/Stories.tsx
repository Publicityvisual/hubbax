import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { CURRENT_USER } from '../../data/masterUsers';

const MOCK_STORIES = [
  {
    id: 'user-story',
    isUser: true,
    name: 'Crear historia',
    image: CURRENT_USER.avatarImage, 
  },
  {
    id: '1',
    name: 'Sarah Connor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: '2',
    name: 'John Wick',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150',
  },
  {
    id: '3',
    name: 'Elena Fisher',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
  },
  {
    id: '4',
    name: 'Nathan Drake',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
];

export function Stories() {
  return (
    <div className="relative w-full py-6">
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar px-0">
        
        {/* User 'Add Story' Card */}
        <motion.div 
            whileHover={{ y: -5 }}
            className="relative flex-shrink-0 w-[120px] h-[210px] bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer group border border-white/5 hover:border-blue-500/50 transition-colors"
        >
            <div className="h-[70%] w-full overflow-hidden relative">
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                 <img 
                    src={MOCK_STORIES[0].image} 
                    alt="My Story" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 desaturate-[0.2] group-hover:desaturate-0" 
                 />
            </div>
            <div className="absolute bottom-0 w-full h-[30%] bg-zinc-900 flex flex-col items-center pt-5 relative">
                 <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[34px] h-[34px] bg-zinc-900 rounded-full flex items-center justify-center p-1">
                     <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center">
                        <Plus className="text-white w-5 h-5" />
                     </div>
                 </div>
                 <span className="text-zinc-200 text-[13px] font-medium">Crear historia</span>
            </div>
        </motion.div>

        {/* Friends Stories */}
        {MOCK_STORIES.slice(1).map((story) => (
             <motion.div 
                key={story.id}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative flex-shrink-0 w-[120px] h-[210px] rounded-2xl overflow-hidden cursor-pointer group border border-white/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all"
             >
                <img 
                    src={story.image} 
                    alt={story.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 group-hover:to-black/60 transition-colors" />
                
                {/* Avatar Ring */}
                <div className="absolute top-3 left-3 w-[42px] h-[42px] rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
                     <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-black">
                        <img 
                            src={story.avatar} 
                            alt={story.name} 
                            className="w-full h-full object-cover" 
                        />
                     </div>
                </div>

                <span className="absolute bottom-3 left-3 right-3 text-white text-[13px] font-medium truncate drop-shadow-md">
                    {story.name}
                </span>
             </motion.div>
        ))}
        
      </div>
    </div>
  );
}
