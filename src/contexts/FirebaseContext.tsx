// Contexto global de Firebase para Hubbax
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseApp } from 'firebase/app';
import { authService, useAuth } from '../services/AuthService';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app } from '../lib/firebase'; // Importar app tipada

interface FirebaseContextType {
  // Firebase app
  app: FirebaseApp;
  
  // Auth
  user: any;
  profile: any;
  loading: boolean;
  isAuthenticated: boolean;
  emailVerified: boolean;
  register: (email: string, password: string, profile: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  
  // Notifications
  notificationsEnabled: boolean;
  notificationToken: string | null;
  enableNotifications: () => Promise<void>;
  disableNotifications: () => Promise<void>;
  
  // Utils
  error: string | null;
  refreshAuth: () => void;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

interface FirebaseProviderProps {
  children: React.ReactNode;
  firebaseApp?: FirebaseApp;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children, firebaseApp = app }) => {
  const authState = useAuth();
  const [notificationToken, setNotificationToken] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // Configurar notificaciones push al autenticarse
  useEffect(() => {
    if (authState.isAuthenticated && !notificationToken) {
      enablePushNotifications();
    }
  }, [authState.isAuthenticated]);

  // Activar notificaciones push
  const enablePushNotifications = async (): Promise<void> => {
    try {
      if (!('Notification' in window)) {
        console.log('Este navegador no soporta notificaciones.');
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('Permisos de notificación denegados.');
        return;
      }

      const messaging = getMessaging(firebaseApp);
      
      const token = await getToken(messaging, {
        vapidKey: 'BKqVv0bZX9R6RDcp8zSefEfLbm_O5EU4X0HWw_IqT8vDqCZnCLUifvr6PJK5RDNhN5KQQqkfV6f6x2R3YUa-5fE'
      });

      if (token) {
        setNotificationToken(token);
        setNotificationsEnabled(true);
        console.log('🔔 Token de notificaciones:', token.substring(0, 20) + '...');
        
        // Escuchar mensajes en foreground
        onMessage(messaging, (payload) => {
          console.log('📩 Mensaje recibido:', payload);
          
          // Mostrar notificación si corresponde
          if (payload.notification) {
            new Notification(payload.notification.title || 'Hubbax', {
              body: payload.notification.body,
              icon: payload.notification.icon || '/assets/logo.png',
              badge: '/assets/logo.png',
            });
          }
        });
      } else {
        console.log('No se pudo obtener el token de notificaciones.');
      }
    } catch (error) {
      console.error('❌ Error activando notificaciones:', error);
    }
  };

  const disablePushNotifications = async (): Promise<void> => {
    setNotificationToken(null);
    setNotificationsEnabled(false);
    console.log('🔔 Notificaciones push desactivadas');
  };

  // Métodos de autenticación
  const register = async (email: string, password: string, profile: any): Promise<void> => {
    return authService.registerWithEmail(email, password, profile);
  };

  const login = async (email: string, password: string): Promise<void> => {
    return authService.loginWithEmail(email, password);
  };

  const loginWithGoogle = async (): Promise<void> => {
    return authService.loginWithGoogle();
  };

  const logout = async (): Promise<void> => {
    return authService.logout();
  };

  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    return authService.sendPasswordResetEmail(email);
  };

  const sendEmailVerification = async (): Promise<void> => {
    return authService.sendEmailVerification();
  };

  const enableNotifications = async (): Promise<void> => {
    return enablePushNotifications();
  };

  const disableNotifications = async (): Promise<void> => {
    return disablePushNotifications();
  };

  const refreshAuth = (): void => {
    // Forzar actualización del contexto
    // Implementar lógica de refresh si es necesario
  };

  // Valores del contexto
  const contextValue: FirebaseContextType = {
    // Firebase
    app: firebaseApp,
    
    // Auth
    user: authState.user,
    profile: authState.profile,
    loading: authState.loading,
    isAuthenticated: authState.isAuthenticated,
    emailVerified: authState.emailVerified,
    register,
    login,
    loginWithGoogle,
    logout,
    sendPasswordResetEmail,
    sendEmailVerification,
    
    // Notifications
    notificationsEnabled,
    notificationToken,
    enableNotifications,
    disableNotifications,
    
    // Utils
    error: authState.error,
    refreshAuth
  };

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Hook para usar el contexto
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase debe usarse dentro de un FirebaseProvider');
  }
  return context;
};