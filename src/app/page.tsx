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
import { Lock, Mail, ChevronRight, Zap } from "lucide-react"
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
      toast.success("Bienvenido a Hubbax Inc")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error("Credenciales incorrectas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center px-6 py-12 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Branding (Facebook Style) */}
        <div className="text-center lg:text-left space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-8"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-4xl shadow-2xl shadow-blue-300">H</div>
            <span className="text-5xl font-black tracking-tighter text-blue-700 uppercase italic leading-none">Hubbax <span className="text-slate-400 font-light not-italic">Inc</span></span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 leading-tight"
          >
            Conecta con el <span className="text-blue-600">estándar de la excelencia</span> profesional.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Hubbax Inc es la infraestructura digital diseñada por <span className="text-blue-600 font-bold">Publicity Visual</span> para que los líderes, expertos y visionarios dominen su mercado.
          </motion.p>

          <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
            <Zap size={16} fill="currentColor" /> Sistema Elite V2.0 Activado
          </div>
        </div>

        {/* Right Side: Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[450px] mx-auto"
        >
          <Card className="shadow-2xl border-none ring-1 ring-slate-200 overflow-hidden rounded-[2.5rem] bg-white">
            <div className="h-2 bg-blue-600 w-full" />
            <CardHeader className="pt-10 pb-6 text-center">
              <CardTitle className="text-3xl font-black tracking-tighter text-slate-900">Acceso VIP</CardTitle>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Inicia sesión en tu red profesional</div>
            </CardHeader>
            
            <form onSubmit={handleLogin}>
              <CardContent className="grid gap-5 px-10">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-700 font-bold ml-1 text-xs uppercase">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="ejemplo@empresa.com" 
                      className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-slate-700 font-bold ml-1 text-xs uppercase">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-6 px-10 pb-10">
                <Button disabled={loading} className="w-full h-14 font-black text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 transition-all rounded-2xl group">
                  {loading ? "Autenticando..." : (
                    <span className="flex items-center gap-2">
                      Ingresar al Sistema <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
                <div className="text-xs text-center text-slate-400 font-medium">
                  ¿Aún no eres parte de la élite?{" "}
                  <Link href="/register" className="text-blue-600 hover:underline font-bold">
                    Crea tu cuenta aquí
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
