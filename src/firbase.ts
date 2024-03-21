// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYAF_-yQKJKPZeX2GC4OU1c66gz3azrqQ',
  authDomain: 'sstation-fe.firebaseapp.com',
  projectId: 'sstation-fe',
  storageBucket: 'sstation-fe.appspot.com',
  messagingSenderId: '15161155680',
  appId: '1:15161155680:web:07f1071cf1c7adea3da305',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // Get a reference to Firebase Storage
