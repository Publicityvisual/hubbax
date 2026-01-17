import { Image, Smile, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

export function CreatePost() {
  return (
    <div className="p-4 border-b border-white/5 bg-[#050505]">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-500 p-[2px]">
                <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" 
                    alt="Current User" 
                    className="w-full h-full rounded-full object-cover border-2 border-black"
                />
            </div>
        </div>
        <div className="flex-1 pb-2">
            <textarea 
                className="w-full bg-transparent text-lg placeholder:text-white/30 focus:outline-none resize-none h-20"
                placeholder="¿Qué está pasando?" 
            />
            <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full">
                        <Image className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full">
                        <Smile className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full">
                        <Calendar className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full">
                        <MapPin className="w-5 h-5" />
                    </Button>
                </div>
                <Button size="sm" className="rounded-full px-6 font-bold" variant="gradient">
                    Publicar
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
