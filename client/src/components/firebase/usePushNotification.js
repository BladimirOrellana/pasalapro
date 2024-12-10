// usePushNotification.js
import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase"; // Adjust the import to where your Firebase config is

const usePushNotification = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        // Request permission to show notifications
        const permission = await Notification.requestPermission();

        // If permission granted, get the FCM token
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_VAPID_KEY, // Your VAPID Key from Firebase
          });
          console.log("FCM Token:", token);

          // Here you can send the token to your server to subscribe to notifications
          // For example, save it to localStorage or send it to your backend
          if (token) {
            localStorage.setItem("fcmToken", token);
          }
        }
      } catch (err) {
        console.error("Error requesting notification permission:", err);
      }
    };

    requestNotificationPermission();
  }, []);
};

export default usePushNotification;
