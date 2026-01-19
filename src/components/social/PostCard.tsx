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
    color: 'text-zinc-400 group-hover:text-zinc-300', 
    icon: <ThumbsUp className="w-[18px] h-[18px]" />
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
    <article className="group/card relative bg-[#0a0a0a]/60 backdrop-blur-md rounded-3xl mb-6 border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="relative cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-0 group-hover/card:opacity-20 blur-md transition-opacity" />
                <img 
                    src={author.avatar} 
                    alt={author.name} 
                    className="w-10 h-10 rounded-full object-cover border border-white/10 relative z-10"
                />
            </div>
            <div>
                <h3 className="text-[15px] font-semibold text-zinc-100 hover:text-white cursor-pointer transition-colors">
                    {author.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <span className="hover:underline cursor-pointer transition-colors hover:text-zinc-400">{timestamp}</span>
                    <span className="text-zinc-700">·</span>
                    <Globe className="w-3 h-3" />
                </div>
            </div>
        </div>
        <button className="text-zinc-500 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all">
            <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
         <p className="text-[15px] text-zinc-200 leading-relaxed dark:text-zinc-300 font-normal whitespace-pre-wrap">{content}</p>
      </div>

      {/* Media */}
      {image && (
          <div 
            className="w-full relative select-none cursor-pointer bg-black/50 overflow-hidden"
            onClick={handleDoubleTap}
          >
              <img src={image} alt="Post content" className="w-full h-auto max-h-[700px] object-cover transition-transform duration-700 hover:scale-[1.01]" />
              
              <AnimatePresence>
                {showHeartOverlay && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                        animate={{ opacity: 1, scale: 1.2, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                    >
                         <Heart className="w-28 h-28 text-[#ef4444] fill-[#ef4444] drop-shadow-[0_10px_30px_rgba(239,68,68,0.5)]" />
                    </motion.div>
                )}
              </AnimatePresence>
          </div>
      )}

      {/* Stats & Actions Footer */}
      <div className="bg-gradient-to-b from-transparent to-black/20">
          <div className="px-4 py-3 flex items-center justify-between text-zinc-500 text-[13px]">
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-300 transition-colors">
                  {selectedReaction ? (
                      <div className="flex items-center -space-x-1">
                          <div className="w-4 h-4 rounded-full overflow-hidden border border-[#0a0a0a]">
                              <selectedReaction.Component />
                          </div>
                      </div>
                  ) : (
                      <div className="w-4 h-4 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
                        <ThumbsUp className="w-2.5 h-2.5 text-blue-400 fill-blue-400" />
                      </div>
                  )}
                  <span className="font-medium">{stats.likes + (selectedReaction ? 1 : 0)}</span>
              </div>
              <div className="flex gap-4">
                  <span className="hover:text-zinc-300 cursor-pointer transition-colors">{stats.comments} comentarios</span>
                  <span className="hover:text-zinc-300 cursor-pointer transition-colors">{stats.shares} veces compartido</span>
              </div>
          </div>

          <div className="px-2 pb-2">
            <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/5">
                {/* Like Button Wrapper */}
                <div 
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={toggleDock}
                >
                    <AnimatePresence>
                        {isHoveringLike && (
                            <motion.div 
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: -8, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute bottom-full left-0 z-50 w-full flex justify-center pointer-events-auto pl-2"
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
                        className={`w-full group flex items-center justify-center gap-2 hover:bg-white/5 font-semibold text-[14px] h-10 rounded-lg transition-all duration-200 active:scale-95 ${
                            selectedReaction ? '' : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                        style={{ color: selectedReaction?.color }}
                    >
                        {selectedReaction ? (
                            <div className="w-[18px] h-[18px] relative">
                                <selectedReaction.Component /> 
                            </div>
                        ) : (
                            <ThumbsUp className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
                        )}
                        <span>{activeReaction.name}</span>
                    </button>
                </div>

                <button className="flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-200 hover:bg-white/5 font-semibold text-[14px] h-10 rounded-lg transition-all duration-200 active:scale-95 group">
                    <MessageCircle className="w-[18px] h-[18px] group-hover: -rotate-6 transition-transform" />
                    <span>Comentar</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-200 hover:bg-white/5 font-semibold text-[14px] h-10 rounded-lg transition-all duration-200 active:scale-95 group">
                    <Share2 className="w-[18px] h-[18px] group-hover:rotate-12 transition-transform" />
                    <span>Compartir</span>
                </button>
            </div>
          </div>
      </div>
    </article>
  );
}
