import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AddResearch from "./pages/AddResearch";
import Search from "./pages/Search";
import Error from "./pages/Error";
import Details from "./pages/Details";
import EditResearch from "./pages/EditResearch";
import JudgeInfo from "./pages/JudgeInfo";
import Home from "./pages/HomePage";
import Login from "./pages/login";
import Account from "./pages/UserAccount";
import UserHead from "./components/User";
import { ToastContainer } from "react-toastify";
import { ResearchProvider } from "./context/ResearchContext";

function App() {
  // Get the current location using React Router's useLocation hook
  const location = useLocation();

  // Check if the current page is the login page
  const isLoginPage = location.pathname === "/login";

  // Render the App component
  return (
    // Main container with some classes and attributes
    <div className="container-xxl App" lang="ar" dir="rtl">
      {/* Display toast messages */}
      <ToastContainer />

      {/* Define the application routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* Add Research page with ResearchProvider context */}
        <Route
          path="/add-research"
          element={
            <ResearchProvider>
              <AddResearch />
            </ResearchProvider>
          }
        />

        {/* Edit Research page with ResearchProvider context */}
        <Route
          path="/edit"
          element={
            <ResearchProvider isEditingResearch={true}>
              <EditResearch />
            </ResearchProvider>
          }
        />

        {/* Search page */}
        <Route path="/search" element={<Search />} />

        {/* Details page */}
        <Route path="/details" element={<Details />} />

        {/* Judge Info page */}
        <Route path="/judge" element={<JudgeInfo />} />

        {/* User Account page */}
        <Route path="/account" element={<Account />} />

        {/* Error page for unknown routes */}
        <Route path="/*" element={<Error />} />
      </Routes>

      {/* Render UserHead component if not on the login page */}
      {!isLoginPage && <UserHead />}
    </div>
  );
}

// Export the App component
export default App;
