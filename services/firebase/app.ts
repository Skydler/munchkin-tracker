import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tabletop-stats-tracker.firebaseapp.com",
  projectId: "tabletop-stats-tracker",
  storageBucket: "tabletop-stats-tracker.firebasestorage.app",
  messagingSenderId: "299521033574",
  appId: "1:299521033574:web:222c4684b27e9a20e034a7",
};

export const app = initializeApp(firebaseConfig);
