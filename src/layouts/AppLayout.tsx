import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Bell, Settings, Search, LogOut, Menu, User, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CURRENT_USER } from '../data/masterUsers';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: "Inicio", path: "/feed" },
    { icon: <User className="w-5 h-5" />, label: "Perfil", path: `/profile/${CURRENT_USER.username}` },
    { icon: <Users className="w-5 h-5" />, label: "Amigos", path: "/friends" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Mensajes", path: "/messages" },
    { icon: <Bell className="w-5 h-5" />, label: "Notificaciones", path: "/notifications" },
    { icon: <Settings className="w-5 h-5" />, label: "Configuración", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans">
      {/* Navbar Mobile */}
      <nav className="lg:hidden fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
         <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <img src="/assets/logo.png" alt="Hubbax" className="h-8 w-auto object-contain" />
        </div>
        <button className="text-white/60 hover:text-white hover:bg-white/5 p-2 rounded-xl transition-colors">
            <Menu className="w-6 h-6" />
        </button>
      </nav>

      <div className="flex max-w-7xl mx-auto pt-16 lg:pt-0 pb-16 lg:pb-0">
        
        {/* Left Sidebar */}
        <aside className="hidden lg:flex w-64 h-screen sticky top-0 flex-col border-r border-white/5 p-6 space-y-8 bg-[#050505]/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <img src="/assets/logo.png" alt="Hubbax" className="h-8 w-auto object-contain" />
                <span className="text-white text-xl font-bold">Hubbax</span>
            </div>

            <nav className="space-y-1 flex-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link 
                            key={item.path} 
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive ? 'text-white bg-[#d93025]/10' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                        >
                            {isActive && (
                                <motion.div 
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-[#d93025]/10 rounded-xl border-l-2 border-[#d93025]"
                                />
                            )}
                            <span className={`relative z-10 ${isActive ? 'text-[#d93025]' : ''}`}>{item.icon}</span>
                            <span className="relative z-10 font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-4 border-t border-white/5">
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-medium">
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen border-r border-white/5 border-l lg:border-l-0 border-r-0 lg:border-r border-white/5">
            {children}
        </main>

        {/* Right Sidebar (Sponsored & Contacts) */}
        <aside className="hidden xl:flex w-80 h-screen sticky top-0 flex-col p-4 space-y-6 overflow-y-auto no-scrollbar">
            
            {/* Sponsored Section */}
            <div className="space-y-4">
                <h3 className="font-semibold text-white/50 text-[15px] px-2">Publicidad</h3>
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-[120px] h-[80px] rounded-lg overflow-hidden flex-shrink-0">
                         <img 
                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60" 
                            alt="Ad" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                         />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-medium text-sm leading-tight">Curso de React Avanzado 2025</span>
                        <span className="text-white/40 text-xs mt-1">udemy.com</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-[120px] h-[80px] rounded-lg overflow-hidden flex-shrink-0">
                         <img 
                            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60" 
                            alt="Ad" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                         />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-medium text-sm leading-tight">Hubbax Analytics Pro</span>
                        <span className="text-white/40 text-xs mt-1">hubbax.com</span>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 mx-2" />

            {/* Contacts Section */}
            <div className="space-y-2">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-semibold text-white/50 text-[15px]">Contactos</h3>
                    <div className="flex gap-2">
                        <Search className="w-4 h-4 text-white/40 hover:text-white cursor-pointer" />
                        <Settings className="w-4 h-4 text-white/40 hover:text-white cursor-pointer" />
                    </div>
                </div>
                
                {[
                    { name: "Sarah Connor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60", online: true },
                    { name: "John Wick", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=60", online: true },
                    { name: "Elena Fisher", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60", online: false },
                    { name: "Nathan Drake", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60", online: true },
                    { name: "Lara Croft", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60", online: true },
                     { name: "Tony Stark", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60", online: false },
                    { name: "Bruce Wayne", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60", online: true },
                ].map((user, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="relative w-9 h-9">
                            <img src={user.img} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            {user.online && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050505]" />
                            )}
                        </div>
                        <span className="text-white font-medium text-sm text-[15px]">{user.name}</span>
                    </div>
                ))}
            </div>
        </aside>

      </div>
      
      {/* Mobile Bottom Navigation Dock */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 pb-safe z-50">
        <div className="flex justify-around items-center h-16 px-2">
            {navItems.slice(0, 5).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link 
                        key={item.path} 
                        to={item.path}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-[#d93025]' : 'text-neutral-500 active:text-white'}`}
                    >
                        <div className="relative">
                            {item.icon}
                            {isActive && <motion.div layoutId="mobileActive" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#d93025] rounded-full" />}
                        </div>
                    </Link>
                );
            })}
             <Link 
                to="/settings"
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/settings' ? 'text-[#d93025]' : 'text-neutral-500 active:text-white'}`}
            >
                <Settings className="w-5 h-5" />
            </Link>
        </div>
      </div>
