import { useState, useEffect } from 'react';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { Stories } from './Stories';
import { CURRENT_USER } from '../../data/masterUsers';

const INITIAL_POSTS = [
  {
    id: 1,
    author: {
      name: "Elena Rodríguez",
      username: "elenadev",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    content: "¡Acabo de lanzar mi nuevo portafolio construido con React y Tailwind! 🚀 Ha sido un viaje increíble aprendiendo sobre animaciones. ¿Qué opinan? \n\n#React #DesarrolloWeb #Frontend",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
    timestamp: "2h",
    stats: {
      likes: 245,
      comments: 42,
      shares: 12
    }
  },
  {
    id: 2,
    author: {
      name: "Marcos Chen",
      username: "mchen_design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    content: "La simplicidad es la máxima sofisticación. Trabajando en el nuevo sistema de diseño para Hubbax. ✨",
    timestamp: "5h",
    stats: {
      likes: 890,
      comments: 120,
      shares: 56
    }
  },
  {
    id: 3,
    author: {
      name: "Sara Miller",
      username: "saram_ai",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
    content: "¿Alguien más emocionado por el futuro de la IA generativa aquí en México? Las posibilidades son infinitas. 🤖✨",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    timestamp: "12h",
    stats: {
      likes: 1542,
      comments: 340,
      shares: 210
    }
  }
];

export function Feed() {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const handleCreatePost = (content: string) => {
    const newPost = {
      id: Date.now(),
      author: {
        name: CURRENT_USER.fullName,
        username: CURRENT_USER.username,
        avatar: CURRENT_USER.avatarImage,
      },
      content: content,
      timestamp: "Justo ahora",
      stats: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    };
    setPosts([newPost, ...posts]);
  };

  const [isLoading, setIsLoading] = useState(true);

  // Simulate smart loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
        <div className="w-full max-w-[680px] mx-auto pb-8 space-y-6">
             {/* Stories Skeleton */}
             <div className="flex gap-2 overflow-hidden py-4">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex-shrink-0 w-[110px] h-[200px] bg-[#18191a] rounded-xl animate-pulse border border-white/5" />
                ))}
             </div>
             
             {/* Create Post Skeleton */}
             <div className="h-32 bg-[#18191a] rounded-2xl animate-pulse border border-white/5" />

             {/* Posts Skeletons */}
             {[1,2].map(i => (
                 <div key={i} className="bg-[#18191a] rounded-2xl h-[400px] animate-pulse border border-white/5" />
             ))}
        </div>
    );
  }

  return (
    <div className="w-full max-w-[680px] mx-auto pb-8">
      
      <Stories />
      <CreatePost onPost={handleCreatePost} />
      
      <div className="space-y-4">
        {posts.map(post => (
            <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
