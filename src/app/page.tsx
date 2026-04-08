"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">H</div>
            <span className="text-2xl font-black tracking-tighter text-blue-700 uppercase italic">Hubbax <span className="text-slate-400 font-light not-italic">Inc</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <Link href="/login" className="text-slate-900 hover:text-blue-600 transition-all">Iniciar Sesión</Link>
            <Link href="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-95">
              Únete Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimalist Luxury */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black mb-8 border border-blue-100"
          >
            <Zap size={14} fill="currentColor" /> <span className="uppercase tracking-widest">SISTEMA HUBBAX V2.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-10 leading-[0.9]"
          >
            La nueva era del <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 uppercase italic">Éxito Profesional</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
          >
            By Publicity Visual. No es una red social, es la infraestructura digital donde la élite profesional conecta y domina su mercado.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/register" className="w-full sm:w-auto bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 group active:scale-95">
              Acceso Elite <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all active:scale-95">
              Mi Cuenta
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-slate-100 text-center bg-slate-50/50">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">H</div>
          <span className="font-black text-slate-900 text-xl tracking-tighter italic uppercase">Hubbax Inc</span>
        </div>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Hubbax Inc by Publicity Visual.
        </p>
      </footer>
    </div>
  )
}
