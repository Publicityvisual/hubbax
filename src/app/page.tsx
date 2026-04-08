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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Brand Side - Exact Facebook Copy Logic */}
        <div className="text-center lg:text-left space-y-4">
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
          
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-black leading-tight tracking-tight"
          >
            Hubbax te ayuda a <span className="text-red-600">conectar</span> y mantener el contacto con los líderes y visionarios que impulsan el mundo.
          </motion.h1>
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
                  className="bg-black text-white px-4 py-3 rounded-md font-bold text-sm hover:bg-slate-800 transition-all"
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
