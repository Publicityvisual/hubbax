import { ChevronRight } from 'lucide-react';

interface Friend {
  name: string;
  avatar: string;
  mutualFriends?: number;
}

interface FriendWidgetProps {
  friends: Friend[];
  totalCount: string;
  onSeeAll?: () => void;
}

export function FriendWidget({ friends, totalCount, onSeeAll }: FriendWidgetProps) {
  return (
    <div className="bg-[#242526]/60 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-lg relative group overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-600/15 transition-colors duration-700" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
            <h3 className="text-xl font-black text-white tracking-tight">Amigos</h3>
            <span className="text-neutral-400 text-[14px] font-medium">{totalCount} amigos</span>
        </div>
        <button 
          onClick={onSeeAll}
          className="text-[#d93025] text-[14px] font-bold hover:text-white transition-colors flex items-center gap-1 group/btn mt-1"
        >
          Ver todos
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="mt-2 relative z-10">
        {friends.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-3 gap-y-4">
            {friends.slice(0, 9).map((friend, i) => (
              <div key={i} className="flex flex-col gap-2 cursor-pointer group/friend">
                <div className="aspect-square rounded-xl overflow-hidden border border-white/5 relative bg-[#3A3B3C]/50 shadow-sm">
                  <img 
                    src={friend.avatar} 
                    className="w-full h-full object-cover group-hover/friend:scale-110 transition-transform duration-500 ease-out" 
                    alt={friend.name}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/friend:bg-black/10 transition-colors" />
                </div>
                <p className="text-white text-[13px] font-semibold leading-tight group-hover/friend:text-[#d93025] transition-colors truncate">
                  {friend.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500 bg-[#3A3B3C]/30 rounded-xl border border-white/5 border-dashed">
            <p className="text-sm font-medium">No hay amigos para mostrar</p>
          </div>
        )}
      </div>
    </div>
  );
}
