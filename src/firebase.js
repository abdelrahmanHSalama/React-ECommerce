import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB35lJfEbQpAd3KHHgtn7Q9JEWvX0w_5pg",
    authDomain: "react-ecommerce-3abd8.firebaseapp.com",
    projectId: "react-ecommerce-3abd8",
    storageBucket: "react-ecommerce-3abd8.firebasestorage.app",
    messagingSenderId: "777603167836",
    appId: "1:777603167836:web:245de43c37648f7db29899",
    measurementId: "G-3G7KGLD81Z",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
