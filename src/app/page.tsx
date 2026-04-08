"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">H</div>
            <span className="text-2xl font-black tracking-tighter text-blue-700 uppercase italic">Hubbax <span className="text-slate-400 font-light not-italic">Inc</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600">Iniciar Sesión</Link>
            <Link href="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95">
              Únete Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-black mb-10 border border-blue-200 uppercase tracking-widest"
          >
            <Sparkles size={14} /> Diseño Elite V2.0 Activado
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 mb-10 leading-[0.8]"
          >
            Sube al siguiente <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 uppercase italic">Nivel Profesional</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
          >
            By Publicity Visual. La infraestructura digital donde la élite profesional conecta y domina su mercado. No es una red social, la vanguardia del éxito.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/register" className="w-full sm:w-auto bg-blue-600 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-2xl shadow-blue-300 flex items-center justify-center gap-3 transition-all active:scale-95">
              Acceso Elite <ArrowRight size={24} />
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-600 px-12 py-6 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all active:scale-95">
              Mi Cuenta
            </Link>
          </div>

          {/* DESIGN VERIFICATION BOX - CRITICAL */}
          <div className="mt-32 p-12 bg-white rounded-[3rem] shadow-2xl border-4 border-blue-500 ring-8 ring-blue-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Sello de Diseño Hubbax</span>
             </div>
             <h2 className="text-4xl font-black text-slate-900 mb-6 text-center">🎨 Verificación de Diseño</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 flex flex-col items-center gap-4 shadow-sm">
                   <div className="w-16 h-16 bg-blue-600 rounded-full shadow-xl shadow-blue-300" />
                   <span className="text-sm font-bold text-blue-700 uppercase">Color Primario</span>
                </div>
                <div className="p-6 bg-slate-100 rounded-2xl border-2 border-slate-200 flex flex-col items-center gap-4 shadow-sm">
                   <div className="w-16 h-16 bg-slate-900 rounded-full shadow-xl shadow-slate-300" />
                   <span className="text-sm font-bold text-slate-600 uppercase">Contraste Elite</span>
                </div>
                <div className="p-6 bg-cyan-50 rounded-2xl border-2 border-cyan-200 flex flex-col items-center gap-4 shadow-sm la</div>
                   <div className="w-16 h-16 bg-cyan-500 rounded-full shadow-xl shadow-cyan-300" />
                   <span className="text-sm font-bold text-cyan-700 uppercase">Sombra Dinámica</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-900 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black uppercase">H</div>
          <span className="text-xl font-black tracking-tighter italic uppercase">Hubbax Inc</span>
        </div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Hubbax Inc by Publicity Visual.
        </p>
      </footer>
    </div>
  )
}
