import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAhjj1ndGm_WeeRMM5r8EGK4_U-ZIHnImk",
    authDomain: "whatsapp--clone-a8ce9.firebaseapp.com",
    projectId: "whatsapp--clone-a8ce9",
    storageBucket: "whatsapp--clone-a8ce9.appspot.com",
    messagingSenderId: "360218435291",
    appId: "1:360218435291:web:088bdecddabf9698a676fe"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { db, auth, provider }