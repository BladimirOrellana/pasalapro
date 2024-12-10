import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/views/public/login";
import Signup from "./components/views/public/signup";
import HomePage from "./components/views/public/home";
import NavBar from "./components/navbar/navbar";
import ProfilePage from "./components/views/private/profile";
import NotFoundPage from "./components/views/public/nofound";
import InstallBanner from "./components/InstallBanner/installBanner";
import { register } from "./serviceWorkerRegistration"; // Make sure path is correct
import { getMessaging, getToken } from "firebase/messaging";

// Register service worker to enable push notifications
register();

const App = () => {
  useEffect(() => {
    console.log("key ", process.env.REACT_APP_FIREBASE_PUSH_KEY);
    const messaging = getMessaging();

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_PUSH_KEY,
        }) // Make sure to use your VAPID public key
          .then((token) => {
            if (token) {
              console.log("FCM Token:", token);
              // Send token to server to register for notifications
            } else {
              console.log("No token available.");
            }
          })
          .catch((err) => {
            console.error("Error getting FCM token:", err);
          });
      }
    });
  }, []);

  return (
    <Router>
      <InstallBanner />
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
