// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
<script src="js/firebase/firebase-auth.js"></script>;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI86XVmUZ7bsY5mQnYmro0P0TIIF4Jioc",
  authDomain: "geogreeting-fc056.firebaseapp.com",
  projectId: "geogreeting-fc056",
  storageBucket: "geogreeting-fc056.appspot.com",
  messagingSenderId: "689359401144",
  appId: "1:689359401144:web:12671c5102ec1734a5044d",
  measurementId: "G-9369DQBEGZ",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };
