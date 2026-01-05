import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// ¡IMPORTANTE! Reemplaza esto con la configuración de tu propio proyecto de Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyDohC7m8JhSryyxteEy159XcBVx_JTG-9k",
  authDomain: "eduweb-fcec7.firebaseapp.com",
  projectId: "eduweb-fcec7",
  storageBucket: "eduweb-fcec7.firebasestorage.app",
  messagingSenderId: "967427263494",
  appId: "1:967427263494:web:fda556347c6084a46a0787",
  measurementId: "G-SWGPTKSRET"
};

// Evita la reinicialización en HMR de Vite
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exportar los servicios que usaremos
export const auth = getAuth(app);
const db = getFirestore(app);

// Habilitar la persistencia para funcionamiento offline
enableIndexedDbPersistence(db).catch((err) => {
  console.error("Error al habilitar la persistencia de Firestore: ", err);
});

export { db };