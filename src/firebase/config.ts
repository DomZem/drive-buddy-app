import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: 'drive-buddy-109b5.firebaseapp.com',
  projectId: 'drive-buddy-109b5',
  storageBucket: 'drive-buddy-109b5.appspot.com',
  messagingSenderId: '18477808495',
  appId: '1:18477808495:web:316674ef99afe5505b469a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
