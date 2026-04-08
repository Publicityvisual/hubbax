import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGXQF3k09v8lJa2udwRD-rXtdaa03X05g",
  authDomain: "hubbax-711a1.firebaseapp.com",
  projectId: "hubbax-711a1",
  storageBucket: "hubbax-711a1.firebasestorage.app",
  messagingSenderId: "911317119851",
  appId: "1:911317119851:web:67d7f581872c6f886e122e",
  measurementId: "G-QGLCQLFS4Z"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics, auth, db };
