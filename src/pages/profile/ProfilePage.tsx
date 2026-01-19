import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '../../layouts/AppLayout';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { MapPin, Calendar, Briefcase, Camera, MessageCircle, UserPlus, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { MASTER_USERS } from '../../data/masterUsers';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts'); // Used for tab switching
  const { username } = useParams();
  
  // Default to "Founder" if no username or "/me", otherwise look up in master users
  const profileKey = (username && username in MASTER_USERS) ? username as keyof typeof MASTER_USERS : 'founder';
  const user = MASTER_USERS[profileKey];

  // Friend Button Logic
  const [friendStatus, setFriendStatus] = useState<'none' | 'pending' | 'friends'>('none');
  
  const handleFriendAction = () => {
    if (friendStatus === 'none') setFriendStatus('pending');
    else if (friendStatus === 'pending') setFriendStatus('none');
    else if (friendStatus === 'friends') setFriendStatus('none');
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        
        {/* Scrollable Container */}
        <div className="pb-20">
        
        {/* Cover Photo Area - Immersive & Premium */}
        <div className="relative w-full h-[35vh] md:h-[400px] bg-neutral-800 overflow-hidden group">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={user.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20" />
            
            {/* Edit Cover Button (Desktop) */}
            <button className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100 md:opacity-100">
                <Camera className="w-5 h-5" />
                <span className="hidden md:inline">Editar portada</span>
            </button>
        </div>

        {/* Profile Info Section - Constrained Width */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative">
            
            {/* Desktop: Flex Row | Mobile: Flex Col */}
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 md:-mt-12 relative z-10 mb-6">
                
                {/* Avatar */}
                <div className="relative">
                    <div className="w-40 h-40 md:w-44 md:h-44 rounded-full p-1.5 bg-[#0a0a0a]">
                        <Avatar 
                            src={user.avatarImage} 
                            alt={user.fullName}
                            isBusiness={user.username === 'hubbax_ai'} // Simple check for now
                            className="w-full h-full rounded-full border-4 border-[#242526]"
                        />
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
                    <p className="text-neutral-400 font-medium text-lg">{user.headline}</p>
                    
                    {/* Quick Stats - Friends/Mutuals */}
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-neutral-400 text-sm">
                        <span className="hover:underline cursor-pointer"><strong className="text-white">{user.friendsCount}</strong> amigos</span>
                        <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                        <span className="hover:underline cursor-pointer">{user.mutualFriends} amigos en común</span>
                    </div>

                    {/* Friend Row Preview */}
                    <div className="flex items-center justify-center md:justify-start -space-x-2 mt-3 pl-2">
                        {[1,2,3,4].map(i => (
                            <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a]" />
                        ))}
                    </div>
                </div>

                {/* Interactive Actions */}
                <div className="flex items-center gap-3 mt-6 md:mt-0 md:mb-4">
                    <Button 
                        onClick={handleFriendAction}
                        className={`px-6 h-10 rounded-lg font-bold flex items-center gap-2 transition-all ${
                            friendStatus === 'friends' ? 'bg-[#242526] text-white hover:bg-[#3a3b3c]' :
                            friendStatus === 'pending' ? 'bg-[#242526] text-[#d93025] hover:bg-[#3a3b3c]' :
                            'bg-[#d93025] hover:bg-[#b01e15] text-white'
                        }`}
                    >
                        {friendStatus === 'friends' ? <CheckCircle2 className="w-5 h-5" /> : 
                         friendStatus === 'pending' ? <UserPlus className="w-5 h-5" /> : 
                         <UserPlus className="w-5 h-5" />}
                        
                        {friendStatus === 'friends' ? 'Amigos' : 
                         friendStatus === 'pending' ? 'Solicitud enviada' : 
                         'Agregar'}
                    </Button>
                    <Button className="bg-[#242526] hover:bg-[#3a3b3c] text-white px-6 h-10 rounded-lg font-bold flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Mensaje
                    </Button>
                    <Button className="bg-[#242526] hover:bg-[#3a3b3c] text-white w-10 h-10 rounded-lg flex items-center justify-center">
                        <MoreHorizontal className="w-5 h-5" />
                    </Button>
                </div>

            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 w-full my-4" />

            {/* Profile Navigation Tabs (Sticky) */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar sticky top-[60px] bg-[#0a0a0a]/95 backdrop-blur-xl z-20 py-2">
                {['Publicaciones', 'Información', 'Amigos', 'Fotos', 'Videos', 'Reels'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab === 'Publicaciones' ? 'posts' : tab.toLowerCase())}
                        className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                            (activeTab === 'posts' && tab === 'Publicaciones') || activeTab === tab.toLowerCase()
                            ? 'text-[#d93025] bg-[#d93025]/10' 
                            : 'text-neutral-400 hover:bg-[#242526] hover:text-white'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

        </div>

        {/* Dynamic Content Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-6">
            
            {/* View: POSTS (Default) */}
            {activeTab === 'posts' && (
                <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Intro Card */}
                        <div className="bg-[#18191a] rounded-xl p-4 border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4">Detalles</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <Briefcase className="w-5 h-5 text-neutral-500" />
                                    <span>{user.headline} en <strong>Hubbax Inc.</strong></span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <MapPin className="w-5 h-5 text-neutral-500" />
                                    <span>Vive en <strong>{user.location}</strong></span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <Calendar className="w-5 h-5 text-neutral-500" />
                                    <span>Se unió en {user.joinDate}</span>
                                </div>
                            </div>
                            <Button className="w-full mt-4 bg-[#242526] hover:bg-[#3a3b3c] text-white">Editar detalles</Button>
                        </div>

                        {/* Photos Preview Card */}
                        <div className="bg-[#18191a] rounded-xl p-4 border border-white/5">
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-white">Fotos</h3>
                                <span className="text-[#d93025] text-sm cursor-pointer hover:underline" onClick={() => setActiveTab('fotos')}>Ver todas</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                                {[1,2,3,4,5,6,7,8,9].map(i => (
                                    <img key={i} src={`https://picsum.photos/300/300?random=${i}`} className="w-full aspect-square object-cover hover:opacity-90 cursor-pointer" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feed */}
                    <div className="space-y-6">
                         {/* Create Post Input (Using the existing component logic placeholder) */}
                         <div className="bg-[#18191a] rounded-xl p-4 border border-white/5 flex gap-3 items-center">
                            <Avatar src={user.avatarImage} className="w-10 h-10 rounded-full bg-neutral-700" />
                            <div className="flex-1 bg-[#242526] hover:bg-[#303031] rounded-full h-10 px-4 flex items-center cursor-pointer transition-colors text-neutral-400">
                                <span>¿Qué estás pensando, {user.fullName.split(' ')[0]}?</span>
                            </div>
                         </div>

                         {/* Filters */}
                         <div className="bg-[#18191a] rounded-xl p-3 border border-white/5 flex items-center justify-between">
                            <h4 className="font-bold text-lg px-2">Publicaciones</h4>
                            <div className="flex gap-2">
                                 <Button className="bg-[#242526] h-8 text-sm px-3">Filtros</Button>
                                 <Button className="bg-[#242526] h-8 text-sm px-3">Administrar</Button>
                            </div>
                         </div>

                         {/* No Posts Placeholder */}
                         <div className="flex flex-col items-center justify-center py-10 bg-[#18191a] rounded-xl border border-white/5 text-neutral-500">
                            <div className="w-16 h-16 bg-[#242526] rounded-full flex items-center justify-center mb-3">
                                <Camera className="w-8 h-8" />
                            </div>
                            <h3 className="text-white font-bold text-lg">Aún no hay publicaciones</h3>
                            <p>Las publicaciones que compartas aparecerán aquí.</p>
                         </div>
                    </div>
                </div>
            )}

            {/* View: PHOTOS */}
            {activeTab === 'fotos' && (
                <div className="bg-[#18191a] rounded-xl p-4 border border-white/5 min-h-[500px]">
                    <h3 className="text-2xl font-bold text-white mb-6">Fotos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[...Array(12)].map((_, i) => (
                            <img key={i} src={`https://picsum.photos/400/400?random=${i+20}`} className="w-full aspect-square object-cover rounded-lg hover:opacity-90 cursor-pointer" />
                        ))}
                    </div>
                </div>
            )}

            {/* View: FRIENDS */}
            {activeTab === 'amigos' && (
                <div className="bg-[#18191a] rounded-xl p-4 border border-white/5 min-h-[500px]">
                    <h3 className="text-2xl font-bold text-white mb-6">Amigos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-[#242526] rounded-xl overflow-hidden border border-white/5">
                                <div className="aspect-square bg-neutral-800">
                                   <img src={`https://i.pravatar.cc/300?img=${i+20}`} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-3">
                                    <h4 className="font-bold text-white text-sm">Amigo {i+1}</h4>
                                    <span className="text-xs text-neutral-400">12 amigos en común</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

             {/* View: ABOUT */}
             {(activeTab === 'información' || activeTab === 'informacion') && (
                <div className="bg-[#18191a] rounded-xl p-8 border border-white/5 min-h-[300px]">
                    <h3 className="text-2xl font-bold text-white mb-6">Información</h3>
                    <div className="space-y-6 max-w-2xl">
                        <div>
                            <span className="text-neutral-500 text-sm uppercase font-bold tracking-wider">Bio</span>
                            <p className="text-white text-lg mt-1">{user.bio}</p>
                        </div>
                        <div className="h-px bg-white/10" />
                         <div>
                            <span className="text-neutral-500 text-sm uppercase font-bold tracking-wider">Detalles de Empleo</span>
                            <p className="text-white text-lg mt-1">{user.headline}</p>
                        </div>
                         <div className="h-px bg-white/10" />
                         <div>
                            <span className="text-neutral-500 text-sm uppercase font-bold tracking-wider">Ubicación</span>
                            <p className="text-white text-lg mt-1">{user.location}</p>
                        </div>
                    </div>
                </div>
            )}
        
        </div> {/* End of Dynamic Content Area */}
      </div> {/* End of Scrollable Container */}
      </div> {/* End of Root Container */}
    </AppLayout>
  );
}
