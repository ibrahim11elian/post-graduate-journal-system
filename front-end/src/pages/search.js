import { useState, useEffect, useCallback, memo, Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/usefetch";
import useAuth from "../hooks/useAuth";

// Lazy-loaded components using React.lazy
const Header = lazy(() => import("../components/Header"));
const SearchForm = lazy(() =>
  import("../components/searchComponents/SearchForm")
);
const Table = lazy(() =>
  import("../components/searchComponents/SearchResultTable")
);

const baseApiUrl = process.env.REACT_APP_API_URL;

function Search() {
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

  // Fetch data using the useFetch hook
  const { loading, fetchedData, fetchData } = useFetch();

  // State for search query and route
  const [searchQuery, setResearchQuery] = useState("");
  const [route, setRoute] = useState("");

  // Callback function to handle search
  const handleSearch = useCallback(
    (params) => {
      fetchData(`${baseApiUrl}${params}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchData]
  );

  // Get the current location using React Router's useLocation hook
  const location = useLocation();

  // Use useEffect to set searchQuery and route from location state
  useEffect(() => {
    const data = location.state;
    if (data && data.searchQuery && data.route) {
      setResearchQuery(JSON.parse(data.searchQuery));
      setRoute(JSON.parse(data.route));
      handleSearch(
        `/${JSON.parse(data.route)}/${JSON.parse(data.searchQuery)}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Render the Search component with suspense for lazy-loaded components
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
      <SearchForm
        loading={loading}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setResearchQuery={setResearchQuery}
        route={route}
        setRoute={setRoute}
      />
      <Table
        fetchedData={fetchedData}
        searchQuery={searchQuery}
        route={route}
      />
    </Suspense>
  );
}

// Memoize the Search component to prevent unnecessary renders
export default memo(Search);
