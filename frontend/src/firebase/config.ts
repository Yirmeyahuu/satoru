import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAiW1Q4xUU364qrroVb-0Gl6yh1myJ-4Y8",
  authDomain: "satoru-c9658.firebaseapp.com",
  projectId: "satoru-c9658",
  storageBucket: "satoru-c9658.firebasestorage.app",
  messagingSenderId: "1083085974090",
  appId: "1:1083085974090:web:336ac53e699585cfd8d4b3",
  measurementId: "G-JESR242EE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;