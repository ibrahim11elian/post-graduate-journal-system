import React from "react";
import Form from "react-bootstrap/Form";

function ResearchInfo({
  setResearchData,
  researchData,
  warn,
  files,
  setFiles,
}) {
  // Display the selected file name
  const pdf = files.research_pdf ? files.research_pdf.name : "";
  const en = files.research_summary ? files.research_summary.name : "";
  const ar = files.research_summary_ar ? files.research_summary_ar.name : "";
  return (
    <>
      <h3 className="full-grid-width up-border">معلومات البحث</h3>
      <Form.Group className="mb-3">
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
      <Form.Group className="mb-3">
        <Form.Label> تاريخ تقديم البحث</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.research_date ? "" : "invalid-input") : ""
          }
          type="date"
          value={researchData.research_date}
          onChange={(e) =>
            setResearchData({
              ...researchData,
              research_date: e.target.value,
            })
          }
        />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
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
      <Form.Group controlId="formFile" className="mb-3">
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
      <Form.Group controlId="formFile" className="mb-3">
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
