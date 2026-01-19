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
    <div className="relative w-full py-4">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-0">
        
        {/* User 'Add Story' Card */}
        <div className="relative flex-shrink-0 w-[112px] h-[200px] bg-[#242526] rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:brightness-110 transition-all">
            <div className="h-[65%] w-full overflow-hidden relative">
                 <img 
                    src={MOCK_STORIES[0].image} 
                    alt="My Story" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
            </div>
            <div className="absolute bottom-0 w-full h-[35%] bg-[#242526] flex flex-col items-center pt-4 relative">
                 <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-9 h-9 bg-[#242526] rounded-full flex items-center justify-center p-1">
                     <div className="w-full h-full bg-[#2D88FF] rounded-full flex items-center justify-center">
                        <Plus className="text-white w-5 h-5" />
                     </div>
                 </div>
                 <span className="text-white text-[13px] font-medium mt-1">Crear historia</span>
            </div>
        </div>

        {/* Friends Stories */}
        {MOCK_STORIES.slice(1).map((story) => (
             <motion.div 
                key={story.id}
                whileHover={{ scale: 1.02 }}
                className="relative flex-shrink-0 w-[112px] h-[200px] rounded-xl overflow-hidden cursor-pointer group bg-[#242526]"
             >
                <img 
                    src={story.image} 
                    alt={story.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                
                {/* Avatar Ring */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full p-[3px] bg-[#2D88FF] ring-2 ring-black/20">
                     <img 
                        src={story.avatar} 
                        alt={story.name} 
                        className="w-full h-full rounded-full object-cover border-2 border-[#242526]" 
                     />
                </div>

                <span className="absolute bottom-2 left-3 right-3 text-white text-[13px] font-semibold truncate leading-tight">
                    {story.name}
                </span>
             </motion.div>
        ))}
        
      </div>
    </div>
  );
}
