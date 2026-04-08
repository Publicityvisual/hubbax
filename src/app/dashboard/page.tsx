"use client"

import { useState, useEffect } from "react"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Home, 
  Users, 
  Briefcase, 
  Bell, 
  MessageSquare, 
  LogOut, 
  Search, 
  User as UserIcon, 
  LayoutGrid,
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle
} from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login")
      } else {
        setUser(currentUser)
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
        createdAt: serverTimestamp(),
        likes: 0,
        comments: 0,
        userFullName: "Professional Elite", // Temporary
      })
      setNewPost("")
      toast.success("Publicado con éxito")
    } catch (err) {
      toast.error("Error al publicar")
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/")
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Cargando Hubbax Inc...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans">
      {/* Navigation - Facebook Style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)] h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-inner">H</div>
          <div className="relative hidden sm:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Buscar en Hubbax..." 
              className="pl-10 bg-slate-100 border-none focus:ring-2 focus:ring-blue-500 rounded-full h-9 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 px-2">
             <NavIcon icon={<Home size={22} />} active />
             <NavIcon icon={<Users size={22} />} />
             <NavIcon icon={<Briefcase size={22} />} />
             <NavIcon icon={<LayoutGrid size={22} />} />
          </div>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-slate-100 text-slate-600">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 text-slate-600">
            <MessageSquare size={20} />
          </Button>
          <div className="w-9 h-9 ml-2 cursor-pointer ring-2 ring-offset-2 ring-blue-500 rounded-full overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.uid}`} />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="pt-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Professional Menu */}
        <aside className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 p-2">
              <Avatar className="w-12 h-12 ring-2 ring-blue-100">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.uid}`} />
                <AvatarFallback>H</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <div className="font-bold text-slate-900 truncate">Mi Perfil Elite</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Hubbax Member</div>
              </div>
            </div>
            <div className="space-y-1">
              <SidebarLink icon={<Home size={20} />} label="Feed Principal" active />
              <SidebarLink icon={<Users size={20} />} label="Mi Red Profesional" />
              <SidebarLink icon={<Briefcase size={20} />} label="Ofertas de Empleo" />
              <SidebarLink icon={<LayoutGrid size={20} />} label="Marketplace Elite" />
              <SidebarLink icon={<UserIcon size={20} />} label="Configuración" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-4 px-2">Accesos Rápidos</div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">C</div>
                <span className="text-sm font-medium text-slate-700">Certificaciones</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-xs">E</div>
                <span className="text-sm font-medium text-slate-700">Eventos Elite</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start gap-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-2xl py-6"
          >
            <LogOut size={20} /> <span className="font-bold">Cerrar Sesión</span>
          </Button>
        </aside>

        {/* Main Feed - The Real Hubbax Core */}
        <main className="lg:col-span-6 space-y-6 pb-12">
          {/* Post Composer - Modern & Sleek */}
          <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-200 bg-white">
            <CardContent className="p-4">
              <form onSubmit={handlePost} className="flex gap-3">
                <Avatar className="w-11 h-11 shrink-0 ring-2 ring-slate-100">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.uid}`} />
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex flex-col gap-3">
                  <Input 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Comparte tu próximo gran hito..." 
                    className="border-none bg-slate-100 rounded-full h-10 pl-4 focus:ring-2 focus:ring-blue-500 text-sm" 
                  />
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="rounded-full h-8 px-3 gap-2 text-slate-500 hover:bg-slate-100 text-xs font-bold">
                        <ImageIcon size={16} className="text-blue-500" /> Foto
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full h-8 px-3 gap-2 text-slate-500 hover:bg-slate-100 text-xs font-bold">
                        <Briefcase size={16} className="text-green-500" /> Empleo
                      </Button>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={!newPost.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 h-8 text-xs font-black shadow-md shadow-blue-200 transition-transform active:scale-95"
                    >
                      Publicar
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-5">
            <AnimatePresence>
              {posts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-400 font-medium italic font-serif"
                >
                  La red elite está esperando tu primera publicación...
                </motion.div>
              ) : (
                posts.map((post) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-200 bg-white overflow-hidden">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-11 h-11 ring-2 ring-blue-50">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${post.uid}`} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                              <div className="font-bold text-slate-900 hover:underline cursor-pointer truncate">Usuario Hubbax Elite</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase">
                                {post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString() : "Recientemente"}
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
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 gap-2 rounded-full h-8 px-3 font-bold text-xs transition-colors">
                              <ThumbsUp size={16} /> Like
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 gap-2 rounded-full h-8 px-3 font-bold text-xs transition-colors">
                              <MessageCircle size={16} /> Comentar
                            </Button>
                          </div>
                          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                            Hubbax Encrypted
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

        {/* Right Sidebar - Suggestions & Premium */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="font-black text-slate-900 text-xs uppercase tracking-widest mb-5 flex items-center justify-between">
              <span>Sugerencias Elite</span>
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
                      <div className="text-xs font-bold truncate text-slate-800 group-hover:text-blue-600 transition-colors">Elite Member {i}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase truncate">Senior Architect</div>
                    </div>
                  </div>
                  <Button size="sm" className="h-6 px-3 text-[10px] font-black bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm shadow-blue-100">
                    Sugerido
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10 space-y-4">
              <div className="font-black text-lg italic uppercase leading-tight">Upgrade to Premium</div>
              <p className="text-blue-100 text-[11px] font-medium leading-relaxed">
                Accede a herramientas de matching avanzado y visibilidad global en el mercado profesional.
              </p>
              <Button className="w-full bg-white text-blue-600 hover:bg-slate-100 font-black rounded-xl py-5 text-xs uppercase tracking-widest shadow-lg">
                Ver Planes
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function NavIcon({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <div className={`p-2 rounded-lg cursor-pointer transition-all ${active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
      {icon}
    </div>
  )
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-50 text-blue-600 shadow-sm font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'}`}>
      <div className={`transition-colors ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  )
}
