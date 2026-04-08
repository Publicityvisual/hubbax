import { useState, useRef } from 'react';
import { Image, Smile, Video, Send, X } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useFirebase } from '../../contexts/FirebaseContext';

export function CreatePost({ currentUser: propsUser }: { currentUser?: any }) {
  const { profile } = useFirebase();
  
  // Prioritize profile over propsUser (Firebase User) or fallbacks
  const user = profile || (propsUser ? {
    fullName: propsUser.displayName || 'Admin',
    avatar: propsUser.photoURL || 'https://ui-avatars.com/api/?name=Admin',
    username: propsUser.email?.split('@')[0] || 'admin'
  } : { 
    fullName: 'Admin', 
    avatar: 'https://ui-avatars.com/api/?name=Admin', 
    username: 'admin' 
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!text.trim() && !imageFile) return;
    
    setIsPosting(true);
    try {
      let imageUrl = '';
      
      if (imageFile) {
        const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'posts'), {
        authorId: user.uid || 'admin-system',
        authorName: user.fullName,
        authorUsername: user.username,
        authorAvatar: user.avatar,
        content: text,
        image: imageUrl,
        timestamp: serverTimestamp(),
        likes: [],
        comments: [],
        shares: [],
        isHubbaxVerified: true
      });

      setText('');
      setImageFile(null);
      setImagePreview(null);
      setIsExpanded(false);
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Error al publicar el post. Inténtalo de nuevo.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className={`bg-black/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/5 mb-6 p-4 relative overflow-hidden group/card transform transition-all duration-300 hover:border-white/10 ${isExpanded ? 'ring-2 ring-[#d93025]/30' : ''}`}>
      
      {/* Upper Part: Avatar + Input */}
      <div className="flex gap-4 mb-4 items-center">
        <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d93025] to-purple-500 rounded-full blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            <img 
                src={user.avatar} 
                alt={user.fullName} 
                className="w-11 h-11 rounded-full object-cover cursor-pointer hover:scale-105 transition-all relative z-10 border-2 border-transparent"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black z-20"></div>
        </div>
        <div className="flex-1 relative">
            {!isExpanded ? (
                <button 
                    onClick={() => setIsExpanded(true)}
                    className="w-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 text-left px-5 py-3 rounded-full transition-all duration-200 font-light flex items-center h-11 border border-white/5 hover:border-white/20 backdrop-blur-sm"
                >
                    ¿Qué estás pensando, <span className="text-white/90 font-medium ml-1">{user.fullName.split(' ')[0]}</span>?
                </button>
            ) : (
                <div className="space-y-3 animate-in fade-in zoom-in duration-200">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-white/70 text-sm font-medium">Crear publicación</span>
                        <button onClick={() => setIsExpanded(false)} className="text-white/40 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <textarea 
                        autoFocus
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Escribe algo increíble..."
                        className="w-full bg-transparent text-white placeholder-white/30 resize-none outline-none text-lg font-light min-h-[120px]"
                    />
                    {imagePreview && (
                        <div className="relative rounded-xl overflow-hidden border border-white/10 max-h-60 group/preview">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                                onClick={() => { setImageFile(null); setImagePreview(null); }}
                                className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all opacity-0 group-hover/preview:opacity-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>

      {isExpanded && (
        <>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4 mb-3"></div>

            <div className="flex items-center justify-between pt-1 gap-2">
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#45BD62]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image className="w-5 h-5 text-[#45BD62] drop-shadow-md group-hover:scale-110 transition-transform relative z-10" />
                    <span className="hidden sm:inline relative z-10">Foto/video</span>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageChange} 
                        className="hidden" 
                        accept="image/*" 
                    />
                </button>
                
                <button className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F7B928]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Smile className="w-5 h-5 text-[#F7B928] drop-shadow-md group-hover:scale-110 transition-transform relative z-10" />
                    <span className="hidden sm:inline relative z-10">Sentimiento</span>
                </button>

                <button 
                    onClick={handlePost}
                    disabled={isPosting}
                    className={`flex-1 flex items-center justify-center gap-2 text-white font-bold text-[14px] h-10 rounded-lg transition-all relative overflow-hidden ${isPosting ? 'bg-white/10 cursor-not-allowed' : 'bg-[#d93025] hover:bg-[#ff4e42] shadow-[0_0_15px_rgba(217,48,37,0.4)]'}`}
                >
                    {isPosting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>Publicar</span>
                        </>
                    )}
                </button>
            </div>
        </>
      )}

      {!isExpanded && (
        <>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4 mb-3"></div>
            <div className="flex items-center justify-between pt-1 gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F02849]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Video className="w-5 h-5 text-[#F02849] drop-shadow-md group-hover:scale-110 transition-transform relative z-10" />
                    <span className="hidden sm:inline relative z-10">Video en vivo</span>
                </button>
                <button 
                    onClick={() => setIsExpanded(true)}
                    className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#45BD62]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image className="w-5 h-5 text-[#45BD62] drop-shadow-md group-hover:scale-110 transition-transform relative z-10" />
                    <span className="hidden sm:inline relative z-10">Foto/video</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 font-medium text-[14px] h-10 rounded-lg transition-all group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F7B928]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Smile className="w-5 h-5 text-[#F7B928] drop-shadow-md group-hover:scale-110 transition-transform relative z-10" />
                    <span className="hidden sm:inline relative z-10">Sentimiento</span>
                </button>
            </div>
        </>
      )}
    </div>
  );
}

