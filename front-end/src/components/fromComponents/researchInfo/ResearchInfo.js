import React from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useResearchContext } from "../../../hooks/useResearchContext";

function ResearchInfo() {
  // Extracting state and functions from the context
  const { setResearchData, researchData, warn, files, setFiles } =
    useResearchContext();

  // Display the selected file names
  const pdf = files.research_pdf ? files.research_pdf.name : "";
  const en = files.research_summary ? files.research_summary.name : "";
  const ar = files.research_summary_ar ? files.research_summary_ar.name : "";

  return (
    <>
      <h3 className="full-grid-width up-border">معلومات البحث</h3>

      {/* Research title input */}
      <Form.Group className="mb-3 col-12 col-sm-6">
        <Form.Label>عنوان البحث</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.research_title ? "" : "invalid-input") : ""
          }
          value={researchData.research_title}
          type="text"
          onChange={(e) =>
            setResearchData({
              ...researchData,
              research_title: e.target.value,
            })
          }
        />
      </Form.Group>

      {/* Research submission date input */}
      <Form.Group className="mb-3 col-12 col-sm-6">
        <Form.Label> تاريخ تقديم البحث</Form.Label>
        <DatePicker
          className={
            warn
              ? researchData.research_date
                ? "form-control"
                : "invalid-input form-control"
              : "form-control"
          }
          selected={researchData.research_date}
          dateFormat="dd/MM/yyyy" // Set the desired format here
          isClearable
          placeholderText="DD/MM/YYY"
          onChange={(e) => {
            setResearchData({
              ...researchData,
              research_date: e,
            });
          }}
        />
      </Form.Group>

      {/* Research PDF file input */}
      <Form.Group controlId="formFile" className="mb-3 col-12 col-sm-6">
        <Form.Label>نسخة البحث</Form.Label>
        <span className="file-name">:{pdf}</span>
        <Form.Control
          className={warn ? (files.research_pdf ? "" : "invalid-input") : ""}
          type="file"
          name="pdf"
          onChange={(e) =>
            setFiles({ ...files, research_pdf: e.target.files[0] })
          }
        />
      </Form.Group>

      {/* English summary file input */}
      <Form.Group controlId="formFile" className="mb-3 col-12 col-sm-6">
        <Form.Label>ملخص انجليزي</Form.Label>
        <span className="file-name">:{en}</span>
        <Form.Control
          type="file"
          name="summary"
          onChange={(e) =>
            setFiles({ ...files, research_summary: e.target.files[0] })
          }
        />
      </Form.Group>

      {/* Arabic summary file input */}
      <Form.Group controlId="formFile" className="mb-3 col-12 col-sm-6">
        <Form.Label>ملخص عربي</Form.Label>
        <span className="file-name">:{ar}</span>
        <Form.Control
          type="file"
          name="summary"
          onChange={(e) =>
            setFiles({ ...files, research_summary_ar: e.target.files[0] })
          }
        />
      </Form.Group>
    </>
  );
}

export default ResearchInfo;
