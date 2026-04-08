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
import { User, Mail, Briefcase, Lock } from "lucide-react"

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-none ring-1 ring-slate-200">
        <CardHeader className="space-y-1 text-center pt-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg shadow-blue-200">H</div>
          <CardTitle className="text-3xl font-black tracking-tighter text-slate-900">Únete a Hubbax Inc</CardTitle>
          <CardDescription className="text-slate-500 font-medium">
            By Publicity Visual - Construye tu legado profesional
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="full-name" className="text-slate-700 font-semibold">Nombre Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  id="full-name" 
                  placeholder="Ej. Juan Pérez" 
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-blue-500" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="nombre@empresa.com" 
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-blue-500" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="headline" className="text-slate-700 font-semibold">Titular Profesional</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  id="headline" 
                  placeholder="Ej. Senior Software Architect en Google" 
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-blue-500" 
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-slate-700 font-semibold">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-blue-500" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-8">
            <Button disabled={loading} className="w-full h-12 font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all">
              {loading ? "Procesando Registro..." : "Crear Perfil Profesional"}
            </Button>
            <div className="text-sm text-center text-slate-500">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-bold">
                Inicia sesión aquí
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
