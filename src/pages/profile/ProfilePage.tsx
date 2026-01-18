import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Button } from '../../components/ui/Button';
import { MapPin, Calendar, Briefcase, Camera, MessageCircle, UserPlus, MoreHorizontal } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      {/* Scrollable Container with nice spacing for Fixed Navbar */}
      <div className="pt-16 pb-20">
        
        {/* Cover Photo Area - Immersive & Premium */}
        <div className="relative w-full h-[35vh] md:h-[400px] bg-neutral-800 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80" 
              alt="Cover" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                        <img 
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=80" 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover border-4 border-[#242526]"
                        />
                    </div>
                    {/* Active Status Indicator */}
                    <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0a0a0a]" />
                </div>

                {/* Name & Headline */}
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Daniel Johnson</h1>
                    <p className="text-neutral-400 font-medium text-lg">Product Designer @ Hubbax</p>
                    
                    {/* Quick Stats - Friends/Mutuals */}
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-neutral-400 text-sm">
                        <span className="hover:underline cursor-pointer"><strong className="text-white">1.2k</strong> amigos</span>
                        <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                        <span className="hover:underline cursor-pointer">45 amigos en común</span>
                    </div>

                    {/* Friend Row Preview */}
                    <div className="flex items-center justify-center md:justify-start -space-x-2 mt-3 pl-2">
                        {[1,2,3,4].map(i => (
                            <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a]" />
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-6 md:mt-0 md:mb-4">
                    <Button className="bg-[#d93025] hover:bg-[#b01e15] text-white px-6 h-10 rounded-lg font-bold flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Agregar
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
                        className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                            activeTab === 'posts' && tab === 'Publicaciones' 
                            ? 'text-[#d93025] bg-[#d93025]/10' 
                            : 'text-neutral-400 hover:bg-[#242526] hover:text-white'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

        </div>

        {/* Profile Content Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6">
                
                {/* Left Column: Intro/Photos/Friends */}
                <div className="space-y-6">
                    {/* Intro Card */}
                    <div className="bg-[#18191a] rounded-xl p-4 border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-4">Detalles</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-neutral-300">
                                <Briefcase className="w-5 h-5 text-neutral-500" />
                                <span>Diseñador en <strong>Hubbax Inc.</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-300">
                                <MapPin className="w-5 h-5 text-neutral-500" />
                                <span>Vive en <strong>Ciudad de México</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-300">
                                <Calendar className="w-5 h-5 text-neutral-500" />
                                <span>Se unió en Enero 2024</span>
                            </div>
                        </div>
                        <Button className="w-full mt-4 bg-[#242526] hover:bg-[#3a3b3c] text-white">
                            Editar detalles
                        </Button>
                    </div>

                    {/* Photos Preview Card */}
                    <div className="bg-[#18191a] rounded-xl p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Fotos</h3>
                            <span className="text-[#d93025] text-sm cursor-pointer hover:underline">Ver todas</span>
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
                        <img 
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" 
                            className="w-10 h-10 rounded-full bg-neutral-700"
                        />
                        <div className="flex-1 bg-[#242526] hover:bg-[#303031] rounded-full h-10 px-4 flex items-center cursor-pointer transition-colors text-neutral-400">
                            <span>¿Qué estás pensando, Daniel?</span>
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
        </div>
      </div>
    </div>
  );
}
