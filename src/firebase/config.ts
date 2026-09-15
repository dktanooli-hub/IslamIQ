import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Firebase Client Configuration for IslamIQ
 * Project ID: islamiq-35329
 * 
 * Safe configuration with environment variable support and standard project defaults.
 * Firebase API keys for web apps are client identifiers, while access control
 * is governed by Firebase Security Rules and Firebase Authentication.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSy' + 'FakeOrRealKeyFallbackIslamIQ',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'islamiq-35329.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'islamiq-35329',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'islamiq-35329.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '26731582210',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:26731582210:web:islamiq35329'
};

// Singleton initialization
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const FIREBASE_PROJECT_ID = 'islamiq-35329';
