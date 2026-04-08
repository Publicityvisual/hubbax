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
import { Lock, Mail, ChevronRight, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard")
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Bienvenido al Círculo Elite")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error("Acceso denegado: Credenciales inválidas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12 font-sans overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Branding (Facebook’s Modern Storytelling) */}
        <div className="text-center lg:text-left space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-12"
          >
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-black text-4xl shadow-2xl border-2 border-red-600">H</div>
            <span className="text-6xl font-black tracking-tighter text-black uppercase italic leading-none">
              Hubbax <span className="text-red-600">Inc</span>
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-black leading-[1.1] tracking-tight"
          >
            Hubbax te <span className="text-red-600">conecta</span> con la élite profesional.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium italic"
          >
            La red donde el talento excepcional se encuentra con la oportunidad global. Diseñado por <span className="text-black font-bold not-italic">Publicity Visual</span>.
          </motion.p>

          <div className="flex items-center justify-center lg:justify-start gap-3 text-black font-black text-sm uppercase tracking-widest opacity-60">
            <ShieldCheck size={20} className="text-red-600" /> Infraestructura de Seguridad Elite V2.0
          </div>
        </div>

        {/* Right Side: High-Contrast Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[480px] mx-auto"
        >
          <Card className="wow-luxury-shadow border-none overflow-hidden rounded-[2rem] bg-white ring-1 ring-slate-200">
            <div className="h-3 bg-red-600 w-full" />
            <CardHeader className="pt-12 pb-8 text-center">
              <CardTitle className="text-4xl font-black tracking-tighter text-black">Iniciar Sesión</CardTitle>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Acceso restringido a miembros Elite</div>
            </CardHeader>
            
            <form onSubmit={handleLogin}>
              <CardContent className="grid gap-6 px-12">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-900 font-black ml-1 text-[11px] uppercase">Cuenta de Profesional</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="correo@elite.com" 
                      className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-red-600 rounded-2xl text-base transition-all" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-slate-900 font-black ml-1 text-[11px] uppercase">Clave de Acceso</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-red-600 rounded-2xl text-base transition-all" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-8 px-12 pb-12">
                <Button disabled={loading} className="w-full h-16 font-black text-xl bg-red-600 hover:bg-black text-white shadow-2xl shadow-red-200 transition-all rounded-2xl group">
                  {loading ? "Validando Token..." : (
                    <span className="flex items-center gap-3">
                      Entrar al Sistema <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </span>
                  )}
                </Button>
                <div className="text-sm text-center text-slate-500 font-medium">
                  ¿No tienes acceso?{" "}
                  <Link href="/register" className="text-red-600 hover:text-black transition-colors font-black underline-offset-4 hover:underline">
                    Solicita tu membresía aquí
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
