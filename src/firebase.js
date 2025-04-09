import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC9E7RXisFV4XsIThXEtdqRLkUmLtpYAWs",
    authDomain: "react-ecommerce-d6c60.firebaseapp.com",
    projectId: "react-ecommerce-d6c60",
    storageBucket: "react-ecommerce-d6c60.firebasestorage.app",
    messagingSenderId: "449787166188",
    appId: "1:449787166188:web:bb6ca10ff754f1de8294c9",
    measurementId: "G-V6GQ0V2JME",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
