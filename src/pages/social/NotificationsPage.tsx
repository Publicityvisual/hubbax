import { useRef } from 'react';
import { AppLayout } from '../../layouts/AppLayout';
import { Bell, Heart, MessageSquare, UserPlus, Star, Filter, CheckCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// GSAP
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function NotificationsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.notif-item', {
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  const notifications = [
    { id: 1, type: 'like', user: 'Elon Musk', content: 'le dio me encanta a tu foto', time: 'hace 2 min', unread: true },
    { id: 2, type: 'comment', user: 'Mark Zuckerberg', content: 'comentó en tu hilo: "Totalmente de acuerdo"', time: 'hace 15 min', unread: true },
    { id: 3, type: 'follow', user: 'Jeff Bezos', content: 'te envió una solicitud de amistad', time: 'hace 1 hora', unread: false },
    { id: 4, type: 'mention', user: 'Bill Gates', content: 'te mencionó en un comentario', time: 'hace 3 horas', unread: false },
    { id: 5, type: 'like', user: 'Satya Nadella', content: 'reaccionó a tu publicación', time: 'hace 5 horas', unread: false },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-[#d93025] fill-[#d93025]" />;
      case 'comment': return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'follow': return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'mention': return <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
      default: return <Bell className="w-5 h-5 text-neutral-500" />;
    }
  };

  return (
    <AppLayout>
      <div ref={containerRef} className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Bell className="w-8 h-8 text-[#d93025]" />
              Notificaciones
            </h1>
            <p className="text-neutral-400 mt-1">Mantente al tanto de toda la actividad en tu red.</p>
          </div>
          
          <Button className="bg-[#242526] hover:bg-[#303031] text-white border border-white/5 h-10 px-4 rounded-xl flex items-center gap-2 font-bold transition-all">
            <CheckCheck className="w-4 h-4" />
            Marcar como leído
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
          {['Todas', 'No leídas', 'Menciones', 'Reacciones'].map((filter, i) => (
             <button key={filter} className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
               i === 0 ? 'bg-[#d93025]/10 text-[#d93025] border border-[#d93025]/20' : 'text-neutral-500 hover:text-white hover:bg-white/5'
             }`}>
               {filter}
             </button>
          ))}
          <button className="px-5 py-2 rounded-xl text-neutral-500 hover:text-white flex items-center gap-2 text-sm font-bold">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="space-y-1">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`notif-item flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer group ${
                notif.unread ? 'bg-[#18191a] border border-white/5 shadow-md' : 'hover:bg-white/5'
              }`}
            >
              <div className="relative">
                <img src={`https://i.pravatar.cc/100?u=${notif.user}`} className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/10" alt={notif.user} />
                <div className="absolute -bottom-1 -right-1 p-1.5 bg-[#18191a] border border-white/10 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  {getIcon(notif.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white text-[15px] leading-tight">
                  <span className="font-bold group-hover:text-[#d93025] transition-colors">{notif.user}</span> {notif.content}
                </p>
                <span className={`text-xs mt-1 block font-medium ${notif.unread ? 'text-[#d93025]' : 'text-neutral-500'}`}>
                  {notif.time}
                </span>
              </div>
              
              {notif.unread && (
                <div className="w-3 h-3 bg-[#d93025] rounded-full shadow-[0_0_8px_rgba(217,48,37,0.5)]" />
              )}
            </div>
          ))}
        </div>

        {/* See older button */}
        <Button className="w-full mt-8 h-12 bg-transparent hover:bg-white/5 text-neutral-400 font-bold border border-white/5 rounded-2xl transition-all">
          Cargar notificaciones anteriores
        </Button>

      </div>
    </AppLayout>
  );
}
