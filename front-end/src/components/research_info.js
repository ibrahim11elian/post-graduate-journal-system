import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ResearchInfo({
  setResearchData,
  researchData,
  warn,
  files,
  setFiles,
}) {
  return (
    <>
      <h3 className="full-grid-width up-border">معلومات البحث</h3>
      <Form.Group className="mb-3">
        <Form.Label>عنوان البحث</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.research_title ? "" : "invalid-input") : ""
          }
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
        <Form.Control
          className={
            warn ? (files.research_summary ? "" : "invalid-input") : ""
          }
          type="file"
          name="summary"
          onChange={(e) =>
            setFiles({ ...files, research_summary: e.target.files[0] })
          }
        />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>ملخص عربي</Form.Label>
        <Form.Control
          className={
            warn ? (files.research_summary ? "" : "invalid-input") : ""
          }
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
