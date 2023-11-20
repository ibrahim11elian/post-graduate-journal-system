import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { GiArchiveResearch } from "react-icons/gi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import useAuth from "../hooks/useAuth";

function Home() {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      return navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      <div className="home d-flex justify-content-center gap-4">
        <Link
          className="page d-flex flex-column justify-content-evenly align-items-center"
          to={"/add-research"}
        >
          <IoMdAddCircleOutline size={"5rem"} />
          <div>إضافة بحث</div>
        </Link>
        <Link
          className="page d-flex flex-column justify-content-evenly align-items-center"
          to={"/search"}
        >
          <GiArchiveResearch size={"5rem"} />
          <div>صفحة البحث</div>
        </Link>
        <Link
          className="page d-flex flex-column justify-content-evenly align-items-center"
          to={"/judge"}
        >
          <IoIosPerson size={"5rem"} />
          <div>المحكمين</div>
        </Link>
      </div>
    </>
  );
}

export default Home;
