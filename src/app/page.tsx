"use client"

import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Lock, Mail } from "lucide-react"
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
      toast.success("Acceso concedido")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error("El correo o la contraseña son incorrectos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4 py-10 font-sans overflow-hidden relative">
      
      {/* BACKGROUND SOCIAL ELEMENTS - Floating Avatars to feel like a "network" */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2], 
              scale: [0.8, 1.1, 0.8],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden ring-2 ring-red-500/20">
              <Image 
                src={`https://i.pravatar.cc/150?u=social${i}`} 
                alt="User" 
                width={64} 
                height={64} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Brand Side - With Social Visuals */}
        <div className="text-center lg:text-left space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-4"
          >
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-black text-3xl shadow-lg">H</div>
            <span className="text-6xl font-black tracking-tighter text-black uppercase italic">
              Hubbax <span className="text-red-600">Inc</span>
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-black text-black leading-tight tracking-tight">
              Hubbax te ayuda a <span className="text-red-600">conectar</span> con el mundo.
            </h1>
            <p className="text-2xl text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Únete a la red social donde la élite profesional comparte, crece y domina su industria.
            </p>
          </motion.div>

          {/* Social Proof Visual - Collage of success */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative w-full max-w-md mx-auto lg:mx-0 h-48 flex items-center justify-center"
          >
            <div className="absolute inset-0 flex gap-4 items-center justify-center">
               <div className="w-32 h-48 rounded-2xl rotate-[-10deg] overflow-hidden shadow-2xl border-4 border-white translate-y-4">
                  <Image src="https://images.unsplash.com/photo-1573496359140-626b5eos4?q=80&w=500" alt="Pro 1" width={128} height={192} className="w-full h-full object-cover" />
               </div>
               <div className="w-32 h-48 rounded-2xl rotate-[5deg] overflow-hidden shadow-2xl border-4 border-white -translate-y-4 z-10">
                  <Image src="https://images.unsplash.com/photo-1560250057-be37B6095070?q=80&w=500" alt="Pro 2" width={128} height={192} className="w-full h-full object-cover" />
               </div>
               <div className="w-32 h-48 rounded-2xl rotate-[15deg] overflow-hidden shadow-2xl border-4 border-white translate-y-2">
                  <Image src="https://images.unsplash.com/photo-1556761175-b413ef4b5392?q=80&w=500" alt="Pro 3" width={128} height={192} className="w-full h-full object-cover" />
               </div>
            </div>
            <div className="absolute z-20 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-xl border border-red-100 text-black font-black text-sm uppercase tracking-widest">
               +10k Líderes Activos
            </div>
          </motion.div>
        </div>

        {/* Login Card - Exact Facebook UX */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px] mx-auto"
        >
          <div className="bg-white fb-shadow border border-slate-200 rounded-lg p-4 space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  type="email" 
                  placeholder="Correo electrónico o teléfono" 
                  className="pl-10 h-12 bg-white border-slate-300 focus:ring-red-600 rounded-md transition-all" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  type="password" 
                  placeholder="Contraseña" 
                  className="pl-10 h-12 bg-white border-slate-300 focus:ring-red-600 rounded-md transition-all" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button 
                disabled={loading} 
                className="w-full h-12 font-bold text-xl bg-red-600 hover:bg-red-700 text-white shadow-md transition-all rounded-md"
              >
                {loading ? "Cargando..." : "Iniciar sesión"}
              </Button>
              <div className="text-center py-2">
                <Link href="/forgot" className="text-red-600 text-sm font-medium hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="border-t border-slate-200 pt-6 text-center">
                <Link 
                  href="/register" 
                  className="bg-black text-white px-6 py-3 rounded-md font-bold text-sm hover:bg-slate-800 transition-all inline-block"
                >
                  Crear cuenta nueva
                </Link>
              </div>
            </form>
          </div>
          
          <p className="text-center text-slate-500 text-sm mt-6 font-medium">
            <strong className="text-black">Súmate a Hubbax</strong>, la red profesional más exclusiva del mundo.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
