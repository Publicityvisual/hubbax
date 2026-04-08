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
import { Lock, Mail } from "lucide-react"

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-2xl border-none ring-1 ring-slate-200">
        <CardHeader className="space-y-1 text-center pt-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg shadow-blue-200">H</div>
          <CardTitle className="text-3xl font-black tracking-tighter text-slate-900">Hubbax Inc</CardTitle>
          <CardDescription className="text-slate-500 font-medium">
            By Publicity Visual - El acceso a la élite profesional
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-5">
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
              {loading ? "Autenticando..." : "Ingresar al Sistema"}
            </Button>
            <div className="text-sm text-center text-slate-500">
              ¿No eres parte de la red?{" "}
              <Link href="/register" className="text-blue-600 hover:underline font-bold">
                Crea tu cuenta profesional
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
