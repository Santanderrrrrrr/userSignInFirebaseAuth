import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})



// const provider = new GoogleAuthProvider()

// export const signInWithGoogle=()=>{
//   signInWithPopup(auth, provider)
//   .then((result)=>{
//     const name = result.user.displayName;
//     const email = result.user.email;
//     const dp = result.user.photoURL;
//   })
//   .catch((error)=>{
//     console.log(error);
//   })
// }



export const auth = getAuth(app);
export const so = signOut(auth);
export default app