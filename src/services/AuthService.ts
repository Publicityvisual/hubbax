// Servicio de autenticación profesional con Firebase
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth';

import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useState, useEffect } from 'react';

// Tipos mejorados
export interface HubbaxUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  isAnonymous: boolean;
  metadata: {
    createdAt?: Date;
    lastLoginAt?: Date;
  };
}

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  isVerified: boolean;
  friendsCount: number;
  postsCount: number;
  createdAt: any;
  updatedAt: any;
  privacy: 'public' | 'friends' | 'private';
}

export interface AuthState {
  user: HubbaxUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  emailVerified: boolean;
}

// Clase de servicio de autenticación
export class AuthService {
  private static instance: AuthService;
  private authState: AuthState; 
  private listeners: Set<(state: AuthState) => void> = new Set();

  private constructor() {
    this.authState = {
      user: null,
      profile: null,
      loading: true,
      error: null,
      isAuthenticated: false,
      emailVerified: false
    };
    this.initializeAuthListener();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private initializeAuthListener(): void {
    console.log('🔔 Inicializando listener de autenticación...');
    
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log('✅ Usuario autenticado:', firebaseUser.email);
        
        const user: HubbaxUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber,
          isAnonymous: firebaseUser.isAnonymous,
          metadata: {
            createdAt: firebaseUser.metadata.creationTime ? new Date(firebaseUser.metadata.creationTime) : undefined,
            lastLoginAt: firebaseUser.metadata.lastSignInTime ? new Date(firebaseUser.metadata.lastSignInTime) : undefined
          }
        };

        // Cargar perfil completo
        const profile = await this.loadUserProfile(firebaseUser.uid);

        this.authState = {
          user,
          profile,
          loading: false,
          error: null,
          isAuthenticated: true,
          emailVerified: firebaseUser.emailVerified
        };
      } else {
        console.log('🚪 No hay usuario autenticado');
        this.authState = {
          user: null,
          profile: null,
          loading: false,
          error: null,
          isAuthenticated: false,
          emailVerified: false
        };
      }

      this.notifyListeners();
    });
  }

  // ===== MÉTODOS DE AUTENTICACIÓN =====

  async registerWithEmail(
    email: string, 
    password: string,
    profileData: {
      username: string;
      fullName: string;
      birthDate: string;
      gender: string;
      location?: string;
    }
  ): Promise<void> {
    try {
      console.log('🔐 Registrando usuario:', email);
      
      // Verificar que el username sea único
      await this.validateUsernameUnique(profileData.username);
      
      // Crear usuario
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar perfil básico
      await updateProfile(user, {
        displayName: profileData.fullName
      });

      // Crear perfil en Firestore
      await this.createUserProfile(user.uid, {
        ...profileData,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.fullName)}&background=6366f1&color=fff&size=200`
      });

      // Enviar email de verificación
      await sendEmailVerification(user);

      console.log('✅ Registro exitoso:', email);

    } catch (error: any) {
      console.error('❌ Error en registro:', error);
      this.setError(error.message || 'Error en el registro');
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      console.log('🔐 Iniciando sesión:', email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login exitoso:', email);
      return;
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      
      // Mapear errores a mensajes amigables
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'Usuario no encontrado. Verifica tu email.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/invalid-email': 'Email inválido.',
        'auth/user-disabled': 'Usuario deshabilitado.',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.'
      };
      
      error.message = errorMessages[error.code] || 'Error en el login.';
      this.setError(error.message);
      throw error;
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      console.log('🔐 Login con Google...');
      
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Si es un nuevo usuario, crear perfil
      const profile = await this.loadUserProfile(user.uid);
      if (!profile) {
        await this.createUserProfile(user.uid, {
          username: user.email?.split('@')[0] || '',
          fullName: user.displayName || '',
          email: user.email || '',
          avatar: user.photoURL || ''
        });
      }

      console.log('✅ Login con Google exitoso:', user.email);
      
    } catch (error: any) {
      console.error('❌ Error login Google:', error);
      this.setError(error.message || 'Error con Google login');
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      console.log('🔐 Cerrando sesión...');
      await signOut(auth);
      console.log('✅ Sesión cerrada exitosamente');
    } catch (error: any) {
      console.error('❌ Error en logout:', error);
      this.setError(error.message || 'Error cerrando sesión');
      throw error;
    }
  }

  // ===== GESTIÓN DE PERFIL =====

  private async createUserProfile(userId: string, profileData: any): Promise<void> {
    const userRef = doc(db, 'users', userId);
    
    const profile: UserProfile = {
      uid: userId,
      username: profileData.username,
      email: profileData.email,
      fullName: profileData.fullName,
      bio: profileData.bio || 'Conectando en Hubbax 🚀',
      avatar: profileData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.fullName)}&background=6366f1&color=fff&size=200`,
      coverImage: profileData.coverImage || '',
      location: profileData.location || 'México',
      birthDate: profileData.birthDate || '',
      gender: profileData.gender || 'other',
      isVerified: false,
      friendsCount: 0,
      postsCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      privacy: 'public'
    };

    await setDoc(userRef, profile);
    console.log('✅ Perfil de usuario creado:', userId);
  }

  private async loadUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
      
    } catch (error) {
      console.error('❌ Error cargando perfil:', error);
      return null;
    }
  }

  private async validateUsernameUnique(username: string): Promise<void> {
    // TODO: Implementar verificación de username único en Firestore
    console.log('🔍 Validando username:', username);
    // Por ahora permitimos cualquier username
  }

  // ===== UTILIDADES =====

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      console.log('📧 Enviando email de recuperación:', email);
      await sendPasswordResetEmail(auth, email);
      console.log('✅ Email de recuperación enviado');
    } catch (error: any) {
      console.error('❌ Error enviando email de recuperación:', error);
      this.setError(error.message || 'Error enviando email');
      throw error;
    }
  }

  async sendEmailVerification(): Promise<void> {
    if (!auth.currentUser) return;
    
    try {
      console.log('📧 Enviando email de verificación...');
      await sendEmailVerification(auth.currentUser);
      console.log('✅ Email de verificación enviado');
    } catch (error: any) {
      console.error('❌ Error enviando email de verificación:', error);
      this.setError(error.message || 'Error enviando verificación');
      throw error;
    }
  }

  // ===== OBSERVABLE PATTERN =====

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    
    // Enviar estado actual inmediatamente
    listener(this.authState);
    
    // Retornar función de unsubscribe
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.authState));
  }

  private setError(error: string | null): void {
    this.authState.error = error;
    this.notifyListeners();
    
    // Limpiar error después de 5 segundos
    if (error) {
      setTimeout(() => {
        this.authState.error = null;
        this.notifyListeners();
      }, 5000);
    }
  }

  // ===== GETTERS =====

  get currentState(): AuthState {
    return this.authState;
  }

  get currentUser(): User | null {
    return auth.currentUser;
  }
}

// Exportar instancia singleton
export const authService = AuthService.getInstance();

// Hook personalizado para React
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(authService.currentState);
  
  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);
  
  return authState;
}