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

      toast.success("Cuenta profesional creada con éxito")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error(err.message || "Error al crear la cuenta")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-none ring-1 ring-slate-200 overflow-hidden rounded-[2rem]">
          <div className="h-2 bg-blue-600 w-full" />
          <CardHeader className="space-y-1 text-center pt-10 pb-6">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-lg shadow-blue-200">H</div>
            <CardTitle className="text-4xl font-black tracking-tighter text-slate-900">Únete a Hubbax Inc</CardTitle>
            <CardDescription className="text-slate-500 font-medium text-lg">
              Construye tu legado profesional
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="grid gap-6 px-10">
              <div className="grid gap-3">
                <Label htmlFor="full-name" className="text-slate-700 font-bold ml-1">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <Input 
                    id="full-name" 
                    placeholder="Ej. Juan Pérez" 
                    className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-xl text-lg" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                  />
                </div>
              </div>
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
                <Label htmlFor="headline" className="text-slate-700 font-bold ml-1">Titular Profesional</Label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <Input 
                    id="headline" 
                    placeholder="Ej. Senior Software Architect en Google" 
                    className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-xl text-lg" 
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
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
                {loading ? "Procesando Registro..." : (
                  <span className="flex items-center gap-2">
                    Crear Perfil Profesional <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
              <div className="text-sm text-center text-slate-500 font-medium">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4 decoration-2">
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
