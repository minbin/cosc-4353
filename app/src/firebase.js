import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebase = initializeApp({
  apiKey: "AIzaSyBwdNFzEXNIJf23PxfeCtRpCUFRlU6vYSU",
  authDomain: "test-f6519.firebaseapp.com",
  projectId: "test-f6519",
  storageBucket: "test-f6519.appspot.com",
  messagingSenderId: "1053028028351",
  appId: "1:1053028028351:web:0bc68c8e1b86a96cd01b0a"
});

export const firestore = getFirestore(firebase);
