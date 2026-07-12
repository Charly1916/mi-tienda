import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración del proyecto de Firebase (Firestore + Authentication).
const firebaseConfig = {
  apiKey: "AISyCelxxNBGFzW9Rb4yCdLjBMs2MDMVaXyalYU",
  authDomain: "react-c9743.firebaseapp.com",
  projectId: "react-c9743",
  storageBucket: "react-c9743.firebasestorage.app",
  messagingSenderId: "933655766258",
  appId: "1:933655766258:web:e18886a2cfeb7de0913ca7",
  measurementId: "G-9PRRX78S4R",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
