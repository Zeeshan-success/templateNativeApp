// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL4wfA-qm3LodTV8C2JI8fEyiM-HGsJx8",
  authDomain: "zpn-da380.firebaseapp.com",
  projectId: "zpn-da380",
  storageBucket: "zpn-da380.firebasestorage.app",
  messagingSenderId: "1004051720927",
  appId: "1:1004051720927:web:af953488a1b4bde371176a",
  measurementId: "G-MFB07RWTDV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app)