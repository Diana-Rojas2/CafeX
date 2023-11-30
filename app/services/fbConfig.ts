// Import the functions you need from the SDKs you need
import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFO_5AN_26fZPvHC1Xpmo3Ew-ZbagUdfE",
  authDomain: "iq4b-nextapp-dxrj.firebaseapp.com",
  projectId: "iq4b-nextapp-dxrj",
  storageBucket: "iq4b-nextapp-dxrj.appspot.com",
  messagingSenderId: "55684079252",
  appId: "1:55684079252:web:a2bdc6ac3896df4f139e81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };