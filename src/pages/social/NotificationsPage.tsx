import { AppLayout } from '../../layouts/AppLayout';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-neutral-500">
        <div className="w-16 h-16 bg-[#242526] rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Notificaciones</h2>
        <p>Tus alertas aparecerán aquí muy pronto.</p>
      </div>
    </AppLayout>
  );
}
