import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDO2drQ9qz_VHLEjplFtMgF9HjaHudIn-M",
    authDomain: "bookshelf-c3d5b.firebaseapp.com",
    projectId: "bookshelf-c3d5b",
    storageBucket: "bookshelf-c3d5b.appspot.com",
    messagingSenderId: "586889873501",
    appId: "1:586889873501:web:28729c89abcbf2c28d25b4",
    measurementId: "G-J8LF7ZPC5W"
  };

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  const fire = firebase;
  export default fire;