import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Bell, Settings, Search, LogOut, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: "Inicio", path: "/" },
    { icon: <Users className="w-5 h-5" />, label: "Amigos", path: "/friends" },
    { icon: <Bell className="w-5 h-5" />, label: "Notificaciones", path: "/notifications" },
    { icon: <Settings className="w-5 h-5" />, label: "Configuración", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans">
      {/* Navbar Mobile */}
      <nav className="lg:hidden fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
         <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-violet-500 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            Hubbax
        </div>
        <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
        </Button>
      </nav>

      <div className="flex max-w-7xl mx-auto pt-16 lg:pt-0">
        
        {/* Left Sidebar */}
        <aside className="hidden lg:flex w-64 h-screen sticky top-0 flex-col border-r border-white/5 p-6 space-y-8">
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 px-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-primary to-violet-500 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                Hubbax
            </div>

            <nav className="space-y-1 flex-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link 
                            key={item.path} 
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive ? 'text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                        >
                            {isActive && (
                                <motion.div 
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-primary/10 rounded-xl"
                                />
                            )}
                            <span className="relative z-10">{item.icon}</span>
                            <span className="relative z-10 font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-4 border-t border-white/5">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10 gap-4 px-4">
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </Button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen border-r border-white/5 border-l lg:border-l-0 border-r-0 lg:border-r border-white/5">
            {children}
        </main>

        {/* Right Sidebar (Suggestions / Trends) */}
        <aside className="hidden xl:flex w-80 h-screen sticky top-0 flex-col p-6 space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                    type="text" 
                    placeholder="Buscar en Hubbax..." 
                    className="w-full bg-white/5 border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
            </div>

            <div className="bg-white/5 rounded-2xl p-4 space-y-4 border border-white/5">
                <h3 className="font-bold text-lg">Tendencias para ti</h3>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-1 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <p className="text-xs text-white/40">Tecnología · Tendencia</p>
                        <p className="font-bold text-sm">#InteligenciaArtificial</p>
                        <p className="text-xs text-white/40">25.4K posts</p>
                    </div>
                ))}
            </div>
        </aside>

      </div>
    </div>
  );
}
