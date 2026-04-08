"use client"

import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Lock, Mail, CheckCircle2, Users, Zap, Globe, ShieldCheck, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

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
    <div className="min-h-screen bg-[#f0f2f5] font-sans overflow-x-hidden">
      
      {/* HERO SECTION - WoWonder Welcome Style */}
      <section className="relative bg-white border-b border-slate-200 overflow-hidden">
        {/* Background Abstract Social Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: The "Welcome" Pitch */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-black text-3xl shadow-lg border-2 border-red-600">H</div>
              <span className="text-5xl font-black tracking-tighter text-black uppercase italic">
                Hubbax <span className="text-red-600">Inc</span>
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-8xl font-black text-black leading-[0.9] tracking-tighter">
                Bienvenido al <span className="text-red-600">estándar</span> de la excelencia.
              </h1>
              <p className="text-2xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                La red social diseñada exclusivamente para la élite profesional. Conecta, escala y domina tu industria con la infraestructura de <span className="text-black font-bold">Publicity Visual</span>.
              </p>
            </motion.div>

            {/* Feature Pills - WoWonder style "What we offer" */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm font-bold text-slate-700">
                <CheckCircle2 className="text-red-600" size={16} /> Networking de Poder
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm font-bold text-slate-700">
                <CheckCircle2 className="text-red-600" size={16} /> Grupos Elite
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm font-bold text-slate-700">
                <CheckCircle2 className="text-red-600" size={16} /> Visibilidad Global
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white rounded-full font-black text-lg shadow-xl shadow-red-200 transition-all group overflow-hidden relative">
                <span className="relative z-10 flex items-center gap-2">
                  Empezar Ahora <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Link href="/register" className="text-slate-500 font-bold hover:text-black transition-colors text-sm underline underline-offset-4">
                Aprende más sobre la membresía
              </Link>
            </div>
          </div>

          {/* Right Column: The "Facebook-Style" Access Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[420px] mx-auto relative"
          >
            {/* Background Glow for the card */}
            <div className="absolute inset-0 bg-red-600/10 blur-3xl rounded-full" />
            
            <div className="relative bg-white fb-shadow border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-2xl font-black text-black">Acceso al Sistema</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Inicia sesión en tu red profesional</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
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
                <Button 
                  disabled={loading} 
                  className="w-full h-12 font-bold text-lg bg-red-600 hover:bg-red-700 text-white shadow-md transition-all rounded-md"
                >
                  {loading ? "Cargando..." : "Iniciar sesión"}
                </Button>
                <div className="text-center py-2">
                  <Link href="/forgot" className="text-red-600 text-sm font-medium hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="border-t border-slate-200 pt-6 text-center">
                  <Link 
                    href="/register" 
                    className="bg-black text-white px-6 py-3 rounded-md font-bold text-sm hover:bg-slate-800 transition-all inline-block"
                  >
                    Crea tu cuenta nueva
                  </Link>
                </div>
              </form>
            </div>
            
            <p className="text-center text-slate-400 text-xs mt-6 font-medium">
              <strong className="text-slate-600">Hubbax Inc</strong> &copy; 2026. Todos los derechos reservados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION - Pure WoWonder Welcome Influence */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-black tracking-tight">¿Por qué elegir la <span className="text-red-600">Infraestructura Hubbax</span>?</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            No somos una red social más. Somos el ecosistema donde el prestigio se convierte en oportunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Users className="text-red-600" />} 
            title="Networking de Élite" 
            description="Conecta con CEOs, fundadores y expertos verificados. Olvida el ruido, accede directamente a quienes toman la decisión." 
          />
          <FeatureCard 
            icon={<Zap className="text-red-600" />} 
            title="Crecimiento Acelerado" 
            description="Sistemas de matching avanzado que te conectan con las oportunidades que encajan exactamente con tu trayectoria profesional." 
          />
          <FeatureCard 
            icon={<Globe className="text-red-600" />} 
            title="Presencia Global" 
            description="Haz que tu marca personal sea reconocida en cualquier mercado. El estándar de oro de la visibilidad profesional." 
          />
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-black text-white py-16 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 text-red-500 font-black uppercase tracking-widest text-xs">
              <ShieldCheck size={16} /> Seguridad de Grado Militar
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Tu prestigio es nuestro <br /> activo más valioso.
            </h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-center">
                <div className="text-4xl font-black text-white">+100K</div>
                <div className="text-slate-400 text-sm font-bold">Líderes</div>
             </div>
             <div className="w-px h-12 bg-slate-700" />
             <div className="text-center">
                <div className="text-4xl font-black text-white">24/7</div>
                <div className="text-slate-400 text-sm font-bold">Soporte VIP</div>
             </div>
             <div className="w-px h-12 bg-slate-700" />
             <div className="text-center">
                <div className="text-4xl font-black text-white">100%</div>
                <div className="text-slate-400 text-sm font-bold">Privado</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
        <div className="group-hover:text-white transition-colors">{icon}</div>
      </div>
      <h3 className="text-xl font-black text-black mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  )
}
