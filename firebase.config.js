
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

// import{
//    getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//      sendEmailVerification,
//   GoogleAuthProvider



// }from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";


// import { getFirestore,collection, getDocs,
//   addDoc,
//   serverTimestamp  } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";



const firebaseConfig = {
    apiKey: "AIzaSyDV92Q1uzsldVzoqlM-R_1_Z6p0iz6jDWc",
    authDomain: "blog-project-d392e.firebaseapp.com",
    projectId: "blog-project-d392e",
    storageBucket: "blog-project-d392e.firebasestorage.app",
    messagingSenderId: "56124325986",
    appId: "1:56124325986:web:8fc60a97351a1b8229113b"
  };

  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//    const auth = getAuth(app);
// export const db = getFirestore(app);


  //    export{
  //   auth,
  //   createUserWithEmailAndPassword,
  //   signInWithEmailAndPassword,
  //   sendEmailVerification,
  //    GoogleAuthProvider,

  //   collection, getDocs,
  // addDoc,
  // serverTimestamp
  //    }

 export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);