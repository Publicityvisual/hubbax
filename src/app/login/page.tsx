"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Lock, Mail, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Bienvenido a Hubbax Inc")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error("Credenciales incorrectas. Intenta de nuevo.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-none ring-1 ring-slate-200 overflow-hidden rounded-[2rem]">
          <div className="h-2 bg-blue-600 w-full" />
          <CardHeader className="space-y-1 text-center pt-10 pb-6">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-lg shadow-blue-200">H</div>
            <CardTitle className="text-4xl font-black tracking-tighter text-slate-900">Hubbax Inc</CardTitle>
            <CardDescription className="text-slate-500 font-medium text-lg">
              Acceso a la Elite Profesional
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-6 px-10">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-slate-700 font-bold ml-1">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="nombre@empresa.com" 
                    className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-xl text-lg" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password" className="text-slate-700 font-bold ml-1">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-xl text-lg" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 px-10 pb-12">
              <Button disabled={loading} className="w-full h-14 font-black text-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 transition-all rounded-2xl group">
                {loading ? "Autenticando..." : (
                  <span className="flex items-center gap-2">
                    Ingresar al Sistema <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
              <div className="text-sm text-center text-slate-500 font-medium">
                ¿No eres parte de la red?{" "}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4 decoration-2">
                  Crea tu cuenta profesional
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
