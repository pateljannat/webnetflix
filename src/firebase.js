import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDEVYyqyiT8DLSLFnBFoh5d1hxz_s9tmWI",
    authDomain: "instagram-clone-5df9f.firebaseapp.com",
    databaseURL: "https://instagram-clone-5df9f.firebaseio.com",
    projectId: "instagram-clone-5df9f",
    storageBucket: "instagram-clone-5df9f.appspot.com",
    messagingSenderId: "550372967528",
    appId: "1:550372967528:web:6839c3e6acda1ef096a7dd"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
