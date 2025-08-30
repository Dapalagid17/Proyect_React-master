import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-lwritwJ1oLxO1GartGFA6XVm27Vqs4E",
  authDomain: "proyecto-firebase-69cf6.firebaseapp.com",
  projectId: "proyecto-firebase-69cf6",
  storageBucket: "proyecto-firebase-69cf6.firebasestorage.app",
  messagingSenderId: "314442875007",
  appId: "1:314442875007:web:06f0461203bc46c502bf4a",
  measurementId: "G-VV9VNTVJVX"
};




// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar auth y provider de Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

export { auth, googleProvider, db, signOut };
