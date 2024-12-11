importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Listen for messages from the main thread (the window)
self.addEventListener("message", (event) => {
  if (event.data && event.data.firebaseConfig) {
    const firebaseConfig = event.data.firebaseConfig;

    // Initialize Firebase with the config passed from the main thread
    firebase.initializeApp(firebaseConfig);

    // Retrieve firebase messaging
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
      console.log("Received background message ", payload);

      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
      };

      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
  }
});
