import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";


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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});