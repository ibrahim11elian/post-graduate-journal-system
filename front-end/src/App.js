import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddResearch from "./pages/add-research";
import Search from "./pages/search";
import Error from "./pages/error";
import Details from "./pages/details";
import PdfViewer from "./pages/pdf-viewer";

function App() {
  const [researchDetails, setResearcherDetails] = useState("");
  return (
    <div className="container-fluid App" lang="ar" dir="rtl">
      <Routes>
        <Route path="/" element={<AddResearch />} />
        <Route
          path="/search"
          element={<Search setResearch={setResearcherDetails} />}
        />
        <Route
          path="/details"
          element={<Details research={researchDetails} />}
        />
        <Route path="/viewer" element={<PdfViewer />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
