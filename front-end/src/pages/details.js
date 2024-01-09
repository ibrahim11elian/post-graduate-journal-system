import { Suspense, lazy, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

// Lazy-loaded components using React.lazy
const Header = lazy(() => import("../components/Header"));
const ResearcherInfo = lazy(() =>
  import("../components/detailsComponents/ResearcherInfo")
);
const ResearchInfo = lazy(() =>
  import("../components/detailsComponents/ResearchInfo")
);
const SecurityExamination = lazy(() =>
  import("../components/detailsComponents/SecurityExamination")
);
const ScientificExamination = lazy(() =>
  import("../components/detailsComponents/ScientificExamination")
);

function Details() {
  // Get the location and data from React Router's useLocation hook
  const location = useLocation();
  const data = location.state;

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Parse data from location state
  const research = JSON.parse(data.data || "null");
  const route = JSON.parse(data.route || "null");
  const searchQuery = JSON.parse(data.searchQuery || "null");

  // Check if the user is authenticated using the useAuth hook
  const isAuthenticated = useAuth();

  // Set document title based on research details
  useEffect(() => {
    document.title = `${research.researcher.researcher_name} - ${research.research.research_title}`;
  }, [research.research.research_title, research.researcher.researcher_name]);

  // Use useEffect to redirect to the login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      return navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Render the Details component with suspense for lazy-loaded components
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
      <div
        key="1"
        dir="rtl"
        className=" flex flex-col items-center justify-center"
      >
        {/* Render ResearcherInfo component */}
        <ResearcherInfo
          research={research}
          route={route}
          searchQuery={searchQuery}
        />

        {/* Render Tabs and Tab components for different sections */}
        <div className="w-100 max-w-2xl mx-auto rounded-lg shadow-md">
          <Tabs className="bg-white" defaultActiveKey="research">
            <Tab eventKey="research" title="البحث">
              {/* Render ResearchInfo component */}
              <ResearchInfo research={research} />
            </Tab>
            <Tab eventKey="security-examination" title="الفحص الأمني">
              {/* Render SecurityExamination component */}
              <SecurityExamination examination={research.examination} />
            </Tab>
            <Tab eventKey="scientific-examination" title="الفحص العلمي">
              {/* Render ScientificExamination component */}
              <ScientificExamination
                judgeExamination={research.judgeExamination}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Suspense>
  );
}

export default Details;
