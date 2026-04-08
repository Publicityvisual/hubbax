// Firebase Anti-Censorship Configuration for Hubbax
// Mission: "Facebook without censorship, but intelligent"

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// Anti-censorship Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBGXQF3k09v8lJa2udwRD-rXtdaa03X05g",
  authDomain: "hubbax-711a1.firebaseapp.com",
  projectId: "hubbax-711a1",
  storageBucket: "hubbax-711a1.firebasestorage.app", 
  messagingSenderId: "911317119851",
  appId: "1:911317119851:web:67d7f581872c6f886e122e",
  measurementId: "G-QGLCQLFS4Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
export let analytics: any;
export let messaging: any;

// Initialize analytics if supported
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('📊 Analytics initialized for Hubbax');
    }
  });
  
  messaging = getMessaging(app);
}

// Anti-censorship: Always use production Firebase (no local emulators)
// This ensures no content filtering or interference
console.log('🔥 Hubbax Anti-Censorship Firebase initialized');
console.log('✅ No local emulators - full decentralization');
console.log('🚀 Mission: "Facebook without censorship, but intelligent"');

export default {
  app,
  auth,
  db,
  storage,
  functions,
  analytics,
  messaging
};