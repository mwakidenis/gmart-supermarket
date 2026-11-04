// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB7MoX59TRSHY1IB_jtPSFIvLVysifrOtA",
  authDomain: "minavkaria-project.firebaseapp.com",
  projectId: "minavkaria-project",
  storageBucket: "minavkaria-project.appspot.com",
  messagingSenderId: "451056155310",
  appId: "1:451056155310:web:9b2f206d3bd5549c148b3f",
  measurementId: "G-P4CY11HPTT"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const provider = new GithubAuthProvider();

export { auth, googleProvider, provider};