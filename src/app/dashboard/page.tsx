"use client"

import { useState, useEffect } from "react"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Home, Users, Briefcase, Bell, MessageSquare, LogOut, Search, 
  User as UserIcon, LayoutGrid, Image as ImageIcon, Send, 
  MoreHorizontal, ThumbsUp, MessageCircle, PlusCircle, Settings,
  Globe, ShieldCheck, Zap, Star
} from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/")
      } else {
        setUser(currentUser)
        // Fetch professional profile
        try {
          const docRef = doc(db, "users", currentUser.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setProfile(docSnap.data())
          }
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setPosts(postsData)
    })
    return () => unsubscribe()
  }, [user])

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return
    try {
      await addDoc(collection(db, "posts"), {
        text: newPost,
        uid: user.uid,
        userName: profile?.fullName || "Elite Professional",
        headline: profile?.headline || "Member",
        createdAt: serverTimestamp(),
        likes: 0,
        comments: 0
      })
      setNewPost("")
      toast.success("Publicación compartida")
    } catch (err) {
      toast.error("Error al publicar")
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/")
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-red-600 rounded-full animate-spin shadow-lg shadow-red-200" />
        <span className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Cargando Entorno Elite...</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#1c1e21] font-sans">
      {/* TOP NAV - Facebook Modern Style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-200 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md border-2 border-red-600">H</div>
            <span className="text-xl font-black tracking-tighter text-black uppercase italic hidden sm:block">Hubbax <span className="text-red-600">Inc</span></span>
          </div>
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Buscar profesionales..." 
              className="pl-10 bg-slate-100 border-none rounded-full h-9 text-sm focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 mr-4">
            <NavBtn icon={<Home size={22} />} active />
            <NavBtn icon={<Users size={22} />} />
            <NavBtn icon={<Briefcase size={22} />} />
            <NavBtn icon={<LayoutGrid size={22} />} />
          </div>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 text-slate-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 text-slate-600">
            <MessageSquare size={20} />
          </Button>
          <div className="w-9 h-9 ml-2 cursor-pointer ring-2 ring-offset-2 ring-red-600 rounded-full overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage src={profile?.avatar || `https://i.pravatar.cc/150?u=${user?.uid}`} />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="pt-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5">
          <div className="premium-card p-5">
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="w-12 h-12 ring-2 ring-red-50">
                <AvatarImage src={profile?.avatar || `https://i.pravatar.cc/150?u=${user?.uid}`} />
                <AvatarFallback>H</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <div className="font-bold text-black truncate">{profile?.fullName || "Usuario Elite"}</div>
                <div className="text-[10px] font-bold text-red-600 uppercase tracking-tight">VIP Member</div>
              </div>
            </div>
            <div className="space-y-1 border-t border-slate-100 pt-4">
              <SidebarLink icon={<Home size={18} />} label="Feed Global" active />
              <SidebarLink icon={<Users size={18} />} label="Networking" />
              <SidebarLink icon={<Briefcase size={18} />} label="Oportunidades" />
              <SidebarLink icon={<LayoutGrid size={18} />} label="Marketplace Pro" />
              <SidebarLink icon={<Settings size={18} />} label="Ajustes" />
            </div>
          </div>
          
          <div className="premium-card p-5">
            <div className="font-black text-slate-400 text-xs uppercase tracking-widest mb-4 px-2">Módulos Hubbax</div>
            <div className="space-y-3">
              <ModuleItem icon={<Globe size={16} />} label="Grupos Elite" />
              <ModuleItem icon={<ShieldCheck size={16} />} label="Verificación" />
              <ModuleItem icon={<Zap size={16} />} label="Billetera Pro" />
            </div>
          </div>

          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start gap-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl py-6 font-bold"
          >
            <LogOut size={20} /> <span>Cerrar Sesión</span>
          </Button>
        </aside>

        {/* CENTER FEED */}
        <main className="lg:col-span-6 space-y-6 pb-12">
          {/* Post Composer */}
          <Card className="premium-card border-none shadow-sm ring-1 ring-slate-200 bg-white">
            <CardContent className="p-4">
              <form onSubmit={handlePost} className="flex gap-3">
                <Avatar className="w-11 h-11 shrink-0 ring-2 ring-slate-100">
                  <AvatarImage src={profile?.avatar || `https://i.pravatar.cc/150?u=${user?.uid}`} />
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex flex-col gap-3">
                  <Input 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder={`¿Qué hay de nuevo, ${profile?.fullName.split(" ")[0] || "Elite"}?`} 
                    className="border-none bg-slate-100 rounded-full h-10 pl-4 focus:ring-2 focus:ring-red-600 text-sm" 
                  />
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="rounded-full h-8 px-3 gap-2 text-slate-500 hover:bg-slate-100 text-xs font-bold transition-all">
                        <ImageIcon size={16} className="text-red-500" /> Multimedia
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full h-8 px-3 gap-2 text-slate-500 hover:bg-slate-100 text-xs font-bold transition-all">
                        <PlusCircle size={16} className="text-green-500" /> Empleo
                      </Button>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={!newPost.trim()}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 h-8 text-xs font-black shadow-md shadow-red-200 transition-transform active:scale-95"
                    >
                      Publicar
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Real-time Feed */}
          <div className="space-y-5">
            <AnimatePresence>
              {posts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-400 font-medium italic"
                >
                  El feed elite está vacío. Comienza el networking...
                </motion.div>
              ) : (
                posts.map((post) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="premium-card border-none shadow-sm ring-1 ring-slate-200 bg-white overflow-hidden">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-11 h-11 ring-2 ring-red-50">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${post.uid}`} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                              <div className="font-bold text-black hover:underline cursor-pointer truncate">{post.userName || "Elite Professional"}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase">
                                {post.createdAt ? new Date(post.createdAt.toDate()).toLocaleString() : "Recién publicado"}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-slate-400 rounded-full hover:bg-slate-100">
                            <MoreHorizontal size={18} />
                          </Button>
                        </div>
                        <div className="text-slate-700 leading-relaxed font-medium text-[15px]">
                          {post.text}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex gap-3">
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-600 gap-2 rounded-full h-8 px-4 font-bold text-xs transition-all">
                              <ThumbsUp size={16} /> Like
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-600 gap-2 rounded-full h-8 px-4 font-bold text-xs transition-all">
                              <MessageCircle size={16} /> Comentar
                            </Button>
                          </div>
                          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                            Sincronizado Hubbax
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="premium-card p-5">
            <div className="font-black text-black text-xs uppercase tracking-widest mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2"><Users size={14} /> Sugerencias</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center justify-between group cursor-pointer p-1 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Avatar className="w-9 h-9 ring-1 ring-slate-200">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=elite${i}`} />
                      <AvatarFallback>E</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold truncate text-black group-hover:text-red-600 transition-colors">Elite Member {i}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase truncate">Senior Architect</div>
                    </div>
                  </div>
                  <Button size="sm" className="h-6 px-3 text-[10px] font-black bg-red-600 hover:bg-red-700 text-white rounded-full shadow-sm">
                    Sugerido
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-600 to-black rounded-2xl p-6 text-white shadow-xl shadow-red-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 font-black text-lg italic uppercase leading-tight">
                <Star size={20} fill="white" /> Hubbax Premium
              </div>
              <p className="text-red-100 text-[11px] font-medium leading-relaxed">
                Accede a herramientas de matching avanzado y visibilidad global en el mercado la élite profesional.
              </p>
              <Button className="w-full bg-white text-red-600 hover:bg-slate-100 font-black rounded-xl py-5 text-xs uppercase tracking-widest shadow-lg">
                Subir de Nivel
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function NavBtn({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <div className={`p-2 rounded-lg cursor-pointer transition-all ${active ? 'bg-red-50 text-red-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-black'}`}>
      {icon}
    </div>
  )
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-red-50 text-red-600 shadow-sm font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-black font-medium'}`}>
      <div className={`transition-colors ${active ? 'text-red-600' : 'text-slate-400 group-hover:text-black'}`}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  )
}

function ModuleItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-xl cursor-pointer transition-all group">
      <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-700 group-hover:text-red-600 transition-colors">{label}</span>
    </div>
  )
}
