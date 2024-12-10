import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import LoadingScreen from "../LoadingContext/LoadingScreen"; // Ensure the path is correct

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [error, setError] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    console.log("Initializing AuthProvider...");

    // This will run whenever the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser);

      // If the user is logged in
      if (currentUser) {
        const cachedUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log("Cached user:", cachedUser);

        // Check if we have a cached user
        if (cachedUser && cachedUser.email === currentUser.email) {
          console.log("Using cached user:", cachedUser);
          setUser(cachedUser);
        } else {
          try {
            console.log("Fetching user from MongoDB:", currentUser.email);
            // Make sure this API request is to your backend to fetch the user by email
            const result = await axios.get(`/api/users/${currentUser.email}`);
            if (result.data) {
              const currentUserWithDB = {
                email: result.data.email,
                role: result.data.role,
                _id: result.data._id,
              };
              console.log("Fetched user from MongoDB:", currentUserWithDB);
              setUser(currentUserWithDB);

              // Store the user in localStorage
              localStorage.setItem(
                "currentUser",
                JSON.stringify(currentUserWithDB)
              );
            } else {
              console.warn(
                "No user data found in MongoDB for:",
                currentUser.email
              );
              setUser(null);
            }
          } catch (err) {
            console.error("Error fetching user from MongoDB:", err);
            setError("Failed to fetch user details.");
          }
        }
      } else {
        console.log("User not authenticated.");
        setUser(null);
        localStorage.removeItem("currentUser");
      }

      // Make sure to set loading to false after authentication check
      setLoading(false);
      console.log("Loading state set to false.");
    });

    // Cleanup the listener
    return () => unsubscribe();
  }, [auth]);

  const getToken = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout, getToken }}>
      {loading ? ( // Show loading screen while loading is true
        <LoadingScreen />
      ) : (
        children // Once loading is false, render the children components (App content)
      )}
    </AuthContext.Provider>
  );
};
