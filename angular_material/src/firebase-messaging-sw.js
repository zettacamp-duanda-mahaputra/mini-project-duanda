importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");


const firebaseConfig = {
    apiKey: "AIzaSyCboTXQ9W23HXD2t-qM8PE1GnAMKhDKKAY",
    authDomain: "psychic-apex-334206.firebaseapp.com",
    databaseURL: "https://psychic-apex-334206-default-rtdb.firebaseio.com",
    projectId: "psychic-apex-334206",
    storageBucket: "psychic-apex-334206.appspot.com",
    messagingSenderId: "738057478646",
    appId: "1:738057478646:web:1887444f60df21bb1a27d7",
    measurementId: "G-YLPYL9Q4C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);