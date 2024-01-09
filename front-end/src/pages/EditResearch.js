import { memo, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ResearchForm from "../components/fromComponents";

function EditResearch() {
  const navigate = useNavigate();

  // Check if the user is authenticated using the useAuth hook
  const isAuthenticated = useAuth();

  // Use useEffect to redirect to the login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  // Render the ResearchForm component with editing mode enabled
  return <ResearchForm isEditingResearch={true} />;
}

export default memo(EditResearch);
