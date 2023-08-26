import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SecurityExam({ setResearchData, researchData, warn }) {
  return (
    <>
      <h3 className="full-grid-width up-border">فحص البحث</h3>
      <Form.Group className="mb-3">
        <Form.Label> رقم الخطاب الصادر</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.outgoing_letter ? "" : "invalid-input") : ""
          }
          type="number"
          onChange={(e) =>
            setResearchData({
              ...researchData,
              outgoing_letter: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> تاريخ الخطاب الصادر </Form.Label>
        <Form.Control
          className={
            warn ? (researchData.research_date ? "" : "invalid-input") : ""
          }
          type="date"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> رقم الخطاب الوارد</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.incoming_letter ? "" : "invalid-input") : ""
          }
          type="number"
          onChange={(e) =>
            setResearchData({
              ...researchData,
              incoming_letter: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> تاريخ الخطاب الوارد </Form.Label>
        <Form.Control
          className={
            warn ? (researchData.research_date ? "" : "invalid-input") : ""
          }
          type="date"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="col-auto">نتيجة الفحص:</Form.Label>
        <Form.Select
          type="text"
          value={researchData.result}
          className={`mb-1 ${
            warn ? (researchData.result ? "" : "invalid-input") : ""
          }`}
          aria-label="Default select example"
          onChange={(e) =>
            setResearchData({
              ...researchData,
              result: e.target.value,
            })
          }
        >
          <option value="none" hidden defaultValue>
            اختر النتيجة
          </option>
          <option value="صالح للتحكيم">صالح للتحكيم</option>
          <option value="غير صالح للتحكيم">غير صالح للتحكيم</option>
        </Form.Select>
      </Form.Group>
    </>
  );
}

export default SecurityExam;
