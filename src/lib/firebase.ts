// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - these are publishable keys safe for client-side use
// Security is handled by Firestore rules, not these keys
const firebaseConfig = {
  apiKey: "AIzaSyBvpg1BvH8mXyBDc1BvpMOvQAgyHKsfwZM",
  authDomain: "meom-b2490.firebaseapp.com",
  projectId: "meom-b2490",
  storageBucket: "meom-b2490.firebasestorage.app",
  messagingSenderId: "1043615472730",
  appId: "1:1043615472730:web:377a514aa0c94c121fcc63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
