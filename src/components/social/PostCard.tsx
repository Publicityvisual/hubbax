import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe, Heart } from 'lucide-react';
import { useState, useRef } from 'react';
import { ReactionSelector } from '../ui/ReactionSelector';
import { REACTION_METADATA } from '../ui/ReactionMetadata';
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
    }, 400); 
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setTimeout(() => {
         setIsHoveringLike(false);
    }, 500); 
  };

  const handleSelectReaction = (reaction: typeof REACTION_METADATA[0]) => {
    if (selectedReaction?.id === reaction.id) {
        setSelectedReaction(null); 
    } else {
        setSelectedReaction(reaction);
    }
    setIsHoveringLike(false);
  };

  const toggleDock = () => {
    setIsHoveringLike(!isHoveringLike);
  };

  const activeReaction = selectedReaction || {
    name: 'Me gusta',
    color: 'text-[#B0B3B8] group-hover:text-[#B0B3B8]', // Standard grey
    icon: <ThumbsUp className="w-5 h-5" />
  };

  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const lastTap = useRef<number>(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
        if (!selectedReaction) {
            handleSelectReaction(REACTION_METADATA[1]); 
        }
        setShowHeartOverlay(true);
        setTimeout(() => setShowHeartOverlay(false), 800);
    }
    lastTap.current = now;
  };

  return (
    <article className="bg-[#242526] rounded-xl mb-4 shadow-sm overflow-hidden font-sans">
      
      {/* Social Header */}
      <div className="px-4 pt-3 pb-2 flex items-start justify-between">
        <div className="flex gap-2.5">
            <div className="cursor-pointer">
                <img 
                    src={author.avatar} 
                    alt={author.name} 
                    className="w-10 h-10 rounded-full object-cover border border-white/5"
                />
            </div>
            <div>
                <h3 className="text-[15px] font-semibold text-[#E4E6EB] hover:underline cursor-pointer leading-5">
                    {author.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[13px] text-[#B0B3B8] leading-4 mt-0.5">
                    <span className="hover:underline cursor-pointer">{timestamp}</span>
                    <span className="text-[10px]">•</span>
                    <Globe className="w-3 h-3" />
                </div>
            </div>
        </div>
        <button className="text-[#B0B3B8] hover:bg-white/10 p-2 rounded-full transition-colors -mr-2">
            <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Text */}
      <div className="px-4 pb-3">
         <p className="text-[15px] text-[#E4E6EB] leading-normal whitespace-pre-wrap">{content}</p>
      </div>

      {/* Media Attachment */}
      {image && (
          <div 
            className="w-full bg-black relative select-none cursor-pointer"
            onClick={handleDoubleTap}
          >
              <img src={image} alt="Post content" className="w-full h-auto object-cover max-h-[700px]" />
              
              <AnimatePresence>
                {showHeartOverlay && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                         <Heart className="w-24 h-24 text-white fill-white drop-shadow-lg" />
                    </motion.div>
                )}
              </AnimatePresence>
          </div>
      )}

      {/* Social Stats */}
      <div className="mx-4 py-2.5 flex items-center justify-between border-b border-[#3E4042] text-[#B0B3B8] text-[15px]">
          <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
              {selectedReaction ? (
                  <div className="flex items-center gap-1">
                      <div className="w-[18px] h-[18px]">
                          <selectedReaction.Component />
                      </div>
                      <span style={{ color: selectedReaction.color }}>{selectedReaction.name}</span>
                  </div>
              ) : (
                  <div className="flex items-center gap-1.5">
                      <div className="w-[18px] h-[18px] bg-[#1877F2] rounded-full flex items-center justify-center">
                          <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                      <span>{stats.likes}</span>
                  </div>
              )}
          </div>
          <div className="flex gap-4 text-[14px]">
              <span className="hover:underline cursor-pointer">{stats.comments} comentarios</span>
              <span className="hover:underline cursor-pointer">{stats.shares} veces compartido</span>
          </div>
      </div>

      {/* Social Actions Buttons */}
      <div className="px-2 py-1">
        <div className="flex items-center gap-1">
            {/* Like Button & Dock */}
            <div 
                className="relative flex-1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={toggleDock}
            >
                <AnimatePresence>
                    {isHoveringLike && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: -10, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full left-0 z-50 w-full flex pl-4 pointer-events-auto"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <ReactionSelector onSelect={handleSelectReaction} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <button 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        if (isHoveringLike) {
                            setIsHoveringLike(false);
                        } else {
                            handleSelectReaction(REACTION_METADATA[0])
                        }
                    }}
                    className={`w-full group flex items-center justify-center gap-2 hover:bg-[#3A3B3C] font-semibold text-[15px] h-9 rounded-md transition-colors ${
                        selectedReaction ? '' : 'text-[#B0B3B8]'
                    }`}
                    style={{ color: selectedReaction?.color }}
                >
                    {selectedReaction ? (
                        <div className="w-[20px] h-[20px] relative">
                            <selectedReaction.Component /> 
                        </div>
                    ) : (
                        <ThumbsUp className="w-5 h-5" />
                    )}
                    <span>{activeReaction.name}</span>
                </button>
            </div>

            <button className="flex-1 flex items-center justify-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C] font-semibold text-[15px] h-9 rounded-md transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>Comentar</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 text-[#B0B3B8] hover:bg-[#3A3B3C] font-semibold text-[15px] h-9 rounded-md transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Compartir</span>
            </button>
        </div>
      </div>
    </article>
  );
}
