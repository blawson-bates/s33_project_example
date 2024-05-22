// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "[REMOVED]",
  authDomain: "[REMOVED]",
  projectId: "[REMOVED]",
  storageBucket: "[REMOVED]",
  messagingSenderId: "[REMOVED]",
  appId: "[REMOVED]"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Get a reference to the storage service, used to create references in your storage bucket
export const storage = getStorage(app);
// Create a storage reference from our storage service
export const storageRef = ref(storage);
