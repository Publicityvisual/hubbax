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
  Send
} from "lucide-react"
import { toast } from "sonner"

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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Cargando Hubbax...</div>

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">H</div>
          <span className="text-xl font-black tracking-tighter text-blue-700 uppercase italic hidden sm:block">Hubbax Inc</span>
        </div>

        <div className="flex-1 max-w-md mx-4 relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Buscar profesionales, empresas..." 
            className="pl-10 bg-slate-100 border-none focus:ring-2 focus:ring-blue-500 rounded-full h-10"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-slate-100">
            <Bell size={22} className="text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
            <MessageSquare size={22} className="text-slate-600" />
          </Button>
          <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-blue-500 p-0.5 cursor-pointer">
            <Avatar className="w-full h-full rounded-full">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`} />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="pt-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
            <div className="text-center space-y-3">
              <Avatar className="w-20 h-20 mx-auto ring-4 ring-blue-50 shadow-xl">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`} />
                <AvatarFallback>H</AvatarFallback>
              </Avatar>
              <div className="font-black text-lg text-slate-900">Mi Perfil Elite</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profesional Hubbax</div>
            </div>
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <SidebarLink icon={<Home size={20} />} label="Feed Global" active />
              <SidebarLink icon={<Users size={20} />} label="Mi Red" />
              <SidebarLink icon={<Briefcase size={20} />} label="Trabajos" />
              <SidebarLink icon={<LayoutGrid size={20} />} label="Marketplace" />
              <SidebarLink icon={<UserIcon size={20} />} label="Ajustes" />
            </div>
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl"
            >
              <LogOut size={20} /> Cerrar Sesión
            </Button>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="lg:col-span-6 space-y-6 pb-12">
          {/* Create Post */}
          <Card className="rounded-3xl border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <CardContent className="p-4">
              <form onSubmit={handlePost} className="flex gap-4">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`} />
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex flex-col gap-3">
                  <Input 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Comparte un hito profesional..." 
                    className="border-none bg-slate-100 rounded-2xl h-12 focus:ring-2 focus:ring-blue-500" 
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="rounded-full h-9 gap-2 text-slate-500 hover:bg-slate-100">
                        <ImageIcon size={18} /> Foto
                      </Button>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={!newPost.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 h-9 font-bold shadow-lg shadow-blue-200"
                    >
                      <Send size={16} className="mr-2" /> Publicar
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts List */}
          <div className="space-y-6">
            {posts.length === 0 && (
              <div className="text-center py-20 text-slate-400 font-medium italic">
                Aún no hay publicaciones en la red elite. ¡Sé el primero!
              </div>
            )}
            {posts.map((post) => (
              <Card key={post.id} className="rounded-3xl border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.uid}`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-black text-slate-900">Usuario Hubbax</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                          {new Date(post.createdAt?.toDate()).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-400 rounded-full">
                      ···
                    </Button>
                  </div>
                  <div className="text-slate-700 leading-relaxed font-medium text-lg">
                    {post.text}
                  </div>
                  <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 gap-2 rounded-full">
                      <span>👍 Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 gap-2 rounded-full">
                      <span>💬 Comentar</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
            <div className="font-black text-sm text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-4">Sugerencias Elite</div>
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=elite${i}`} />
                      <AvatarFallback>E</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <div className="text-sm font-black truncate text-slate-900">Profesional {i}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase truncate">Expert AI</div>
                    </div>
                  </div>
                  <Button size="sm" className="h-7 px-3 text-[10px] font-black bg-blue-600 rounded-full">Conectar</Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700" />
            <div className="relative z-10 space-y-4">
              <div className="font-black text-xl italic uppercase leading-tight">Mejora tu perfil</div>
              <p className="text-blue-100 text-xs font-medium leading-relaxed">Completa tu CV para atraer mejores ofertas corporativas.</p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-black rounded-xl py-5">
                Optimizar Perfil
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
      {icon}
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </div>
  )
}
