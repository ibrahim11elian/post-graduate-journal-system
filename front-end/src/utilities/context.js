import React, { createContext, useContext, useState } from "react";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  // Use local storage to get the initial state, or use a default value
  const user = localStorage.getItem("user");
  const [userName, setUserName] = useState(user || "");
  const [password, setPassword] = useState("");

  return (
    <userContext.Provider
      value={{ userName, setUserName, password, setPassword }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
