import { useState } from "react";

const useAuth = () => {
  const [isAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });
  return isAuthenticated;
};

export default useAuth;
