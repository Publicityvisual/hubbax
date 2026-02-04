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
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
        setIsHoveringLike(true);
    }, 400); 
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
         setIsHoveringLike(false);
    }, 500); 
  };

  const handleSelectReaction = (reaction: typeof REACTION_METADATA[0]) => {
    if (selectedReaction?.id === reaction.id) {
        setSelectedReaction(null); 
    } else {
        setSelectedReaction(reaction);
        // Play sound if not unselecting
        const audio = new Audio('/assets/sounds/notification.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed', e));
    }
    setIsHoveringLike(false);
  };

  const toggleDock = () => {
    setIsHoveringLike(!isHoveringLike);
  };

  const activeReaction = selectedReaction || {
    name: 'Me gusta',
    color: 'text-white/60 group-hover:text-white/80',
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
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-md rounded-2xl mb-6 border border-white/5 overflow-hidden font-sans group hover:border-white/10 transition-colors duration-500"
    >
      
      {/* Social Header */}
      <div className="px-5 pt-4 pb-3 flex items-start justify-between">
        <div className="flex gap-3">
            <div className="cursor-pointer relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#d93025] to-purple-500 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                    src={author.avatar} 
                    alt={author.name} 
                    className="w-11 h-11 rounded-full object-cover border-2 border-transparent relative z-10"
                />
            </div>
            <div>
                <h3 className="text-[15px] font-semibold text-white/95 hover:text-white cursor-pointer leading-5 tracking-wide">
                    {author.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[12px] text-white/50 leading-4 mt-1">
                    <span className="hover:underline cursor-pointer hover:text-white/70 transition-colors">{timestamp}</span>
                    <span className="text-[10px]">•</span>
                    <Globe className="w-3 h-3" />
                </div>
            </div>
        </div>
        <button className="text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all -mr-2">
            <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Text */}
      <div className="px-5 pb-4">
         <p className="text-[15px] text-white/90 leading-relaxed whitespace-pre-wrap font-light tracking-wide">{content}</p>
      </div>

      {/* Media Attachment */}
      {image && (
          <div 
            className="w-full bg-black relative select-none cursor-pointer group/image"
            onClick={handleDoubleTap}
          >
              <img src={image} alt="Post content" className="w-full h-auto object-cover max-h-[700px] opacity-90 group-hover/image:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent opacity-60" />

              <AnimatePresence>
                {showHeartOverlay && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                         <Heart className="w-28 h-28 text-[#d93025] fill-[#d93025] drop-shadow-[0_0_30px_rgba(217,48,37,0.5)]" />
                    </motion.div>
                )}
              </AnimatePresence>
          </div>
      )}

      {/* Social Stats */}
      <div className="mx-5 py-3 flex items-center justify-between border-b border-white/5 text-white/50 text-[13px]">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors">
              {selectedReaction ? (
                  <div className="flex items-center gap-1.5">
                      <div className="w-[18px] h-[18px]">
                          <selectedReaction.Component />
                      </div>
                      <span style={{ color: selectedReaction.color }} className="font-medium">{selectedReaction.name}</span>
                  </div>
              ) : (
                  <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 flex items-center justify-center bg-blue-500/20 rounded-full">
                          <ThumbsUp className="w-3 h-3 text-blue-400 fill-blue-400" />
                      </div>
                      <span className="text-[13px]">{stats.likes}</span>
                  </div>
              )}
          </div>
          <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">{stats.comments} comentarios</span>
              <span className="hover:underline cursor-pointer">{stats.shares} compartidos</span>
          </div>
      </div>

      {/* Social Actions Buttons */}
      <div className="px-3 py-1.5">
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
                            className="absolute bottom-full left-0 z-50 w-full flex pl-4 pointer-events-auto pb-2"
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
                    className={`w-full group flex items-center justify-center gap-2 hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all duration-300 relative overflow-hidden ${
                        selectedReaction ? '' : 'text-white/60 hover:text-white/90'
                    }`}
                    style={{ color: selectedReaction?.color }}
                >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    
                    <div className="relative z-10 flex items-center gap-2">
                        {selectedReaction ? (
                            <div className="w-5 h-5 relative">
                                {selectedReaction.imagePath ? (
                                    <img src={selectedReaction.imagePath} alt={selectedReaction.name} className="w-full h-full object-contain" />
                                ) : (
                                    <selectedReaction.Component /> 
                                )}
                            </div>
                        ) : (
                            <ThumbsUp className="w-5 h-5 transition-transform group-hover:scale-110" />
                        )}
                        <span>{activeReaction.name}</span>
                    </div>
                </button>
            </div>

            <button className="flex-1 group flex items-center justify-center gap-2 text-white/60 hover:text-white/90 hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="relative z-10 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Comentar</span>
                </div>
            </button>
            
            <button className="flex-1 group flex items-center justify-center gap-2 text-white/60 hover:text-white/90 hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="relative z-10 flex items-center gap-2">
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Compartir</span>
                </div>
            </button>
        </div>
      </div>
    </motion.article>
  );
}
