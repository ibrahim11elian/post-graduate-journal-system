import React, { createContext, useState } from "react";

// Create a context for user-related data
export const UserContext = createContext();

// UserContextProvider component to manage user-related state
export const UserContextProvider = ({ children }) => {
  // Use local storage to get the initial state, or use a default value
  const user = localStorage.getItem("user");

  // Initialize state for user name with the value from local storage or an empty string
  const [userName, setUserName] = useState(user || "");

  // Initialize state for password with an empty string
  const [password, setPassword] = useState("");

  // Provide the user context value to consumers
  return (
    <UserContext.Provider
      value={{ userName, setUserName, password, setPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};
