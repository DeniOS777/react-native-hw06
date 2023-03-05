import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBjWIm4v8qr3hS1_Yu6i6_bxK-udEIJ0s0',
  authDomain: 'rn-social-124e3.firebaseapp.com',
  projectId: 'rn-social-124e3',
  storageBucket: 'rn-social-124e3.appspot.com',
  messagingSenderId: '857523134052',
  appId: '1:857523134052:web:56c6953f44b0a4d9ab4971',
  measurementId: 'G-VJD7Z6B4TT',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
