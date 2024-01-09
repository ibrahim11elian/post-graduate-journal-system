import React, { Suspense, lazy, useEffect, useState } from "react";
import Header from "../components/Header";
import { useFetch } from "../hooks/usefetch";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Lazy-loaded components using React.lazy
const JudgeForm = lazy(() =>
  import("../components/judgeInfoComponents/JudgeForm")
);
const JudgeTable = lazy(() =>
  import("../components/judgeInfoComponents/JudgeTable")
);

function JudgeInfo() {
  // Check if the user is authenticated using the useAuth hook
  const isAuthenticated = useAuth();

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Use useEffect to redirect to the login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      return navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const { fetchedData, fetchData } = useFetch();

  const [judgeList, setJudgeList] = useState({});

  // Use useEffect to update the judgeList state when data is fetched
  useEffect(() => {
    setJudgeList({ ...fetchedData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedData]);

  // Render the JudgeInfo component with suspense for lazy-loaded components
  return (
    <Suspense
      fallback={
        <div
          className="d-flex flex-column justify-content-end align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="loading-spinner "></div>
        </div>
      }
    >
      <Header />

      {/* Render JudgeForm component */}
      <JudgeForm
        judgeList={judgeList}
        setJudgeList={setJudgeList}
        fetchData={fetchData}
      />

      {/* Render JudgeTable component */}
      <JudgeTable judgeList={judgeList} setJudgeList={setJudgeList} />
    </Suspense>
  );
}

export default JudgeInfo;
