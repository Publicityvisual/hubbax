import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, CheckCircle, X, Users } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { usePageStore } from '../../store/pageStore';
import { useFirebase } from '../../contexts/FirebaseContext';

interface FanPage {
  id: string;
  name: string;
  username: string;
  description: string;
  avatar: string;
  cover: string;
  adminId: string;
  category: string;
  followersCount: number;
  isOfficial: boolean;
  createdAt: any;
}

export function FanPageManager() {
  const { pages, setPages } = usePageStore();
  const { user } = useFirebase();
  const [isCreating, setIsCreating] = useState(false);
  const [newPage, setNewPage] = useState({
    name: '',
    username: '',
    description: '',
    avatar: '',
    cover: '',
    category: 'Official'
  });

  // Fetch pages from Firebase
  useEffect(() => {
    const q = query(collection(db, 'fanpages'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FanPage[];
      setPages(pagesData);
    });
    return () => unsubscribe();
  }, []);

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'fanpages'), {
        ...newPage,
        adminId: user?.uid || 'admin-system',
        followersCount: 0,
        isOfficial: true,
        createdAt: serverTimestamp()
      });
      
      setNewPage({ name: '', username: '', description: '', avatar: '', cover: '', category: 'Official' });
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Hubbax <span className="text-[#d93025]">Fan Pages</span></h1>
          <p className="text-neutral-400">Gestiona la presencia oficial de Hubbax</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-[#d93025] hover:bg-[#ff4e42] text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-[#d93025]/20"
        >
          <Plus className="w-5 h-5" /> Crear Página Oficial
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <motion.div 
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-[#d93025]/50 transition-all relative"
          >
            {/* Cover Image */}
            <div className="h-32 bg-neutral-800 relative overflow-hidden">
              <img src={page.cover} alt={page.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2">
                {page.isOfficial && (
                  <div className="bg-[#d93025] text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <CheckCircle className="w-3 h-3" /> OFICIAL
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-end gap-3 -mt-10">
                <img src={page.avatar} alt={page.name} className="w-20 h-20 rounded-2xl border-4 border-black object-cover shadow-xl" />
                <div className="pb-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {page.name} <CheckCircle className="w-5 h-5 text-blue-400" />
                  </h3>
                  <span className="text-neutral-500 text-sm">@{page.username}</span>
                </div>
              </div>

              <p className="text-neutral-400 text-sm line-clamp-3">{page.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-neutral-500 text-xs font-bold">
                  <Users className="w-4 h-4" /> {page.followersCount} seguidores
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Page Modal */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#121212] border border-white/10 w-full max-w-md rounded-3xl p-8 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-black text-white">Nueva Página de Hubbax</h2>
                <button onClick={() => setIsCreating(false)} className="text-neutral-500 hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleCreatePage} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Nombre de la Página</label>
                  <input 
                    value={newPage.name} 
                    onChange={e => setNewPage({...newPage, name: e.target.value})}
                    placeholder="Ej: Hubbax AI News" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#d93025] transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Username</label>
                  <input 
                    value={newPage.username} 
                    onChange={e => setNewPage({...newPage, username: e.target.value})}
                    placeholder="@hubbax_ai_news" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#d93025] transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Descripción</label>
                  <textarea 
                    value={newPage.description} 
                    onChange={e => setNewPage({...newPage, description: e.target.value})}
                    placeholder="Describe el propósito de la página..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#d93025] transition-all h-24 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Avatar URL</label>
                    <input 
                      value={newPage.avatar} 
                      onChange={e => setNewPage({...newPage, avatar: e.target.value})}
                      placeholder="https://..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#d93025] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Cover URL</label>
                    <input 
                      value={newPage.cover} 
                      onChange={e => setNewPage({...newPage, cover: e.target.value})}
                      placeholder="https://..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#d93025] transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#d93025] hover:bg-[#ff4e42] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#d93025]/20 mt-4"
                >
                  Crear Página Oficial
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
