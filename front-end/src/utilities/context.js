import React, { createContext, useContext, useState } from "react";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
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
