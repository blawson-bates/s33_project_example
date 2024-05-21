// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRfBsthbeDD8SCyK31Y8TiAtbMnngFeeU",
  authDomain: "today-firebase-ce800.firebaseapp.com",
  projectId: "today-firebase-ce800",
  storageBucket: "gs://today-firebase-ce800.appspot.com",
  messagingSenderId: "824269942831",
  appId: "1:824269942831:web:74319c9faaaac8fa8616da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Get a reference to the storage service, used to create references in your storage bucket
export const storage = getStorage(app);
// Create a storage reference from our storage service
export const storageRef = ref(storage);
