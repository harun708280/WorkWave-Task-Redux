
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDBUy6r-OaNzegme99kWbuxlksU5kJzDnE",
  authDomain: "wavework-19772.firebaseapp.com",
  projectId: "wavework-19772",
  storageBucket: "wavework-19772.firebasestorage.app",
  messagingSenderId: "747706088915",
  appId: "1:747706088915:web:e2e0b413bdaf10b2744326",
  measurementId: "G-S61GGHBZ1C"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth