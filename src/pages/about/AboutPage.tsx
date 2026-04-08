import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Lock } from 'lucide-react';
import { AppLayout } from '../../layouts/AppLayout';

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Acerca de <span className="text-[#d93025]">Hubbax</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            La primera red social diseñada para la libertad total. Sin censura, sin algoritmos manipuladores, solo conexión humana pura.
          </p>
        </motion.div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <MissionCard 
            icon={<Zap className="w-8 h-8 text-[#d93025]" />}
            title="Velocidad y Poder"
            description="Infraestructura de última generación para una experiencia instantánea y sin fricciones."
          />
          <MissionCard 
            icon={<Shield className="w-8 h-8 text-blue-500" />}
            title="Anti-Censura"
            description="Creemos que la verdad no debe ser silenciada. Aquí tienes el control total de tu voz."
          />
          <MissionCard 
            icon={<Lock className="w-8 h-8 text-green-500" />}
            title="Privacidad Real"
            description="Tus datos son tuyos. No vendemos tu privacidad al mejor postor."
          />
        </div>

        {/* Philosophy Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 space-y-6 relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#d93025]/10 rounded-full blur-3xl group-hover:bg-[#d93025]/20 transition-all duration-700" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="w-8 h-8 text-[#d93025]" />
              Nuestra Filosofía
            </h2>
            <div className="space-y-4 text-neutral-300 text-lg leading-relaxed">
              <p>
                Hubbax nace como una respuesta a la centralización y el control de la información en las grandes plataformas sociales. 
                Mientras el resto del mundo se mueve hacia la moderación algorítmica agresiva, nosotros apostamos por la 
                <span className="text-white font-bold"> transparencia absoluta </span>.
              </p>
              <p>
                No somos solo una alternativa a Meta; somos una evolución. Queremos devolver la red social a sus raíces: 
                un lugar donde las personas puedan debatir, compartir y crecer sin miedo a ser "borradas" por una entidad corporativa.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6">¿Listo para unirte a la revolución?</h3>
          <button className="px-8 py-4 bg-[#d93025] hover:bg-[#ff4e42] text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(217,48,37,0.4)]">
            CREAR CUENTA AHORA
          </button>
        </motion.div>

      </div>
    </AppLayout>
  );
}

function MissionCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-[#d93025]/30 transition-all hover:-translate-y-2 group">
      <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}
