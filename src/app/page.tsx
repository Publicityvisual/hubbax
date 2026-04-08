"use client"

import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Lock, Mail, ChevronRight } from "lucide-react"
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
      toast.error("Credenciales incorrectas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Brand Side - Facebook style messaging */}
        <div className="text-center lg:text-left space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-8"
          >
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-black text-3xl shadow-lg">H</div>
            <span className="text-5xl font-black tracking-tighter text-black uppercase italic">
              Hubbax <span className="text-red-600">Inc</span>
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-black text-black leading-tight tracking-tight"
          >
            Conecta con la <span className="text-red-600">élite</span> profesional.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Súmate a la infraestructura digital diseñada por <span className="text-black font-bold">Publicity Visual</span> para líderes y visionarios.
          </motion.p>
        </div>

        {/* Login Card - High Fidelity Professional */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px] mx-auto"
        >
          <Card className="fb-shadow border-none rounded-[1rem] bg-white overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      type="email" 
                      placeholder="Correo electrónico o teléfono" 
                      className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-red-600 rounded-md transition-all" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      type="password" 
                      placeholder="Contraseña" 
                      className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-red-600 rounded-md transition-all" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <Button 
                  disabled={loading} 
                  className="w-full h-12 font-bold text-lg bg-red-600 hover:bg-red-700 text-white shadow-md transition-all rounded-md"
                >
                  {loading ? "Validando..." : "Iniciar sesión"}
                </Button>
                <div className="text-center py-2">
                  <Link href="/forgot" className="text-red-600 text-sm font-medium hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
              </form>
              
              <div className="border-t border-slate-200 pt-6 flex justify-center">
                <Link 
                  href="/register" 
                  className="bg-black text-white px-6 py-3 rounded-md font-bold text-sm hover:bg-slate-800 transition-all shadow-sm"
                >
                  Crear cuenta nueva
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <p className="text-center text-slate-500 text-sm mt-8 font-medium">
            <strong>Súmate a Hubbax</strong>, la red profesional más exclusiva del mundo.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
