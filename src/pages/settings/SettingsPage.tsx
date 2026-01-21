import { useRef } from 'react';
import { AppLayout } from '../../layouts/AppLayout';
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Shield,
  Globe, 
  Palette, 
  ChevronRight,
  Monitor,
  Database,
  LogOut
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

// GSAP
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function SettingsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.settings-section', {
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  const sections = [
    { title: 'Cuenta', icon: User, items: ['Información personal', 'Idiomas y región', 'Preferencias de contenido'] },
    { title: 'Privacidad y seguridad', icon: Lock, items: ['Configuración de privacidad', 'Bloqueos', 'Autenticación en dos pasos'] },
    { title: 'Preferencias', icon: Palette, items: ['Modo oscuro', 'Accesibilidad', 'Notificaciones del navegador'] },
    { title: 'Recursos', icon: Globe, items: ['Centro de ayuda', 'Términos y condiciones', 'Política de privacidad'] },
  ];

  return (
    <AppLayout>
      <div ref={containerRef} className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-[#d93025]" />
            Configuración
          </h1>
          <p className="text-neutral-400 mt-1">Personaliza tu experiencia en Hubbax.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          
          {/* Sidebar Nav (Desktop) */}
          <div className="space-y-1 hidden md:block">
            {sections.map((sec, i) => (
              <button key={sec.title} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-[15px] ${
                i === 0 ? 'bg-[#d93025]/10 text-[#d93025]' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}>
                <sec.icon className="w-5 h-5" />
                {sec.title}
              </button>
            ))}
            <div className="h-px bg-white/5 my-4 mx-4" />
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[#d93025] hover:bg-[#d93025]/5 transition-all text-[15px]">
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            
            {/* Quick Profile Card */}
            <div className="settings-section bg-gradient-to-r from-[#18191a] to-[#242526] p-6 rounded-3xl border border-white/5 flex items-center justify-between shadow-xl">
               <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?u=me" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#d93025]/30" alt="Me" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-4 border-[#18191a]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">DjKov</h2>
                    <p className="text-neutral-400 text-sm">@djkov • Verificado Pro</p>
                  </div>
               </div>
               <Button className="bg-white/10 hover:bg-white/20 text-white font-bold h-10 px-5 rounded-xl transition-all">
                  Editar perfil
               </Button>
            </div>

            {/* General Settings List */}
            <div className="settings-section space-y-3">
               <h3 className="text-neutral-500 uppercase text-xs font-black tracking-widest px-1">Ajustes principales</h3>
               <div className="bg-[#18191a] rounded-3xl border border-white/5 divide-y divide-white/5 overflow-hidden shadow-md">
                  {[
                    { icon: Monitor, label: 'Apariencia del sistema', value: 'Oscuro' },
                    { icon: Bell, label: 'Notificaciones push', value: 'Activado' },
                    { icon: Shield, label: 'Autenticación de dos pasos', value: 'Recomendado' },
                    { icon: Database, label: 'Uso de datos y almacenamiento', value: 'Normal' }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-5 hover:bg-white/[0.02] cursor-pointer group transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#242526] rounded-xl flex items-center justify-center text-neutral-400 group-hover:bg-[#d93025]/10 group-hover:text-[#d93025] transition-all">
                             <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-[15px]">{item.label}</p>
                            <p className="text-neutral-500 text-sm">{item.value}</p>
                          </div>
                       </div>
                       <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                    </div>
                  ))}
               </div>
            </div>

            {/* Danger Zone */}
            <div className="settings-section pt-4">
               <div className="bg-[#d93025]/5 border border-[#d93025]/10 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="text-[#d93025] font-black text-lg">Zona Crítica</h3>
                    <p className="text-neutral-500 text-[13px]">La eliminación de la cuenta es permanente e irreversible.</p>
                  </div>
                  <Button className="bg-[#d93025] hover:bg-red-700 text-white font-black px-6 h-12 rounded-xl transition-all w-full sm:w-fit shadow-lg shadow-[#d93025]/20">
                    Eliminar cuenta
                  </Button>
               </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
