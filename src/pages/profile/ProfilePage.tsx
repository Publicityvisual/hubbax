import { useState, useRef } from 'react';
import { AppLayout } from '../../layouts/AppLayout';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Camera, MessageCircle, UserPlus, MoreHorizontal, CheckCircle2, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { MASTER_USERS } from '../../data/masterUsers';

// GSAP Imports
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Widget Imports
import { IntroWidget } from '../../components/social/IntroWidget';
import { PhotoWidget } from '../../components/social/PhotoWidget';
import { FriendWidget } from '../../components/social/FriendWidget';

gsap.registerPlugin(ScrollTrigger);

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');
  const { username } = useParams();
  
  const profileKey = (username && username in MASTER_USERS) ? username as keyof typeof MASTER_USERS : 'founder';
  const user = MASTER_USERS[profileKey];

  const [friendStatus, setFriendStatus] = useState<'none' | 'pending' | 'friends'>('none');
  
  // Refs for GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handleFriendAction = () => {
    if (friendStatus === 'none') setFriendStatus('pending');
    else if (friendStatus === 'pending') setFriendStatus('none');
    else if (friendStatus === 'friends') setFriendStatus('none');
  };

  // GSAP Animations
  useGSAP(() => {
    // Parallax Effect
    if (coverRef.current) {
      gsap.to(coverRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: coverRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Content Entrance
    gsap.from('.profile-entrance', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
  }, { scope: containerRef });

  // Tab Transition Animation
  useGSAP(() => {
    if (contentRef.current) {
        gsap.fromTo(contentRef.current, 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
    }
  }, [activeTab]);

  // Mock Data for Widgets
  const mockPhotos = Array.from({ length: 9 }, (_, i) => `https://picsum.photos/400/400?random=${i + 50}`);
  const mockFriends: { name: string; avatar: string; mutualFriends: number }[] = [];

  return (
    <AppLayout>
      <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        
        <div className="pb-20">
        
        {/* Cover Photo Area */}
        <div className="relative w-full h-[35vh] md:h-[400px] bg-[#1a1b1c] overflow-hidden group">
            <img 
              ref={coverRef}
              src={user.coverImage} 
              alt="Cover" 
              className="w-full h-[140%] object-cover absolute top-0 left-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20" />
            
            <button className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-black/80 transition-all border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                <Camera className="w-5 h-5" />
                <span className="hidden md:inline">Editar portada</span>
            </button>
        </div>

        {/* Profile Info Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative">
            
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 md:-mt-12 relative z-10 mb-6 profile-entrance">
                
                {/* Avatar */}
                <div className="relative group cursor-pointer">
                    <div className="w-40 h-40 md:w-44 md:h-44 rounded-full p-1.5 bg-[#0a0a0a] ring-1 ring-white/10">
                        <Avatar 
                            src={user.avatarImage} 
                            alt={user.fullName}
                            isBusiness={user.username === 'hubbax_ai'}
                            className="w-full h-full rounded-full border-4 border-[#18191a] group-hover:brightness-90 transition-all"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                    </div>
                </div>

                {/* Name & Headline */}
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <h1 className="text-3xl font-bold text-white tracking-tight">{user.fullName}</h1>
                        {user.isVerified && (
                          <CheckCircle2 
                            className={`w-6 h-6 ${
                              user.verificationLevel === 'gold' 
                                ? 'text-yellow-400 fill-yellow-400/20' 
                                : 'text-blue-500 fill-blue-500/10'
                            }`} 
                          />
                        )}
                    </div>
                    <p className="text-neutral-400 font-medium text-lg mt-0.5">{user.headline}</p>
                    
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-2.5 text-neutral-400 text-sm">
                        <span className="hover:underline cursor-pointer"><strong className="text-white">{user.friendsCount}</strong> amigos</span>
                        <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                        <span className="hover:underline cursor-pointer">{user.mutualFriends} amigos en común</span>
                    </div>

                    <div className="flex items-center justify-center md:justify-start -space-x-2 mt-3.5 pl-1 min-h-[32px]">
                        {mockFriends.length > 0 ? (
                           <>
                                {mockFriends.slice(0, 5).map((f, i) => (
                                    <img key={i} src={f.avatar} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] ring-1 ring-white/5" alt={f.name} title={f.name} />
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-[#242526] flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-white/5">
                                    +{user.friendsCount}
                                </div>
                           </>
                        ) : (
                            <span className="text-xs text-neutral-500 italic">Sin conexiones recientes</span>
                        )}
                    </div>
                </div>

                {/* Interactive Actions */}
                <div className="flex items-center gap-3 mt-6 md:mt-0 md:mb-4">
                    <Button 
                        onClick={handleFriendAction}
                        className={`px-6 h-10 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg ${
                            friendStatus === 'friends' ? 'bg-[#242526] text-white hover:bg-[#3a3b3c]' :
                            friendStatus === 'pending' ? 'bg-[#242526] text-[#d93025] hover:bg-[#3a3b3c]' :
                            'bg-[#d93025] hover:bg-[#b01e15] text-white shadow-[#d93025]/20'
                        }`}
                    >
                        <UserPlus className="w-5 h-5" />
                        {friendStatus === 'friends' ? 'Amigos' : 
                         friendStatus === 'pending' ? 'Solicitud enviada' : 
                         'Agregar'}
                    </Button>
                    <Button className="bg-[#242526] hover:bg-[#3a3b3c] text-white px-6 h-10 rounded-lg font-bold flex items-center gap-2 border border-white/5">
                        <MessageCircle className="w-5 h-5" />
                        Mensaje
                    </Button>
                    <Button className="bg-[#242526] hover:bg-[#3a3b3c] text-white w-10 h-10 rounded-lg flex items-center justify-center border border-white/5">
                        <MoreHorizontal className="w-5 h-5" />
                    </Button>
                </div>

            </div>

            <div className="h-px bg-white/10 w-full my-1 opacity-50" />

            {/* Profile Navigation Tabs (Sticky) */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar sticky top-[60px] bg-[#0a0a0a]/90 backdrop-blur-md z-20 py-1.5 profile-entrance">
                {['Publicaciones', 'Información', 'Amigos', 'Fotos', 'Videos', 'Reels'].map((tab) => {
                    const id = tab === 'Publicaciones' ? 'posts' : tab.toLowerCase();
                    const isActive = activeTab === id || (activeTab === 'informacion' && id === 'información');
                    return (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(id === 'información' ? 'informacion' : id)}
                            className={`px-4 py-2.5 rounded-lg font-bold transition-all whitespace-nowrap relative group ${
                                isActive ? 'text-[#d93025]' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            {tab}
                            {isActive && (
                                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#d93025] rounded-full shadow-[0_0_8px_rgba(217,48,37,0.5)]" />
                            )}
                        </button>
                    );
                })}
            </div>

        </div>

        {/* Dynamic Content Area */}
        <div ref={contentRef} className="max-w-6xl mx-auto px-4 sm:px-8 mt-6">
            
            {activeTab === 'posts' && (
                <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6">
                    <div className="space-y-6">
                        <IntroWidget 
                          headline={user.headline} 
                          location={user.location} 
                          joinDate={user.joinDate} 
                        />
                        <PhotoWidget 
                          photos={mockPhotos} 
                          onSeeAll={() => setActiveTab('fotos')} 
                        />
                        <FriendWidget 
                          friends={mockFriends} 
                          totalCount={user.friendsCount.toString()} 
                          onSeeAll={() => setActiveTab('amigos')} 
                        />
                    </div>

                    <div className="space-y-6">
                         {/* Create Post Input */}
                         <div className="bg-[#18191a] rounded-xl p-4 border border-white/5 flex gap-3 shadow-md">
                            <Avatar src={user.avatarImage} className="w-10 h-10 rounded-full bg-neutral-700 ring-1 ring-white/5" />
                            <div className="flex-1 bg-[#242526] hover:bg-[#303031] rounded-full h-10 px-4 flex items-center cursor-pointer transition-colors text-neutral-400 font-medium">
                                <span>¿Qué estás pensando, {user.fullName.split(' ')[0]}?</span>
                            </div>
                         </div>

                         {/* Filters / Utility Bar */}
                         <div className="bg-[#18191a] rounded-xl p-3 border border-white/5 flex items-center justify-between shadow-sm">
                            <h4 className="font-bold text-lg px-2">Publicaciones</h4>
                            <div className="flex gap-2">
                                 <Button className="bg-[#242526] h-8 text-sm px-3 hover:bg-[#3a3b3c] border border-white/5">Filtros</Button>
                                 <Button className="bg-[#242526] h-8 text-sm px-3 hover:bg-[#3a3b3c] border border-white/5">Administrar</Button>
                            </div>
                         </div>

                         {/* Empty Feed Context */}
                         <div className="flex flex-col items-center justify-center py-20 bg-[#18191a] rounded-xl border border-white/5 shadow-inner text-neutral-500">
                            <div className="w-20 h-20 bg-[#242526] rounded-full flex items-center justify-center mb-4 ring-1 ring-white/10 shadow-lg">
                                <Camera className="w-10 h-10 text-neutral-400" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-1">Aún no hay publicaciones</h3>
                            <p className="max-w-[280px] text-center text-sm">Las publicaciones que {user.fullName.split(' ')[0]} comparta aparecerán aquí.</p>
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'fotos' && (
                <div className="bg-[#18191a] rounded-xl p-6 border border-white/5 min-h-[500px] shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Fotos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <img key={i} src={`https://picsum.photos/400/400?random=${i+100}`} className="w-full aspect-square object-cover rounded-xl hover:brightness-110 cursor-pointer shadow-md transition-all hover:scale-[1.02]" alt="Gallery" />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'amigos' && (
                <div className="bg-[#18191a] rounded-xl p-6 border border-white/5 min-h-[500px] shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Amigos</h3>
                    {mockFriends.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mockFriends.map((f, i) => (
                                <div key={i} className="bg-[#242526] rounded-xl p-4 border border-white/5 flex items-center gap-4 hover:bg-[#2c2d2e] transition-colors cursor-pointer group">
                                    <img src={f.avatar} className="w-20 h-20 rounded-xl object-cover ring-1 ring-white/10" alt="Friend" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-white group-hover:underline">{f.name}</h4>
                                        <span className="text-xs text-neutral-400 block mb-2">{f.mutualFriends} amigos en común</span>
                                        <div className="flex gap-2">
                                            <Button className="h-8 grow bg-[#3a3b3c] hover:bg-[#4a4b4c] text-white text-xs font-bold transition-all">Perfil</Button>
                                            <Button className="h-8 bg-[#3a3b3c] hover:bg-[#4a4b4c] text-white text-xs font-bold px-3">...</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-20 text-neutral-500">
                             <div className="w-20 h-20 bg-[#242526] rounded-full flex items-center justify-center mb-4 ring-1 ring-white/10 border border-white/5">
                                <Users className="w-10 h-10 opacity-50" />
                             </div>
                             <p className="font-medium">No hay amigos para mostrar</p>
                        </div>
                    )}
                </div>
            )}

             {activeTab === 'informacion' && (
                <div className="bg-[#18191a] rounded-xl p-8 border border-white/5 min-h-[400px] shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-8">Información</h3>
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-12">
                        <div className="space-y-4 mb-8 md:mb-0">
                            {['Resumen', 'Empleo y educación', 'Ubicación', 'Contacto', 'Información básica'].map(item => (
                                <p key={item} className="text-[#B0B3B8] font-bold text-[15px] cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">{item}</p>
                            ))}
                        </div>
                        <div className="space-y-10">
                            <div>
                                <h4 className="text-neutral-500 uppercase text-xs font-black tracking-widest mb-4">Presentación</h4>
                                <p className="text-white text-xl font-medium leading-relaxed">{user.bio}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-neutral-500 uppercase text-xs font-black tracking-widest mb-2">Especialidad</h4>
                                    <p className="text-white text-lg font-bold">{user.headline}</p>
                                </div>
                                <div>
                                    <h4 className="text-neutral-500 uppercase text-xs font-black tracking-widest mb-2">Residencia</h4>
                                    <p className="text-white text-lg font-bold">{user.location}</p>
                                </div>
                                <div>
                                    <h4 className="text-neutral-500 uppercase text-xs font-black tracking-widest mb-2">Aniversario Hubbax</h4>
                                    <p className="text-white text-lg font-bold">{user.joinDate}</p>
                                </div>
                                <div>
                                    <h4 className="text-neutral-500 uppercase text-xs font-black tracking-widest mb-2">Nivel de Confianza</h4>
                                    <p className="text-[#d93025] text-lg font-black uppercase italic">Verificado Diamond</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        
        </div>
        </div>
      </div>
    </AppLayout>
  );
}
