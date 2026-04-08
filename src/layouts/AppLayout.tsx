import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Bell, Settings, Search, LogOut, User, MessageSquare, Zap, Compass, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const { profile } = useFirebase();

  // Reemplazo temporal mientras la autenticación se completa
  const currentUser = profile || {
    username: 'freedom',
    avatar: '/assets/avatars/freedom.png',
    fullName: 'Freedom Defender'
  };

  const navItems = [
    { icon: <Home className="w-[22px] h-[22px]" />, label: "Inicio", path: "/feed" },
    { icon: <Compass className="w-[22px] h-[22px]" />, label: "Explorar", path: "/explore" },
    { icon: <Users className="w-[22px] h-[22px]" />, label: "Amigos", path: "/friends" },
    { icon: <MessageSquare className="w-[22px] h-[22px]" />, label: "Mensajes", path: "/messages" },
    { icon: <Bell className="w-[22px] h-[22px]" />, label: "Notificaciones", path: "/notifications" },
    { icon: <User className="w-[22px] h-[22px]" />, label: "Perfil", path: `/profile/${currentUser.username}` },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-[#d93025]/30">
      
      {/* Navbar Mobile - Premium Frosted */}
      <nav className="lg:hidden fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 px-5 h-16 flex items-center justify-between shadow-2xl">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d93025] to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(217,48,37,0.4)]">
                <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Hubbax</span>
        </div>
        <div className="flex items-center gap-3">
             <button className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/70 active:scale-90 transition-all">
                <Search className="w-5 h-5" />
             </button>
             <Link to={`/profile/${currentUser.username}`} className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/10 active:scale-90 transition-all">
                <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
             </Link>
        </div>
      </nav>

      <div className="flex max-w-[1440px] mx-auto pt-16 lg:pt-0 pb-20 lg:pb-0">
        
        {/* Left Sidebar - Obsidian Glass */}
        <aside className="hidden lg:flex w-[280px] h-screen sticky top-0 flex-col border-r border-white/5 p-6 bg-[#050505] shadow-[5px_0_30px_rgba(0,0,0,0.5)] z-20">
            <div className="flex items-center gap-3 px-2 mb-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d93025] to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(217,48,37,0.3)]">
                    <Zap className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">Hubbax</span>
            </div>

            <nav className="space-y-2 flex-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path.includes('/profile') && location.pathname.includes('/profile'));
                    return (
                        <Link 
                            key={item.path} 
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                                isActive ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {isActive && (
                                <motion.div 
                                    layoutId="desktopNav"
                                    className="absolute inset-0 bg-[#d93025]/10 rounded-xl border border-[#d93025]/20 shadow-[0_0_15px_rgba(217,48,37,0.1)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-[#ff4e42] drop-shadow-[0_0_8px_rgba(217,48,37,0.5)]' : ''}`}>
                                {item.icon}
                            </span>
                            <span className={`relative z-10 font-bold tracking-wide text-[15px] ${isActive ? 'text-white' : ''}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-8 mb-6">
                 <h3 className="font-black text-neutral-500 text-xs uppercase tracking-widest px-4 mb-2">Tus Accesos Directos</h3>
                 <div className="space-y-1">
                     {[
                         { name: "Diseñadores UI/UX", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&auto=format&fit=crop" },
                         { name: "React Developers", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&auto=format&fit=crop" },
                         { name: "Gaming Hub", img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=100&h=100&auto=format&fit=crop" },
                         { name: "Mercado Digital", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&auto=format&fit=crop" },
                     ].map((item, i) => (
                         <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer group">
                             <img src={item.img} className="w-9 h-9 rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-white/30 transition-all" alt={item.name} />
                             <span className="font-bold text-[14px] truncate">{item.name}</span>
                         </div>
                     ))}
                     
                     <div className="flex items-center gap-3 px-4 py-2 rounded-xl text-neutral-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
                         <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7"/></svg>
                         </div>
                         <span className="font-bold text-[13px]">Ver más</span>
                     </div>
                 </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-2">
                <Link to="/settings" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                    <Settings className="w-[22px] h-[22px]" />
                    <span className="font-bold text-[15px]">Configuración</span>
                </Link>
                 <Link to="/help" className="flex items-center gap-4 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                    <Shield className="w-[22px] h-[22px]" />
                    <span className="font-bold text-[15px]">Ayuda y Soporte</span>
                </Link>
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all mt-4 font-bold">
                    <LogOut className="w-[22px] h-[22px]" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
            
             {/* Mini Profile */}
            <div className="mt-6 flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                 <img src={currentUser.avatar} className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#d93025] transition-all" alt="Me" />
                 <div className="flex-1 min-w-0">
                     <p className="font-bold text-white text-sm truncate">{currentUser.fullName}</p>
                     <p className="text-xs text-neutral-500 truncate">@{currentUser.username}</p>
                 </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen relative z-10">
            {children}
        </main>

        {/* Right Sidebar - Social Graph */}
        <aside className="hidden xl:flex w-[340px] h-screen sticky top-0 flex-col p-6 space-y-8 overflow-y-auto no-scrollbar bg-[#050505]/30">
            
            {/* Birthdays Widget */}
            <div className="space-y-4">
                <h3 className="font-black text-neutral-500 text-xs uppercase tracking-widest px-1">Cumpleaños</h3>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-gradient-to-br from-[#18191a] to-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all cursor-pointer group shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d93025] to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(217,48,37,0.3)] group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
                            <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
                            <path d="M2 21h20"/>
                            <path d="M7 8v2"/>
                            <path d="M12 8v2"/>
                            <path d="M17 8v2"/>
                            <path d="M7 4h.01"/>
                            <path d="M12 4h.01"/>
                            <path d="M17 4h.01"/>
                        </svg>
                    </div>
                    <div className="flex flex-col">
                         <span className="text-white font-bold text-sm leading-tight">Sarah Connor</span>
                         <span className="text-neutral-400 text-xs mt-0.5">y 2 amigos más cumplen hoy.</span>
                    </div>
                </div>
            </div>

            {/* Sponsored - Premium Cards */}
            <div className="space-y-4">
                <h3 className="font-black text-neutral-500 text-xs uppercase tracking-widest px-1">Publicidad</h3>
                
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#18191a]">
                    <img 
                        src="https://images.unsplash.com/photo-1620912189695-1f9d51829e92?w=800&auto=format&fit=crop&q=60" 
                        alt="Ad" 
                        className="w-full h-32 object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 flex flex-col justify-end">
                         <span className="text-white font-bold leading-tight drop-shadow-md">Diseño 3D Futurista</span>
                         <span className="text-neutral-400 text-xs mt-1">masterclass.com</span>
                    </div>
                </div>

                 <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/5">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                         <img 
                            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60" 
                            alt="Ad" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                         />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-sm leading-tight group-hover:text-[#d93025] transition-colors">Hubbax Premium</span>
                        <span className="text-neutral-500 text-xs mt-1">Sin anuncios, más alcance.</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            {/* Contacts - Status Indicators */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="font-black text-neutral-500 text-xs uppercase tracking-widest">Contactos</h3>
                    <div className="flex gap-3">
                        <Search className="w-4 h-4 text-neutral-500 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
                
                <div className="space-y-1">
                    {[
                        { name: "Sarah Connor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60", online: true, status: "En línea" },
                        { name: "John Wick", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=60", online: true, status: "Jugando Fortnite" },
                        { name: "Elena Fisher", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60", online: false, status: "Hace 5 min" },
                        { name: "Nathan Drake", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60", online: true, status: "En línea" },
                        { name: "Lara Croft", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60", online: true, status: "En línea" },
                        { name: "Tony Stark", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60", online: false, status: "Ocupado" },
                        { name: "Bruce Wayne", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60", online: true, status: "En la Baticueva" },
                    ].map((user, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                            <div className="relative w-10 h-10">
                                <img src={user.img} alt={user.name} className="w-full h-full rounded-full object-cover ring-2 ring-transparent group-hover:ring-white/10 transition-all" />
                                {user.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050505] shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                )}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-white font-bold text-sm truncate">{user.name}</span>
                                <span className="text-neutral-500 text-[11px] truncate group-hover:text-neutral-400">{user.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>

      </div>
      
      {/* Mobile Bottom Dock - iPhone Style */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 min-w-[320px] max-w-[90%] bg-[#1a1a1a]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 px-2 py-2">
        <div className="flex justify-between items-center relative">
            {navItems.slice(0, 5).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link 
                        key={item.path} 
                        to={item.path}
                        className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
                    >
                        {isActive && (
                            <motion.div 
                                layoutId="mobileDockActive"
                                className="absolute inset-0 bg-[#d93025] rounded-full shadow-[0_0_15px_rgba(217,48,37,0.5)]"
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            />
                        )}
                        <span className={`relative z-10 transition-colors ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                            {item.icon}
                        </span>
                    </Link>
                );
            })}
             <Link 
                to="/settings"
                className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
            >
                <div className={`relative z-10 ${location.pathname === '/settings' ? 'text-white' : 'text-neutral-400'}`}>
                    <img src={currentUser.avatar} className="w-7 h-7 rounded-full object-cover border border-white/20" alt="Me" />
                </div>
            </Link>
        </div>
      </div>

    </div>
  );
}
