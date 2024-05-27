importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCrl1jI3l2TKhKsROm-JZvBHTiNEZLK_8w",
    authDomain: "stajbuldum-app.firebaseapp.com",
    projectId: "stajbuldum-app",
    storageBucket: "stajbuldum-app.appspot.com",
    messagingSenderId: "498083395558",
    appId: "1:498083395558:web:b2aa5ac37c33d469c60827",
    measurementId: "G-2Q9E6EP488"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // // Customize notification here
    // const notificationTitle = 'Background Message Title';
    // const notificationOptions = {
    //     body: 'Background Message body.',
    //     icon: '/firebase-logo.png'
    // };

    // self.registration.showNotification(notificationTitle, notificationOptions);
});
