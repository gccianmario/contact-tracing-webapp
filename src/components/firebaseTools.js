import firebase from 'firebase/compat'
import 'firebase/auth';
import 'firebase/firestore';
/*
const firebaseConfig = {
    apiKey: "AIzaSyANjjTkp4ojtlAZIUG8c9uDY-MGDbtqX8w",
    authDomain: "test-cloudfunctions-f4924.firebaseapp.com",
    projectId: "test-cloudfunctions-f4924",
    storageBucket: "test-cloudfunctions-f4924.appspot.com",
    messagingSenderId: "956646126458",
    appId: "1:956646126458:web:8e9c0cb5575b30143b1cc3",
};
*/
const firebaseConfig = {
    apiKey: "AIzaSyDRmzYkh1FlkYP1UHQmaNtOC0YQcPKQSQ4",
    authDomain: "contact-tracing-neo4j.firebaseapp.com",
    projectId: "contact-tracing-neo4j",
    storageBucket: "contact-tracing-neo4j.appspot.com",
    messagingSenderId: "655146802163",
    appId: "1:655146802163:web:aabec5be2f039a59581086",
    measurementId: "G-PPM3SHY9SB"
};

if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, firebase, db};