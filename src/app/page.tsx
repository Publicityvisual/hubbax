"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Globe, ShieldCheck, Zap, Building2, Users, Briefcase, CheckCircle2, MessageSquare, Bell, Search, Home, User as UserIcon, LayoutGrid, LogOut } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200 transition-transform group-hover:scale-110 duration-300">H</div>
            <span className="text-2xl font-black tracking-tighter text-blue-700 uppercase italic">Hubbax <span className="text-slate-400 font-light not-italic">Inc</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="#features" className="hover:text-blue-600 transition-all hover:opacity-80">Características</Link>
            <Link href="#ecosystem" className="hover:text-blue-600 transition-all hover:opacity-80">Ecosistema</Link>
            <Link href="/login" className="text-slate-900 hover:text-blue-600 transition-all">Iniciar Sesión</Link>
            <Link href="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-95">
              Únete Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold mb-8 shadow-sm border border-blue-100"
          >
            <Zap size={14} fill="currentColor" /> <span className="uppercase tracking-wider">SISTEMA HUBBAX V2.0 - ACTIVADO</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-9xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]"
          >
            Lidera tu carrera en <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">Hubbax Inc</span>
              <div className="absolute bottom-3 left-0 w-full h-3 bg-blue-100 -z-10 rounded-full" />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            By Publicity Visual. Un ecosistema de crecimiento diseñado para la excelencia. Conecta con la élite profesional, gestiona tu marca personal y accede a oportunidades globales.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link href="/register" className="w-full sm:w-auto bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-300 flex items-center justify-center gap-3 group active:scale-95">
              Comenzar Ahora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-white border-2 border-slate-100 text-slate-600 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
              Mi Cuenta
            </Link>
          </motion.div>

          {/* Simulated App Interface Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 relative max-w-6xl mx-auto px-4"
          >
            <div className="relative bg-slate-200 rounded-[3rem] p-4 shadow-[0_100px_150px_-30px_rgba(0,0,0,0.2)] border-[12px] border-slate-900 overflow-hidden aspect-video">
              <div className="bg-white w-full h-full rounded-[2rem] overflow-hidden flex flex-col shadow-inner">
                {/* App Header */}
                <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg" />
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <div className="bg-slate-100 rounded-full pl-10 pr-4 py-2 text-xs text-slate-400 w-64">Buscar profesionales...</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Bell size={20} className="text-slate-400" />
                    <MessageSquare size={20} className="text-slate-400" />
                    <div className="w-8 h-8 bg-slate-200 rounded-full" />
                  </div>
                </div>
                {/* App Body */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar */}
                  <div className="w-64 border-r border-slate-100 p-4 flex flex-col gap-2 bg-slate-50/50">
                    <SidebarItem icon={<Home size={18} />} label="Feed Principal" active />
                    <SidebarItem icon={<Users size={18} />} label="Conexiones" />
                    <SidebarItem icon={<Briefcase size={18} />} label="Empleos" />
                    <SidebarItem icon={<LayoutGrid size={18} />} label="Marketplace" />
                    <div className="mt-auto">
                       <SidebarItem icon={<UserIcon size={18} />} label="Mi Perfil" />
                       <SidebarItem icon={<LogOut size={18} />} label="Cerrar Sesión" />
                    </div>
                  </div>
                  {/* Main Feed */}
                  <div className="flex-1 p-6 bg-white overflow-y-auto space-y-6">
                    {/* Create Post */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-4">
                      <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0" />
                      <div className="bg-white rounded-full px-4 py-2 text-sm text-slate-400 w-full border border-slate-200">¿Qué hay de nuevo en tu carrera?</div>
                    </div>
                    {/* Feed Post 1 */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full" />
                        <div>
                          <div className="text-sm font-bold">Carlos Alberto</div>
                          <div className="text-xs text-slate-400 font-medium">Senior Architect @ Hubbax</div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed">
                        Acabo de terminar la implementación de la V2 de Hubbax. El rendimiento es increíble y la experiencia de usuario ha subido a otro nivel. ¡Súper emocionado por lo que viene! 🚀
                      </div>
                      <div className="h-48 bg-slate-100 rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">Visual Content Preview</div>
                      </div>
                    </div>
                  </div>
                  {/* Suggestions */}
                  <div className="w-72 p-4 bg-slate-50/50 space-y-6">
                    <div className="font-bold text-sm text-slate-900 mb-4">Sugerencias para ti</div>
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center gap-3 p-2 hover:bg-white rounded-xl transition-colors cursor-pointer group">
                        <div className="w-10 h-10 bg-slate-200 rounded-full" />
                        <div className="flex-1 overflow-hidden">
                          <div className="text-xs font-bold truncate">Profesional Elite {i}</div>
                          <div className="text-[10px] text-slate-400 truncate">Expert in AI & Big Data</div>
                        </div>
                        <Button size="sm" className="h-7 px-3 text-[10px] bg-blue-600">Sugerido</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-50 py-32 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Tecnología de Clase Mundial</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
              Fusionamos la funcionalidad masiva de las redes sociales con la elegancia de un entorno corporativo de lujo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Globe size={32} />} 
              title="Red Global Elite" 
              description="Conecta con CEOs, fundadores y expertos de todo el mundo. Rompe las barreras geográficas con la red más selecta." 
            />
            <FeatureCard 
              icon={<ShieldCheck size={32} />} 
              title="Identidad Verificada" 
              description="Tus logros y trayectoria validadas. Genera confianza inmediata en el mercado de la más alta calidad." 
            />
            <FeatureCard 
              icon={<Zap size={32} />} 
              title="Crecimiento Acelerado" 
              description="Algoritmos de match de talento que conectan tus habilidades con la oportunidad perfecta en tiempo real." 
            />
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight relative z-10">
                Más que una red, <br /> <span className="text-blue-600">la infraestructura de tu éxito.</span>
              </h2>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 -z-10" />
            </div>
            <div className="space-y-6">
              <EcoItem icon={<Users />} title="Comunidades de Industria" desc="Grupos especializados donde el conocimiento fluye entre los mejores." />
              <EcoItem icon={<Briefcase />} title="Marketplace de Talento" desc="Vende tus servicios profesionales o encuentra el perfil ideal para tu empresa." />
              <EcoItem icon={<Building2 />} title="Páginas Corporativas" desc="Construye la presencia digital de tu marca con herramientas de administración avanzadas." />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-blue-600 rounded-[3rem] p-16 text-white overflow-hidden shadow-2xl shadow-blue-200 group"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:bg-white/20 transition-all duration-500" />
            <h3 className="text-4xl font-black mb-6 relative z-10">Únete a la Revolución</h3>
            <p className="text-blue-100 mb-12 relative z-10 text-lg leading-relaxed font-medium">
              Hubbax Inc es la respuesta a la saturación de las redes sociales actuales. Un lugar donde el ruido desaparece y el valor profesional prevalece.
            </p>
            <Link href="/register" className="relative z-10 inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl active:scale-95">
              Crear Cuenta Gratis <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-slate-100 bg-slate-50/50 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">H</div>
          <span className="font-black text-slate-900 text-xl tracking-tighter italic uppercase">Hubbax Inc</span>
        </div>
        <p className="text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} Hubbax Inc by Publicity Visual. <br />
          Diseñado para la excelencia profesional.
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 group"
    >
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium text-lg">{description}</p>
    </motion.div>
  )
}

function EcoItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-5 p-5 rounded-3xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 group cursor-pointer">
      <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{title}</h4>
        <p className="text-slate-500 text-sm font-medium line-clamp-2">{desc}</p>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
      {icon}
      <span className="text-xs font-bold">{label}</span>
    </div>
  )
}
