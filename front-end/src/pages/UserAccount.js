import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import AccountForm from "../components/AccountForm";

const Account = () => {
  // Check if the user is authenticated using the useAuth hook
  const isAuthenticated = useAuth();

  const navigate = useNavigate();

  // Use useEffect to redirect to the login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      return navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="container">
      <Header />
      <AccountForm />
    </div>
  );
};

export default Account;
