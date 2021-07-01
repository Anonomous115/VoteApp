import firebase from "firebase";
import "firebase/firestore";
import "firebase/app";

export const config = {
  apiKey: "AIzaSyDbcXYC7YitpCMbKw0S37tY21iGBGuRn9w",
  authDomain: "voting-eacf5.firebaseapp.com",
  databaseURL: "https://voting-eacf5.firebaseio.com",
  projectId: "voting-eacf5",
  storageBucket: "voting-eacf5.appspot.com",
  messagingSenderId: "459020571896",
  appId: "1:459020571896:web:8e0dca2b110eab6769570d",
  measurementId: "G-XXYLZCHVXZ"
};

// Initialize Firebase
export const app = firebase.initializeApp(config);
export const db = firebase.firestore();
