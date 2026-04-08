import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export interface PostProps {
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  content: string;
  image?: string;
  timestamp: any;
  likes: string[];
  comments: any[];
  shares: string[]; 
  isHubbaxVerified?: boolean;
}

export function PostCard({
  authorName,
  authorUsername,
  authorAvatar,
  content,
  image,
  timestamp,
  likes = [],
  comments = [],
  shares = [],
  isHubbaxVerified = false
}: PostProps) {
  
  const finalAuthorAvatar = authorAvatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName || 'User')}&background=random&size=200`;

  const humanTimestamp = timestamp?.toDate ?
    timestamp.toDate().toLocaleString() :
    (typeof timestamp === 'string' ? timestamp : 'Ahora mismo');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-md rounded-2xl mb-6 border border-white/5 overflow-hidden font-sans group hover:border-white/10 transition-colors duration-500"
    >
      <div className="px-5 pt-4 pb-3 flex items-start justify-between">
        <div className="flex gap-3">
            <div className="cursor-pointer relative">
                <img
                    src={finalAuthorAvatar}
                    alt={authorName}
                    className="w-11 h-11 rounded-full object-cover relative z-10"
                />
            </div>
            <div className="flex flex-col">
                <h3 className="text-[15px] font-semibold text-white leading-5 tracking-wide">
                    {authorName}
                </h3>
                <div className="flex items-center gap-1.5 text-[12px] text-gray-300 leading-4 mt-1">
                    <span className="text-gray-400">{authorUsername}</span>
                    <span className="text-[10px]">•</span>
                    <span className="text-gray-400">{humanTimestamp}</span>
                    {isHubbaxVerified && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <Globe className="w-3 h-3 text-gray-400" />
                </div>
            </div>
        </div>
        <button className="text-gray-400 hover:text-white p-2 rounded-full transition-all">
            <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 pb-4">
         <p className="text-[15px] text-white leading-relaxed whitespace-pre-wrap font-light tracking-wide">{content}</p>
      </div>

      {image && (
          <div className="w-full bg-black relative select-none cursor-pointer">
              <img src={image} alt="Post content" className="w-full h-auto object-cover max-h-[700px] opacity-90" />
          </div>
      )}

      <div className="mx-5 py-3 flex items-center justify-between border-b border-gray-700 text-gray-400 text-[13px]">
          <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 flex items-center justify-center bg-blue-500/20 rounded-full">
                  <ThumbsUp className="w-3 h-3 text-blue-400 fill-blue-400" />
              </div>
              <span>{likes.length}</span>
          </div>
          <div className="flex gap-4">
              <span>{comments.length} comentarios</span>
              <span>{shares.length} compartidos</span>
          </div>
      </div>

      <div className="px-3 py-1.5 flex items-center gap-1">
          <button className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all">
              <ThumbsUp className="w-5 h-5" />
              <span>Me gusta</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all">
              <MessageCircle className="w-5 h-5" />
              <span>Comentar</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all">
              <Share2 className="w-5 h-5" />
              <span>Compartir</span>
          </button>
      </div>
    </motion.article>
  );
}
