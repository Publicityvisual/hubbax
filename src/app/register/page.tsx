"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { User, Mail, Briefcase, Lock, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [headline, setHeadline] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        headline,
        email,
        createdAt: new Date().toISOString(),
        role: "user",
        connections: [],
        bio: ""
      })

      toast.success("Perfil profesional creado")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error(err.message || "Error al crear la cuenta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5] px-4 py-12 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-[400px]"
      >
        <Card className="shadow-xl border-none ring-1 ring-slate-200 overflow-hidden rounded-[2rem] bg-white">
          <div className="h-2 bg-blue-600 w-full" />
          <CardHeader className="space-y-1 text-center pt-10 pb-6">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-lg shadow-blue-200">H</div>
            <CardTitle className="text-3xl font-black tracking-tighter text-slate-900">Únete a Hubbax Inc</CardTitle>
            <CardDescription className="text-slate-500 font-medium text-sm">
              By Publicity Visual - El estándar del éxito
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="grid gap-5 px-10">
              <div className="grid gap-2">
                <Label htmlFor="full-name" className="text-slate-700 font-bold ml-1 text-xs uppercase tracking-wider">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="full-name" 
                    placeholder="Ej. Juan Pérez" 
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-700 font-bold ml-1 text-xs uppercase tracking-wider">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="nombre@empresa.com" 
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="headline" className="text-slate-700 font-bold ml-1 text-xs uppercase tracking-wider">Titular Profesional</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="headline" 
                    placeholder="Ej. CEO en Hubbax Inc" 
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl" 
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-slate-700 font-bold ml-1 text-xs uppercase tracking-wider">Contraseña</Label>
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
            <CardFooter className="flex flex-col gap-5 px-10 pb-10">
              <Button disabled={loading} className="w-full h-12 font-black text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all rounded-xl group">
                {loading ? "Procesando..." : (
                  <span className="flex items-center gap-2">
                    Crear Cuenta <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
              <div className="text-xs text-center text-slate-400 font-medium">
                ¿Ya eres miembro?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-bold">
                  Inicia sesión aquí
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
