import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración del proyecto de Firebase (Firestore + Authentication).
const firebaseConfig = {
  apiKey: "AIzaSyAOA3mdgwq8YHTcr0Cl9eBEkfylOcIbHTM",
  authDomain: "mi-tienda-cursoreact.firebaseapp.com",
  projectId: "mi-tienda-cursoreact",
  storageBucket: "mi-tienda-cursoreact.firebasestorage.app",
  messagingSenderId: "744723849155",
  appId: "1:744723849155:web:ea4181d7323566c972e776",
  measurementId: "G-FH31PP853N",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
