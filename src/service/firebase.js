const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_KEY,
    projectId: process.env.REACT_APP_FIREBASE_DB_URL,
    databaseURL: process.env.FIREBASE_DB_URL,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
