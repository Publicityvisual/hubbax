import { AppLayout } from '../../layouts/AppLayout';
import { Users } from 'lucide-react';

export default function FriendsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-neutral-500">
        <div className="w-16 h-16 bg-[#242526] rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Amigos</h2>
        <p>Próximamente podrás buscar y gestionar tus amigos aquí.</p>
      </div>
    </AppLayout>
  );
}
