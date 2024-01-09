import React from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useResearchContext } from "../../../hooks/useResearchContext";

function SecurityExam() {
  // Extracting state and functions from the context
  const { setResearchData, researchData, warn } = useResearchContext();

  return (
    <>
      <h3 className="full-grid-width up-border">فحص البحث</h3>

      {/* Outgoing letter details */}
      <Form.Group className="mb-3 col-12 col-sm-6">
        <Form.Label> رقم الخطاب الصادر</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.outgoing_letter ? "" : "invalid-input") : ""
          }
          type="text"
          value={researchData.outgoing_letter || ""}
          onChange={(e) =>
            setResearchData({
              ...researchData,
              outgoing_letter: e.target.value,
            })
          }
        />
      </Form.Group>

      {/* Outgoing letter date */}
      <Form.Group className="mb-3 col-12 col-sm-6">
        <Form.Label> تاريخ الخطاب الصادر </Form.Label>
        <DatePicker
          className={
            warn
              ? researchData.outgoing_date
                ? "form-control"
                : "invalid-input form-control"
              : "form-control"
          }
          selected={researchData.outgoing_date || ""}
          dateFormat="dd/MM/yyyy" // Set the desired format here
          isClearable
          placeholderText="DD/MM/YYY"
          onChange={(e) => {
            setResearchData({
              ...researchData,
              outgoing_date: e,
            });
          }}
        />
      </Form.Group>

      {/* Incoming letter details */}
      <Form.Group className="mb-3 col-12 col-sm-6">
        <Form.Label> رقم الخطاب الوارد</Form.Label>
        <Form.Control
          className={
            warn && (researchData.incoming_date || researchData.result)
              ? researchData.incoming_letter
                ? ""
                : "invalid-input"
              : ""
          }
          type="text"
          value={researchData.incoming_letter || ""}
          onChange={(e) =>
            setResearchData({
              ...researchData,
              incoming_letter: e.target.value,
            })
          }
        />
      </Form.Group>

      {/* Incoming letter date */}
      <Form.Group className="mb-3 col-12 col-sm-6">
        <Form.Label> تاريخ الخطاب الوارد </Form.Label>
        <DatePicker
          className={
            warn && (researchData.incoming_letter || researchData.result)
              ? researchData.incoming_date
                ? "form-control"
                : "invalid-input form-control"
              : "form-control"
          }
          selected={researchData.incoming_date || ""}
          dateFormat="dd/MM/yyyy" // Set the desired format here
          isClearable
          placeholderText="DD/MM/YYY"
          onChange={(e) => {
            setResearchData({
              ...researchData,
              incoming_date: e,
            });
          }}
        />
      </Form.Group>

      {/* Examination result */}
      <Form.Group className="col-12 col-sm-6">
        <Form.Label className="col-auto">نتيجة الفحص:</Form.Label>
        <Form.Select
          type="text"
          value={researchData.result || ""}
          className={`mb-1 ${
            warn && (researchData.incoming_letter || researchData.incoming_date)
              ? researchData.result
                ? ""
                : "invalid-input"
              : ""
          }`}
          aria-label="Default select example"
          onChange={(e) => {
            const selectedValue = e.target.value;
            setResearchData({
              ...researchData,
              result: selectedValue === "اختر النتيجة" ? "" : selectedValue,
            });
          }}
        >
          <option value={null}>اختر النتيجة</option>
          <option value="صالح للتحكيم">صالح للتحكيم</option>
          <option value="غير صالح للتحكيم">غير صالح للتحكيم</option>
        </Form.Select>
      </Form.Group>
    </>
  );
}

export default SecurityExam;
