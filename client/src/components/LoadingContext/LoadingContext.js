// src/contexts/LoadingContext/LoadingContext.js

import React, { createContext, useState, useContext } from "react";
import LoadingScreen from "./LoadingScreen"; // Ensure this is the correct path

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); // Default loading state

  const startLoading = () => setLoading(true); // Start loading
  const stopLoading = () => setLoading(false); // Stop loading

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Export LoadingScreen directly from here
export { LoadingScreen };
