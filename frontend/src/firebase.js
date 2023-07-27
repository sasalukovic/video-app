import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: "AIzaSyC5X2P0kurNa4c6WK0qmxTyfYtVl8fCB98",
  authDomain: "video-1c2ea.firebaseapp.com",
  projectId: "video-1c2ea",
  storageBucket: "video-1c2ea.appspot.com",
  messagingSenderId: "259618194629",
  appId: "1:259618194629:web:111ae5d247c0f00b741cac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
