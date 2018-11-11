import * as firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: `${process.env.REACT_APP_POPPIN_POTLUCK_API_KEY}`,
  authDomain: "poppin-potluck.firebaseapp.com",
  databaseURL: "https://poppin-potluck.firebaseio.com",
  projectId: "poppin-potluck",
  storageBucket: "poppin-potluck.appspot.com",
  messagingSenderId: "595857316733"
};
firebase.initializeApp(config);

const database = firebase.database();
export default database;