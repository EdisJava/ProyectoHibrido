import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEyHEP5fw0Gnu3SPRXsPI4mrPftGQZPjk",
  authDomain: "proyectohibridorestaurante.firebaseapp.com",
  projectId: "proyectohibridorestaurante",
  storageBucket: "proyectohibridorestaurante.firebasestorage.app",
  messagingSenderId: "627907496272",
  appId: "1:627907496272:web:99d9c3eb9e7f3631f38455"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

// Configurar persistencia para web y desktop
if (typeof window !== 'undefined') {
  try {
    setPersistence(FIREBASE_AUTH, browserLocalPersistence).catch((error) => {
      console.warn('Error setting persistence:', error);
    });
  } catch (error) {
    console.warn('Persistence configuration error:', error);
  }
}


