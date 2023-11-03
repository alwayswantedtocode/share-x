//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBh_tW4QZ_pFbNXKzjuWxpcAIaaQrXy1d4",
  authDomain: "share-x-ca806.firebaseapp.com",
  projectId: "share-x-ca806",
  storageBucket: "share-x-ca806.appspot.com",
  messagingSenderId: "587116043734",
  appId: "1:587116043734:web:c69f7e18d444963a865877",
  measurementId: "G-WNQ91L96MM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };
