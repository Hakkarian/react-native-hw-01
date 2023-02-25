import { initializeApp } from "firebase/app";
// import * as firebase from 'firebase';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5ARj1_NribLkKdkBx_J7RmgSuAjsRGr4",
  authDomain: "react-native-first-f7fc0.firebaseapp.com",
  databaseURL:
    "https://react-native-first-f7fc0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-first-f7fc0",
  storageBucket: "react-native-first-f7fc0.appspot.com",
  messagingSenderId: "636271452984",
  appId: "1:636271452984:web:66ca8b62c119c2a74dd7cd",
  measurementId: "G-3KE397XJ9N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
// regCol = collection(db, "mobile");
// const docsShapshot = await getDocs(regCol);



