import { useState } from "react";

// Custom hook to check if the user is authenticated
const useAuth = () => {
  // Use state to store the authentication status
  const [isAuthenticated] = useState(() => {
    // Check if there is a token and user in localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Return true if both token and user exist, otherwise return false
    return token && user ? true : false;
  });

  // Return the authentication status
  return isAuthenticated;
};

export default useAuth;
