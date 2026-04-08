"use client"

import { useState } from "react"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { User, Mail, Lock, Briefcase, Globe, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    headline: "",
    industry: ""
  })
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const user = userCredential.user
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: form.fullName,
        email: form.email,
        headline: form.headline,
        industry: form.industry,
        createdAt: new Date(),
        role: "member",
        avatar: `https://i.pravatar.cc/150?u=${user.uid}`
      })
      
      toast.success("Cuenta creada con éxito")
      router.push("/dashboard")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="text-center lg:text-left space-y-8">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-black text-3xl shadow-lg">H</div>
            <span className="text-5xl font-black tracking-tighter text-black uppercase italic">
              Hubbax <span className="text-red-600">Inc</span>
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-black leading-tight tracking-tight">
            Crea una <span className="text-red-600">cuenta</span> profesional.
          </h1>
          
          <p className="text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Súmate a la infraestructura más prestigiosa para conectar con los líderes de la industria global.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[500px] mx-auto"
        >
          <Card className="fb-shadow border-none rounded-lg bg-white overflow-hidden">
            <div className="h-2 bg-red-600 w-full" />
            <CardHeader className="pt-10 pb-6 text-center">
              <CardTitle className="text-3xl font-black tracking-tighter text-black">Crea una cuenta</CardTitle>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Es rápido y sencillo</div>
            </CardHeader>
            
            <form onSubmit={handleRegister}>
              <CardContent className="grid gap-6 px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-900 font-bold text-xs uppercase">Nombre</Label>
                    <Input 
                      placeholder="Nombre" 
                      className="h-12 bg-slate-50 border-slate-200 rounded-md" 
                      value={form.fullName}
                      onChange={(e) => setForm({...form, fullName: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-900 font-bold text-xs uppercase">Industria</Label>
                    <Input 
                      placeholder="Industria" 
                      className="h-12 bg-slate-50 border-slate-200 rounded-md" 
                      value={form.industry}
                      onChange={(e) => setForm({...form, industry: e.target.value})}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-900 font-bold text-xs uppercase">Headline Profesional</Label>
                  <Input 
                    placeholder="Ej: Senior Architect @ GlobalCorp" 
                    className="h-12 bg-slate-50 border-slate-200 rounded-md" 
                    value={form.headline}
                    onChange={(e) => setForm({...form, headline: e.target.value})}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-900 font-bold text-xs uppercase">Email</Label>
                  <Input 
                    type="email" 
                    placeholder="correo@ejemplo.com" 
                    className="h-12 bg-slate-50 border-slate-200 rounded-md" 
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-900 font-bold text-xs uppercase">Contraseña</Label>
                  <Input 
                    type="password" 
                    placeholder="Nueva contraseña" 
                    className="h-12 bg-slate-50 border-slate-200 rounded-md" 
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-6 px-8 pb-10">
                <Button disabled={loading} className="w-full h-14 font-black text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all rounded-md group">
                  {loading ? "Sincronizando..." : (
                    <span className="flex items-center gap-3">
                      Registrarse <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
                <div className="text-sm text-center text-slate-500 font-medium">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/" className="text-red-600 hover:text-black transition-colors font-bold underline">
                    Inicia sesión aquí
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
