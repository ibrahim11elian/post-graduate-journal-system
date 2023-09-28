import React from "react";
import { Routes, Route } from "react-router-dom";
import AddResearch from "./pages/add-research";
import Search from "./pages/search";
import Error from "./pages/error";
import Details from "./pages/details";
import { ToastContainer } from "react-toastify";
import EditResearch from "./pages/edit-research";
import JudgeInfo from "./pages/judge-info";
import Home from "./pages/home-page";

function App() {
  return (
    <div className="container-xxl App" lang="ar" dir="rtl">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-research" element={<AddResearch />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details" element={<Details />} />
        <Route path="/edit" element={<EditResearch />} />
        <Route path="/judge" element={<JudgeInfo />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
