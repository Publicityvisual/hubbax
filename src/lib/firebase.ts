// Configuración completa de Firebase para Hubbax
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGXQF3k09v8lJa2udwRD-rXtdaa03X05g",
  authDomain: "hubbax-711a1.firebaseapp.com",
  projectId: "hubbax-711a1",
  storageBucket: "hubbax-711a1.firebasestorage.app",
  messagingSenderId: "911317119851",
  appId: "1:911317119851:web:67d7f581872c6f886e122e",
  measurementId: "G-QGLCQLFS4Z"
};

// Inicializar Firebase (evitar inicialización duplicada)
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Inicializar servicios
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
let analytics;
let messaging;

// Analytics solo en producción
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('📊 Firebase Analytics activado');
    }
  });
  
  // Messaging solo si se soporta
  messaging = getMessaging(app);
}

// Configuración de emuladores para desarrollo
const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development';
if (isDevelopment) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    console.log('🔥 Conectado a emulador Auth');
  } catch (error) {
    console.log('ℹ️ Usando Auth de producción');
  }
  
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('🔥 Conectado a emulador Firestore');
  } catch (error) {
    console.log('ℹ️ Usando Firestore de producción');
  }
  
  try {
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('🔥 Conectado a emulador Storage');
  } catch (error) {
    console.log('ℹ️ Usando Storage de producción');
  }
  
  try {
    connectFunctionsEmulator(functions, 'localhost', 5001);
    console.log('🔥 Conectado a emulador Functions');
  } catch (error) {
    console.log('ℹ️ Usando Functions de producción');
  }
}

console.log('🔥 Firebase configurado correctamente para Hubbax');

// Exportar servicios
export {
  app,
  auth,
  db,
  storage,
  functions,
  analytics,
  messaging
};

export default app;