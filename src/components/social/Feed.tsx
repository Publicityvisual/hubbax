import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';

const MOCK_POSTS = [
  {
    id: 1,
    author: {
      name: "Elena Rodriguez",
      username: "elenadev",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    content: "¡Acabo de lanzar mi nuevo portafolio construido con React y Tailwind! 🚀 Ha sido un viaje increíble aprendiendo sobre animaciones con Framer Motion. ¿Qué opinan? \n\n#React #WebDev #Frontend",
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
      name: "Marcus Chen",
      username: "mchen_design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    content: "La simplicidad es la máxima sofisticación. Trabajando en un nuevo sistema de diseño para Hubbax. ✨",
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
      name: "Sarah Miller",
      username: "sarahm_ai",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
    content: "¿Alguien más emocionada por el futuro de la IA generativa? Las posibilidades son infinitas. 🤖✨",
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
  return (
    <div className="w-full max-w-2xl mx-auto border-r border-white/5 min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 p-4 cursor-pointer hidden lg:block">
        <h2 className="text-xl font-bold">Inicio</h2>
      </div>
      
      <CreatePost />
      
      <div className="divide-y divide-white/5">
        {MOCK_POSTS.map(post => (
            <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
