
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";




// const firebaseConfig = {
//   apiKey: "AIzaSyAcwQ9SryJgeotjbntREybSYmg7HsNBxVU",
//   authDomain: "chat-74f56.firebaseapp.com",
//   projectId: "chat-74f56",
//   storageBucket: "chat-74f56.appspot.com",
//   messagingSenderId: "602257949799",
//   appId: "1:602257949799:web:e3e6936976b74a198c00c2"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA55ItbOZUsNRJ6e6Av_XIMs4vZ-EmjZhI",
  authDomain: "demmo-chatapp.firebaseapp.com",
  projectId: "demmo-chatapp",
  storageBucket: "demmo-chatapp.appspot.com",
  messagingSenderId: "127528969650",
  appId: "1:127528969650:web:c8bb563a61922df04ef0ab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

 // auth.useEmulator('http://localhost:9099'); 


// if (window.location.hostname === 'localhost') {
//   connectFirestoreEmulator(db, 'localhost', 8081);

// }
