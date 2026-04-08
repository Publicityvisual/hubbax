import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebase } from '../../contexts/FirebaseContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useFirebase();
  const location = useLocation();

  // Mientras Firebase está verificando la sesión, mostramos un loading premium
  // Esto evita el "cuadro negro" al no intentar renderizar el contenido sin auth
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#d93025] border-t-transparent rounded-full animate-spin" />
          <span className="text-white font-bold tracking-widest text-xs uppercase animate-pulse">
            Sincronizando Hubbax...
          </span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, lo mandamos al login guardando la página que quería visitar
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
