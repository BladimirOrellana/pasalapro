import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {
  getMessaging,
  getToken as getFCMToken,
  onMessage,
} from "firebase/messaging"; // Renaming getToken to getFCMToken to avoid conflicts

// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const analytics = getAnalytics(app);
const messaging = getMessaging(app); // Firebase messaging instance

// Refactored async function to get the FCM token
export const getToken = async (setTokenFound) => {
  try {
    const currentToken = await getFCMToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_PUSH_KEY,
    });

    if (currentToken) {
      console.log("Current token for client: ", currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // Show on the UI that permission is secured
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      setTokenFound(false);
      // Show on the UI that permission is required
    }
  } catch (err) {
    console.error("An error occurred while retrieving token: ", err);
    // Handle error while retrieving token
  }
};

// Exporting initialized services
export { auth, analytics, messaging };
