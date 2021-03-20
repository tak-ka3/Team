import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp({
      apiKey: "AIzaSyD1ZjOrljy6xJH5m4OXQNPfEGsIGmnVcCw",
      authDomain: "teammake-23086.firebaseapp.com",
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
      projectId: "teammake-23086",
      storageBucket: "teammake-23086.appspot.com",
      messagingSenderId: "94241661581",
      appId: "1:94241661581:web:34dc9cb5e104921fd978c4",
      // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    });

export const firestore = firebase.firestore();
export default firebase;