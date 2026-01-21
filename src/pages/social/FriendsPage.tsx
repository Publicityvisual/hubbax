import { useRef } from 'react';
import { AppLayout } from '../../layouts/AppLayout';
import { Search, Users, UserPlus, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

// GSAP
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function FriendsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.friend-card', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const categories = ['Todos los amigos', 'Sugerencias', 'Solicitudes'];
  const mockFriends: { id: number; name: string; avatar: string; mutualFriends: number }[] = []; // No mock friends by default

  return (
    <AppLayout>
      <div ref={containerRef} className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 group">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users className="w-8 h-8 text-[#d93025]" />
              Amigos
            </h1>
            <p className="text-neutral-400 mt-1">Gestiona tus conexiones y descubre personas nuevas.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input 
              placeholder="Buscar amigos..." 
              className="pl-10 h-11 bg-[#18191a] border-white/5 focus:border-[#d93025]/50 focus:ring-0 rounded-xl transition-all"
              hideLabel 
            />
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="flex gap-2 p-1 bg-[#18191a] rounded-xl border border-white/5 w-fit mb-8">
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                i === 0 ? 'bg-[#d93025] text-white shadow-lg shadow-[#d93025]/20' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Friends Grid */}
        {mockFriends.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockFriends.map((friend) => (
              <div 
                key={friend.id} 
                className="friend-card bg-[#18191a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="h-24 bg-gradient-to-br from-[#d93025]/20 to-purple-600/10" />
                <div className="p-4 pt-0 -mt-12 text-center flex flex-col items-center">
                  <div className="relative">
                    <img 
                      src={friend.avatar} 
                      className="w-24 h-24 rounded-2xl border-4 border-[#18191a] object-cover ring-1 ring-white/10 group-hover:scale-105 transition-transform" 
                      alt={friend.name} 
                    />
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-[#18191a] rounded-full" />
                  </div>
                  
                  <h3 className="mt-3 font-bold text-white text-lg group-hover:text-[#d93025] transition-colors">{friend.name}</h3>
                  <p className="text-neutral-400 text-sm mb-4">{friend.mutualFriends} amigos en común</p>
                  
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button className="h-9 bg-[#242526] hover:bg-[#303031] text-white border border-white/5 flex items-center justify-center gap-2 text-sm font-bold transition-all">
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </Button>
                    <Button className="h-9 bg-[#d93025]/10 hover:bg-[#d93025]/20 text-[#d93025] border border-[#d93025]/20 flex items-center justify-center gap-2 text-sm font-bold transition-all">
                      <UserPlus className="w-4 h-4" />
                      Amigos
                    </Button>
                  </div>
                  
                  <button className="mt-3 w-full h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-neutral-500 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-[#18191a] rounded-full flex items-center justify-center border border-white/5 mb-6 shadow-xl">
              <Users className="w-10 h-10 text-neutral-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Sin amigos aún</h3>
            <p className="text-neutral-400 max-w-sm mx-auto mb-8">
              Aún no has agregado a nadie a tu lista de amigos. Busca personas que conozcas para conectar con ellas.
            </p>
            <Button className="bg-[#d93025] hover:bg-[#b01e15] text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-[#d93025]/20 flex items-center gap-2 transition-all">
              <Search className="w-5 h-5" />
              Buscar personas
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
