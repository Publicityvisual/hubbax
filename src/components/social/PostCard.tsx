import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';

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
  return (
    <article className="bg-[#0A0A0A] border-b border-white/5 p-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-violet-500 p-[2px]">
                <img 
                    src={author.avatar} 
                    alt={author.name} 
                    className="w-full h-full rounded-full object-cover border-2 border-black"
                />
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold hover:underline cursor-pointer">{author.name}</span>
                    <span className="text-white/40">@{author.username}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/40 hover:underline cursor-pointer">{timestamp}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white rounded-full">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </div>

            {/* Body */}
            <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>

            {/* Image */}
            {image && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-white/5 relative group">
                    <img src={image} alt="Post content" className="w-full h-auto max-h-[500px] object-cover" />
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-3 max-w-md text-white/40">
                <Button variant="ghost" size="sm" className="group text-xs gap-2 hover:text-pink-500 hover:bg-pink-500/10 px-0 sm:px-2">
                    <div className="p-2 rounded-full group-hover:bg-pink-500/20 transition-colors">
                        <Heart className="w-4 h-4" />
                    </div>
                    <span>{stats.likes}</span>
                </Button>

                <Button variant="ghost" size="sm" className="group text-xs gap-2 hover:text-blue-500 hover:bg-blue-500/10 px-0 sm:px-2">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/20 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                    </div>
                    <span>{stats.comments}</span>
                </Button>

                <Button variant="ghost" size="sm" className="group text-xs gap-2 hover:text-green-500 hover:bg-green-500/10 px-0 sm:px-2">
                    <div className="p-2 rounded-full group-hover:bg-green-500/20 transition-colors">
                        <Share2 className="w-4 h-4" />
                    </div>
                    <span>{stats.shares}</span>
                </Button>
            </div>
        </div>
      </div>
    </article>
  );
}
