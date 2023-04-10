import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCmIjuRPGiXiR3dSdAYe6iedYe3F3rnqRs",
  authDomain: "cursosujeito-60957.firebaseapp.com",
  projectId: "cursosujeito-60957",
  storageBucket: "cursosujeito-60957.appspot.com",
  messagingSenderId: "228673360542",
  appId: "1:228673360542:web:75b6404c62524e3c69e18f",
  measurementId: "G-ZN4J6JS2CE"
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };