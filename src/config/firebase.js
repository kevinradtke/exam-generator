import firebase from "firebase/app";
import "firebase/database";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDIV6oKJvSB8f8LoDZp23OWcu1OaPbhsTs",
  authDomain: "exam-generator-fa24c.firebaseapp.com",
  databaseURL: "https://exam-generator-fa24c.firebaseio.com",
  projectId: "exam-generator-fa24c",
  storageBucket: "",
  messagingSenderId: "667885101358"
};

firebase.initializeApp(config);

const database = firebase.database();

export { database };
