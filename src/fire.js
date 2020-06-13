import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCfMGHKgwjTiRs9yIzZkKEuG_FsF9XyXeM",
  authDomain: "filmfest-8db31.firebaseapp.com",
  databaseURL: "https://filmfest-8db31.firebaseio.com",
  projectId: "filmfest-8db31",
  storageBucket: "filmfest-8db31.appspot.com",
  messagingSenderId: "189062247858",
  appId: "1:189062247858:web:6df2dd02e98799701060ab",
  measurementId: "G-YJ493HSJZQ",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var store = firebase.storage();
export { db, store };
