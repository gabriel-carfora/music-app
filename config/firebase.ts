import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD6WvQ2ToRuTKeFIMlaBjdMcKBvEXD9BN4',
  authDomain: 'listening-to-3aed3.firebaseapp.com',
  projectId: 'listening-to-3aed3',
  storageBucket: 'listening-to-3aed3.firebasestorage.app',
  messagingSenderId: '971113400062',
  appId: '1:971113400062:web:1470a776a05f1d0bf347af',
  measurementId: 'G-LYDFZLC4RY',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
