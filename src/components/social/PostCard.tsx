import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe } from 'lucide-react';
import { useState } from 'react';
import { ReactionSelector } from '../ui/ReactionSelector';
import { REACTION_METADATA } from '../ui/Reactions';
import { motion, AnimatePresence } from 'framer-motion';

interface PostProps {
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export function PostCard({ author, content, image, timestamp, stats }: PostProps) {
  const [selectedReaction, setSelectedReaction] = useState<typeof REACTION_METADATA[0] | null>(null);
  const [isHoveringLike, setIsHoveringLike] = useState(false);
  let hoverTimeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    hoverTimeout = setTimeout(() => {
        setIsHoveringLike(true);
    }, 400); // 400ms delay to prevent accidental triggering
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setTimeout(() => {
         setIsHoveringLike(false);
    }, 500); // Delay closing to allow moving to dock
  };

  const handleSelectReaction = (reaction: typeof REACTION_METADATA[0]) => {
    if (selectedReaction?.id === reaction.id) {
        setSelectedReaction(null); // Toggle off
    } else {
        setSelectedReaction(reaction);
    }
    setIsHoveringLike(false);
  };

  const toggleDock = () => {
    setIsHoveringLike(!isHoveringLike);
  };

  // Default "Like" state config
  const activeReaction = selectedReaction || {
    name: 'Me gusta',
    color: 'text-neutral-400', // Default text color
    icon: <ThumbsUp className="w-5 h-5" />
  };

  return (
    <article className="bg-[#121212]/80 backdrop-blur-lg rounded-2xl mb-4 shadow-xl border border-white/10 overflow-hidden ring-1 ring-white/5 relative z-0 hover:z-10 transition-all">
      <div className="p-4 pb-2">
        <div className="flex gap-3 mb-2">
            {/* Avatar */}
            <div className="flex-shrink-0 cursor-pointer">
                <img 
                    src={author.avatar} 
                    alt={author.name} 
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
            </div>

            {/* Header Info */}
            <div className="flex-1 min-w-0 flex justify-between items-start">
                <div>
                   <h3 className="text-[15px] font-semibold text-white/90 hover:underline cursor-pointer leading-tight">
                       {author.name}
                   </h3>
                   <div className="flex items-center gap-1.5 text-xs text-[#B0B3B8] mt-0.5">
                       <span className="hover:underline cursor-pointer">{timestamp}</span>
                       <span>·</span>
                       <Globe className="w-3 h-3" />
                   </div>
                </div>
                <button className="text-[#B0B3B8] hover:bg-white/10 p-2 rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Content Body */}
        <p className="text-[15px] text-white/90 leading-normal whitespace-pre-wrap mb-2">{content}</p>
      </div>

      {/* Image Attachment */}
      {image && (
          <div className="w-full bg-black">
              <img src={image} alt="Post content" className="w-full h-auto max-h-[600px] object-cover" />
          </div>
      )}

      {/* Stats Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between text-[#B0B3B8] text-[13px]">
          <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
              </div>
              <span>{stats.likes}</span>
          </div>
          <div className="flex gap-3">
              <span className="hover:underline cursor-pointer">{stats.comments} comentarios</span>
              <span className="hover:underline cursor-pointer">{stats.shares} veces compartido</span>
          </div>
      </div>

      {/* Action Buttons (The Big 3) */}
      <div className="px-3 pb-3 pt-1">
        <div className="border-t border-white/5 flex items-center gap-1 pt-2">
            <div 
                className="relative flex-1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={toggleDock} // Allow tap to toggle dock on mobile
            >
                <AnimatePresence>
                    {isHoveringLike && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: -5, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-full left-0 z-50 pointer-events-auto"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dock
                        >
                            <ReactionSelector onSelect={handleSelectReaction} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <button 
                    // Remove direct onClick here to let parent handle the logic or distinct
                    onClick={(e) => {
                        e.stopPropagation(); // Stop parent toggle
                        if (isHoveringLike) {
                            setIsHoveringLike(false);
                        } else {
                             // If no dock, simple Like toggle
                             handleSelectReaction(REACTION_METADATA[0])
                        }
                    }}
                    className={`w-full flex items-center justify-center gap-2 hover:bg-white/5 font-bold text-[15px] h-11 rounded-xl transition-all duration-200 active:scale-95 ${
                        selectedReaction ? '' : 'text-neutral-400 hover:text-white'
                    }`}
                    style={{ color: selectedReaction?.color }}
                >
                    {selectedReaction ? (
                        <div className="w-5 h-5 relative">
                             {/* Render the actual component from metadata if it exists */}
                             <selectedReaction.Component /> 
                        </div>
                    ) : (
                        <ThumbsUp className="w-5 h-5" />
                    )}
                    <span>{activeReaction.name}</span>
                </button>
            </div>
            <button className="flex-1 flex items-center justify-center gap-2 text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-[14px] h-11 rounded-xl transition-all duration-200 active:scale-95">
                <MessageCircle className="w-5 h-5" />
                <span>Comentar</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-[14px] h-11 rounded-xl transition-all duration-200 active:scale-95">
                <Share2 className="w-5 h-5" />
                <span>Compartir</span>
            </button>
        </div>
      </div>
    </article>
  );
}
