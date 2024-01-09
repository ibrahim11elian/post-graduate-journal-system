import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { GiArchiveResearch } from "react-icons/gi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import useAuth from "../hooks/useAuth";

function Home() {
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

  // Render the Home component
  return (
    // Fragment shorthand to avoid unnecessary div in the output
    <>
      {/* Render the Header component */}
      <Header />

      {/* Main content with links to different pages */}
      <div className="home row justify-content-center align-items-center gap-3 col-10 col-sm-6 col-lg-8 mx-auto mt-4">
        {/* Link to the "Add Research" page */}
        <Link
          className="fs-4 fs-sm-3 fs-lg-4 col-12 col-lg-3 page d-flex flex-column justify-content-evenly align-items-center"
          to={"/add-research"}
        >
          <IoMdAddCircleOutline size={"5rem"} />
          <div>إضافة بحث</div>
        </Link>

        {/* Link to the "Search" page */}
        <Link
          className="fs-4 fs-sm-3 fs-lg-4 col-12 col-lg-3 page d-flex flex-column justify-content-evenly align-items-center"
          to={"/search"}
        >
          <GiArchiveResearch size={"5rem"} />
          <div>صفحة البحث</div>
        </Link>

        {/* Link to the "Judge" page */}
        <Link
          className="fs-4 fs-sm-3 fs-lg-4 col-12 col-lg-3 page d-flex flex-column justify-content-evenly align-items-center"
          to={"/judge"}
        >
          <IoIosPerson size={"5rem"} />
          <div>المحكمين</div>
        </Link>
      </div>
    </>
  );
}

// Export the Home component
export default Home;
