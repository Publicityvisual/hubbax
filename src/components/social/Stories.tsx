import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useFirebase } from "../../contexts/FirebaseContext";

interface StoryUser {
  username: string;
  fullName: string;
  avatarImage: string;
  storyImage?: string;
  coverImage?: string;
}

const STORY_USERS: StoryUser[] = [
  {
    username: "hubbax_ai",
    fullName: "Hubbax AI",
    avatarImage: "https://images.unsplash.com/photo-1675252269966-261944510b65?w=500&auto=format&fit=crop&q=80",
    storyImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60",
  },
  {
    username: "sarah_c",
    fullName: "Sarah Connor",
    avatarImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    storyImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60",
  },
  {
    username: "john_w",
    fullName: "John Wick",
    avatarImage:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
    storyImage:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60",
  },
  {
    username: "elena_f",
    fullName: "Elena Fisher",
    avatarImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    storyImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60",
  },
];

export function Stories() {
  const { profile } = useFirebase();
  const currentUser = profile || {
    fullName: 'Admin',
    avatarImage: 'https://ui-avatars.com/api/?name=Admin',
    username: 'admin'
  };

  return (
    <div className="relative w-full py-4">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-0">
        {/* User 'Add Story' Card */}
        <div className="relative flex-shrink-0 w-[112px] h-[200px] bg-[#242526] rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all border border-white/5">
          <div className="h-full w-full overflow-hidden relative">
            <img
              src={currentUser.avatarImage || currentUser.avatar}
              alt="My Story"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-0 w-full p-2 flex flex-col items-center pb-3">
            <div className="w-9 h-9 bg-[#d93025] rounded-full flex items-center justify-center p-1 shadow-lg shadow-[#d93025]/30 mb-1 group-hover:scale-110 transition-transform">
              <Plus className="text-white w-5 h-5 font-bold" />
            </div>
            <span className="text-white text-[13px] font-bold mt-1 text-center leading-tight">
              Crear historia
            </span>
          </div>
        </div>

        {/* Friends Stories */}
        {STORY_USERS.map((user, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative flex-shrink-0 w-[112px] h-[200px] rounded-xl overflow-hidden cursor-pointer group bg-[#0a0a0a]/40 border border-white/5 shadow-md backdrop-blur-md"
          >
            <img
              src={user.storyImage || user.coverImage}
              alt={user.fullName}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

            {/* Avatar Ring - Premium Gradient */}
            <div className="absolute top-3 left-3 w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#d93025] to-purple-600 ring-2 ring-black/20 shadow-lg">
              <img
                src={user.avatarImage}
                alt={user.fullName}
                className="w-full h-full rounded-full object-cover border-2 border-[#18191a]"
              />
            </div>

            <span className="absolute bottom-3 left-3 right-3 text-white text-[13px] font-bold truncate leading-tight drop-shadow-md">
              {user.fullName}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
