import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC1IxSrpz6JwV5mSxUH0JCJXVK15jZ5SmY",
  authDomain: "transit-companion-app.firebaseapp.com",
  databaseURL: "https://transit-companion-app.firebaseio.com",
  projectId: "transit-companion-app",
  storageBucket: "",
  messagingSenderId: "334651045294",
  appId: "1:334651045294:web:79d9b4f4e24863079e043f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
