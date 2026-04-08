"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Globe, ShieldCheck, Zap, Building2, Users, Briefcase } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">H</div>
          <span className="text-2xl font-bold tracking-tighter text-blue-700">Hubbax Inc</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Características</Link>
          <Link href="#ecosystem" className="hover:text-blue-600 transition-colors">Ecosistema</Link>
          <Link href="/login" className="text-slate-900 hover:text-blue-600 transition-colors">Iniciar Sesión</Link>
          <Link href="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200 font-semibold">Únete Gratis</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-24 pb-32 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold mb-8 animate-fade-in">
          <Zap size={14} fill="currentColor" /> <span>EL FUTURO DEL NETWORKING PROFESIONAL</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[1.1]">
          Lidera tu carrera en <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">Hubbax Inc</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed">
          By Publicity Visual. No es solo una red social, es un ecosistema de crecimiento. Conecta con la élite profesional, gestiona tu marca personal y accede a oportunidades globales en un entorno diseñado para la excelencia.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link href="/register" className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-300 flex items-center justify-center gap-2 group">
            Comenzar Ahora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="w-full sm:w-auto bg-white border-2 border-slate-100 text-slate-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
            Mi Cuenta
          </Link>
        </div>
        
        {/* Premium Mockup Component */}
        <div className="mt-24 relative max-w-6xl mx-auto px-4">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-20" />
          <div className="relative bg-slate-900 rounded-3xl p-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-800">
            <div className="bg-slate-800 rounded-2xl aspect-video flex items-center justify-center text-slate-500 italic font-medium">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 animate-pulse">
                  <Building2 size={32} />
                </div>
                Hubbax Professional Interface Preview
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - High End */}
      <section id="features" className="bg-slate-50 py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Tecnología de Clase Mundial</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Hemos fusionado la funcionalidad masiva de las mejores redes sociales con la elegancia de un entorno corporativo de lujo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Globe size={28} />} 
              title="Red Global Elite" 
              description="Conecta con CEOs, fundadores y expertos de todo el mundo. Rompe las barreras geográficas con la red más selecta." 
            />
            <FeatureCard 
              icon={<ShieldCheck size={28} />} 
              title="Identidad Verificada" 
              description="Tus logros, certificaciones y trayectoria validadas. Genera confianza inmediata en el mercado la más alta calidad." 
            />
            <FeatureCard 
              icon={<Zap size={28} />} 
              title="Crecimiento Acelerado" 
              description="Algoritmos de match de talento que conectan tus habilidades con la oportunidad perfecta en tiempo real." 
            />
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Más que una red, <br /> la infraestructura de tu éxito.
            </h2>
            <div className="space-y-6">
              <EcoItem icon={<Users />} title="Comunidades de Industria" desc="Grupos especializados donde el conocimiento fluye entre los mejores." />
              <EcoItem icon={<Briefcase />} title="Marketplace de Talento" desc="Vende tus servicios profesionales o encuentra el perfil ideal para tu empresa." />
              <EcoItem icon={<Building2 />} title="Páginas Corporativas" desc="Construye la presencia digital de tu marca con herramientas de administración avanzadas." />
            </div>
          </div>
          <div className="relative bg-blue-600 rounded-3xl p-12 text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <h3 className="text-3xl font-bold mb-6 relative z-10">Únete a la Revolución</h3>
            <p className="text-blue-100 mb-10 relative z-10 leading-relaxed">
              Hubbax Inc es la respuesta a la saturación de las redes sociales actuales. Un lugar donde el ruido desaparece y el valor profesional prevalece.
            </p>
            <Link href="/register" className="relative z-10 inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-lg">
              Crear Cuenta Gratis <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">H</div>
          <span className="font-bold text-slate-900">Hubbax Inc</span>
        </div>
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Hubbax Inc by Publicity Visual. <br />
          Diseñado para la excelencia profesional.
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
    </div>
  )
}

function EcoItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer">
      <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h4>
        <p className="text-slate-500 text-sm line-clamp-2">{desc}</p>
      </div>
    </div>
  )
}
