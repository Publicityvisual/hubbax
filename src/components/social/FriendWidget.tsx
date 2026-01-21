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
    <div className="bg-[#18191a] rounded-xl p-4 border border-white/5 shadow-sm">
      <div className="flex justify-between items-start mb-1">
        <div>
            <h3 className="text-xl font-bold text-white">Amigos</h3>
            <span className="text-[#B0B3B8] text-[15px]">{totalCount} amigos</span>
        </div>
        <button 
          onClick={onSeeAll}
          className="text-[#d93025] text-[15px] font-medium hover:underline transition-all mt-1"
        >
          Ver todos
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 mt-4">
        {friends.slice(0, 9).map((friend, i) => (
          <div key={i} className="flex flex-col gap-1.5 cursor-pointer group">
            <div className="aspect-square rounded-lg overflow-hidden border border-white/5 relative">
              <img 
                src={friend.avatar} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={friend.name}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <p className="text-white text-xs font-semibold leading-tight group-hover:underline truncate">
              {friend.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
