"use client"

import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Lock, Mail, Heart, MessageCircle, Share2, Smile } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/dashboard")
    })
    return () => unsubscribe()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("¡Bienvenido de vuelta!")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error("Correo o contraseña incorrectos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT SIDE: The "Social Pulse" (The "Life" of the network) */}
        <div className="w-full lg:w-1/2 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-lg">H</div>
            <span className="text-5xl font-black tracking-tighter text-black uppercase italic">
              Hubbax <span className="text-red-600">Inc</span>
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-7xl font-black text-black leading ltight tracking-tight">
              Conecta con <span className="text-red-600">quienes</span> mueven el mundo.
            </h1>
            <p className="text-2xl text-slate-500 max-w-lg leading-relaxed font-medium">
              Súmate a la red social donde la élite profesional comparte sus éxitos y crea el futuro. <span className="text-black font-bold">Menos oficina, más networking.</span>
            </p>
          </motion.div>

          {/* THE SOCIAL PREVIEW - Mockup of actual social activity to avoid "Enterprise" look */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative w-full max-w-md"
          >
            {/* Floating Post 1 */}
            <div className="absolute top-0 left-0 bg-white fb-shadow rounded-2xl p-4 w-64 z-20 border border-slate-100 translate-x-[-20px]">
              <div className="flex items-center gap-2 mb-3">
                <Image src="https://i.pravatar.cc/150?u=1" width={32} height={32} className="rounded-full" alt="user" />
                <span className="text-xs font-bold">Alex Rivera</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">¡Increíble el nuevo proyecto de AI en Hubbax! 🚀</p>
              <div className="flex gap-3 text-slate-400">
                <Heart size={14} className="text-red-500 fill-red-500" /> 
                <MessageCircle size={14} /> 
                <Share2 size={14} />
              </div>
            </div>

            {/* Floating Post 2 */}
            <div className="absolute top-12 right-0 bg-white fb-shadow rounded-2xl p-4 w-64 z-30 border border-slate-100 translate-x-[20px]">
              <div className="flex items-center gap-2 mb-3">
                <Image src="https://i.pravatar.cc/150?u=2" width={32} height={32} className="rounded-full" alt="user" />
                <span className="text-xs font-bold">Sofia Chen</span>
              </div>
              <div className="w-full h-24 bg-slate-100 rounded-lg mb-3 overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1517048676731-da61134f75f0?q=80&w=500" width={200} height={100} className="w-full h-full object-cover" alt="event" />
              </div>
              <p className="text-xs text-slate-600 mb-3">Networking en el Summit Global 2026 🌍</p>
              <div className="flex gap-3 text-slate-400">
                <Heart size={14} /> 
                <MessageCircle size={14} /> 
                <Share2 size={14} />
              </div>
            </div>

            {/* Floating Post 3 */}
            <div className="absolute top-32 left-10 bg-white fb-shadow rounded-2xl p-4 w-64 z-10 border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Image src="https://i.pravatar.cc/150?u=3" width={32} height={32} className="rounded-full" alt="user" />
                <span className="text-xs font-bold">Marcus Volt</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">Buscando un Senior Dev para proyecto disruptivo. ¡DM!</p>
              <div className="flex gap-3 text-slate-400">
                <Heart size={14} /> 
                <MessageCircle size={14} /> 
                <Share2 size={14} />
              </div>
            </div>

            {/* Big decorative circle behind posts */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-red-100 rounded-full blur-3xl -z-10 opacity-60" />
          </motion.div>
        </div>

        {/* RIGHT SIDE: The "Social Entry" (Friendly but Elite) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px] mx-auto"
        >
          <div className="bg-white fb-shadow border border-slate-200 rounded-3xl p-8 space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h3 className="text-3xl font-black text-black">¡Hola de nuevo! 👋</h3>
              <p className="text-slate-400 text-sm font-medium">Entra a ver qué hay de nuevo en tu círculo.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <Input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-red-600 rounded-2xl transition-all" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <Input 
                  type="password" 
                  placeholder="Contraseña" 
                  className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-red-600 rounded-2xl transition-all" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button 
                disabled={loading} 
                className="w-full h-14 font-bold text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all rounded-2xl"
              >
                {loading ? "Entrando..." : "Iniciar sesión"}
              </Button>
              <div className="text-center py-2">
                <Link href="/forgot" className="text-red-600 text-sm font-bold hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="border-t border-slate-100 pt-6 text-center">
                <p className="text-slate-500 text-sm mb-4">¿No tienes una cuenta?</p>
                <Link 
                  href="/register" 
                  className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-slate-800 transition-all inline-block shadow-md"
                >
                  Crea tu perfil gratuito
                </Link>
              </div>
            </form>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <Image key={i} src={`https://i.pravatar.cc/150?u=${i+10}`} width={32} height={32} className="rounded-full border-2 border-white" alt="user" />
                ))}
             </div>
             <span className="text-slate-400 text-xs font-medium flex items-center">
                Únete a miles de profesionales
             </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
