import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useLocation } from "react-router-dom";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
const baseUrl = "http://localhost:3000/researches/";
function PdfViewer() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pdfUrl = decodeURIComponent(query.get("data"));
  console.log(pdfUrl);
  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={`${baseUrl}${pdfUrl}`} />
      </Worker>
    </div>
  );
}

export default PdfViewer;
