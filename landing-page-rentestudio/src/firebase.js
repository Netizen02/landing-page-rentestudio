// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, push, ref, set} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiglBKE25BfKsT97izBlnu3Ic46vdP3tw",
  authDomain: "rentestudio-5f755.firebaseapp.com",
  projectId: "rentestudio-5f755",
  storageBucket: "rentestudio-5f755.appspot.com",
  messagingSenderId: "936356638453",
  appId: "1:936356638453:web:a246cfee912eb37f98dfbc",
  measurementId: "G-9PJ9VZH07Z",
  databaseURL: "https://rentestudio-5f755-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export function writeUserData(name, email, message) {
  const db = getDatabase();
  const usersRef = ref(db, 'users/');
  const newUserRef = push(usersRef); // Create a new reference
  set(newUserRef, {
    username: name,
    email: email,
    message: message
  });
}

