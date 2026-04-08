"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Globe, ShieldCheck, Zap, Building2, Users, Briefcase, MessageSquare, Bell, Search, Home, User as UserIcon, LayoutGrid, LogOut, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-200/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-200/30 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/30 transition-all group-hover:rotate-12 group-hover:scale-110 duration-300">H</div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-blue-700 uppercase italic leading-none">Hubbax</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">by Publicity Visual</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <Link href="#features" className="hover:text-blue-600 transition-all">Características</Link>
            <Link href="#ecosystem" className="hover:text-blue-600 transition-all">Ecosistema</Link>
            <Link href="/login" className="text-slate-900 hover:text-blue-600 transition-all">Iniciar Sesión</Link>
            <Link href="/register" className="bg-blue-600 text-white px-7 py-3 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/40 active:scale-95 font-bold">
              Únete Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-xs font-black mb-8 shadow-sm border border-blue-100 backdrop-blur-sm"
          >
            <Zap size={14} fill="currentColor" /> <span className="uppercase tracking-widest">Elite Professional Network V2.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 mb-10 leading-[0.85]"
          >
            Sube al siguiente <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 uppercase italic">Nivel Profesional</span>
              <div className="absolute bottom-2 left-0 w-full h-4 bg-blue-100 -z-10 rounded-full opacity-60" />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-medium px-4"
          >
            Hubbax Inc no es solo una red social; es la arquitectura digital donde la élite profesional conecta, escala y domina su mercado. Diseñado por <span className="text-blue-600 font-bold">Publicity Visual</span> para quienes no aceptan menos que la excelencia.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32"
          >
            <Link href="/register" className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-400 active:scale-95 flex items-center justify-center gap-3 group">
              Crear Cuenta Elite <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-600 px-12 py-6 rounded-3xl font-black text-xl hover:bg-slate-50 transition-all active:scale-95">
              Acceso VIP
            </Link>
          </motion.div>

          {/* The "Masterpiece" Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="relative max-w-6xl mx-auto px-4"
          >
            {/* Decorative Floating Elements */}
            <div className="absolute -top-12 -left-12 hidden lg:block animate-bounce duration-1000">
              <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 rotate-[-10deg]">
                <div className="w-10 h-10 bg-green-500 rounded-full" />
                <div><p className="text-[10px] font-bold">Nueva Conexión</p><p className="text-xs text-slate-400">Elon Musk te siguió</p></div>
              </div>
            </div>
            <div className="absolute top-1/4 -right-16 hidden lg:block animate-pulse">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-2xl text-white flex items-center gap-3 rotate-[15deg]">
                <CheckCircle2 size={20} />
                <div><p className="text-xs font-black">Perfil Verificado</p><p className="text-[10px] opacity-80">Habilidad: AI Lead</p></div>
              </div>
            </div>

            {/* Mac Window Simulator */}
            <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-[0_100px_150px_-30px_rgba(0,0,0,0.4)] border-8 border-slate-800 overflow-hidden aspect-video">
              <div className="bg-white w-full h-full rounded-[2.2rem] overflow-hidden flex flex-col">
                {/* Mac Top Bar */}
                <div className="h-12 bg-slate-100 flex items-center px-6 justify-between border-b border-slate-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <div className="bg-white rounded-full px-4 py-1 text-[10px] font-bold text-slate-400 border border-slate-200 w-64 flex items-center justify-center gap-2">
                    <Search size={12} /> Hubbax Professional Search
                  </div>
                  <div className="flex gap-3">
                    <Bell size={16} className="text-slate-400" />
                    <MessageSquare size={16} className="text-slate-400" />
                    <div className="w-6 h-6 bg-slate-300 rounded-full" />
                  </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar */}
                  <div className="w-64 border-r border-slate-100 p-6 flex flex-col gap-4 bg-slate-50/50">
                    <SidebarItem icon={<Home size={18} />} label="Feed Global" active />
                    <SidebarItem icon={<Users size={18} />} label="Networking" />
                    <SidebarItem icon={<Briefcase size={18} />} label="Oportunidades" />
                    <SidebarItem icon={<LayoutGrid size={18} />} label="Marketplace" />
                    <div className="mt-auto pt-6 border-t border-slate-200">
                       <SidebarItem icon={<UserIcon size={18} />} label="Mi Perfil Elite" />
                       <SidebarItem icon={<LogOut size={18} />} label="Salir" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 p-8 bg-white overflow-y-auto space-y-8">
                    {/* Post Composer */}
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex gap-4 items-center shadow-sm">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd722//photo-1507003211169-0a1dd722?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full bg-slate-200" />
                      <div className="bg-white rounded-full px-6 py-3 text-sm text-slate-400 w-full border border-slate-200 italic">Comparte un hito profesional...</div>
                    </div>

                    {/* Premium Post */}
                    <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-100/50 space-y-6">
                      <div className="flex items-center gap-4">
                        <img src="https://images.unsplash.com/photo-1472099645785-5698a8429ed2?w=100&h=100&fit=crop" className="w-14 h-14 rounded-full ring-4 ring-blue-100" />
                        <div>
                          <div className="text-lg font-black text-slate-900">Alexander Thorne</div>
                          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">CEO @ Venture Global</div>
                        </div>
                      </div>
                      <div className="text-lg text-slate-600 leading-relaxed font-medium">
                        La transformación digital no es un proceso, es un estado mental. En Hubbax Inc hemos encontrado la herramienta perfecta para conectar el talento bruto con la visión empresarial. <span className="text-blue-600 font-bold italic">#Innovation #EliteNetworking</span>
                      </div>
                      <div className="h-64 bg-slate-100 rounded-3xl overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526036695d?w=800&h=400&fit=crop" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white font-bold text-xl">The Future of Work 2026</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div className="w-80 p-8 bg-slate-50/30 space-y-8">
                    <div className="font-black text-sm text-slate-400 uppercase tracking-widest mb-6">Sugerencias Elite</div>
                    {[
                      { name: "Sofia Loren", role: "AI Research Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29340?w=100&h=100&fit=crop" },
                      { name: "Marcus Wright", role: "Venture Partner", img: "https://images.unsplash.com/photo-1500648763945-b576bbd81e2b?w=100&h=100&fit=crop" },
                      { name: "Elena Gilbert", role: "Design Director", img: "https://images.unsplash.com/photo-1534528712073-51f31e14d2d2?w=100&h=100&fit=crop" },
                    ].map((user, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 hover:bg-white rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-slate-100 shadow-none hover:shadow-md">
                        <img src={user.img} className="w-12 h-12 rounded-full bg-slate-200" />
                        <div className="flex-1 overflow-hidden">
                          <div className="text-sm font-black truncate text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 truncate uppercase">{user.role}</div>
                        </div>
                        <Button size="sm" className="h-8 px-4 text-[10px] font-black bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200">Conectar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          <StatItem number="500K+" label="Usuarios Elite" />
          <StatItem number="120+" label="Países" />
          <StatItem number="15B" label="Inversiones" />
          <StatItem number="100%" label="Verificados" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter italic uppercase">Ingeniería de Éxito</h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium italic">
              No diseñamos una red social. Diseñamos la herramienta definitiva para el crecimiento profesional exponencial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <FeatureCard 
              icon={<Globe size={40} />} 
              title="Networking Orbital" 
              description="Conexiones instantáneas con los centros de poder económico del mundo. Sin fronteras, sin límites." 
            />
            <FeatureCard 
              icon={<ShieldCheck size={40} />} 
              title="Sello de Calidad" 
              description="Un sistema de verificación basado en méritos reales. Tu perfil es tu garantía de competencia profesional." 
            />
            <FeatureCard 
              icon={<Zap size={40} />} 
              title="Aceleración Cuántica" 
              description="Algoritmos de matching que predicen el siguiente paso de tu carrera antes de que tú mismo lo decidas." 
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="ecosystem" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="relative bg-blue-600 rounded-[4rem] p-20 text-white overflow-hidden shadow-3xl shadow-blue-500/40 group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 group-hover:bg-white/20 transition-all duration-700" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] uppercase italic">Deja de buscar. <br /> Empieza a dominar.</h2>
            <p className="text-blue-100 mb-12 text-xl leading-relaxed font-medium">
              Hubbax Inc es la respuesta a la saturación digital. Un santuario de valor donde el ruido desaparece y solo queda la excelencia profesional.
            </p>
            <Link href="/register" className="inline-flex items-center gap-3 bg-white text-blue-600 px-12 py-6 rounded-3xl font-black text-2xl hover:bg-blue-50 transition-all shadow-2xl active:scale-95">
              Obtener Acceso Elite <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-slate-200 bg-slate-50 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">H</div>
          <span className="font-black text-slate-900 text-2xl tracking-tighter italic uppercase">Hubbax Inc</span>
        </div>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Hubbax Inc by Publicity Visual. <br />
          The Standard of Professional Excellence.
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -20 }}
      className="bg-slate-50 p-16 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-3xl hover:shadow-blue-500/10 transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-all" />
      <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center mb-12 shadow-xl shadow-blue-600/30 group-hover:rotate-12 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight italic uppercase">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium text-lg">{description}</p>
    </motion.div>
  )
}

function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">{number}</span>
      <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">{label}</span>
    </div>
  )
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all'}`}>
      {icon}
      <span className="text-xs font-black uppercase tracking-tight">{label}</span>
    </div>
  )
}
