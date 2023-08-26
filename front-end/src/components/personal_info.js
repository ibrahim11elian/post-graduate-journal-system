import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function PersonalInfo({
  setResearchData,
  researchData,
  warn,
  setProf,
  prof,
  setEmailValid,
  emailValid,
  files,
  setFiles,
}) {
  // Display the selected file name
  const fileName = files.cv ? files.cv.name : "";

  return (
    <>
      <h3 className="full-grid-width up-border">المعلومات الشخصية</h3>
      <Form.Group className="mb-3 col" controlId="formBasicEmail">
        <Form.Label>إسم الضابط</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.researcher_name ? "" : "invalid-input") : ""
          }
          type="text"
          value={researchData.researcher_name}
          onChange={(e) =>
            setResearchData({
              ...researchData,
              researcher_name: e.target.value,
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3 col">
        <Form.Label>جهة العمل</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.workplace ? "" : "invalid-input") : ""
          }
          type="text"
          value={researchData.workplace}
          onChange={(e) =>
            setResearchData({ ...researchData, workplace: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>الرتبة</Form.Label>
        <Form.Select
          type="text"
          value={researchData.rank}
          className={`mb-1 ${
            warn ? (researchData.rank ? "" : "invalid-input") : ""
          }`}
          aria-label="Default select example"
          onChange={(e) =>
            setResearchData({
              ...researchData,
              rank: e.target.value,
            })
          }
        >
          <option value="none" hidden defaultValue>
            إختر الرتبة
          </option>
          <option value="ملازم أول">ملازم أول</option>
          <option value="نقيب">نقيب</option>
          <option value="رائد">رائد</option>
          <option value="مقدم">مقدم</option>
          <option value="عقيد">عقيد</option>
          <option value="عميد">عميد</option>
          <option value="لواء">لواء</option>
        </Form.Select>
        <Form.Check
          type="checkbox"
          label="دكتور ؟"
          defaultChecked={prof}
          onClick={() => {
            researchData.rank ? setProf(!prof) : setProf(prof);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>البريد الإلكتروني</Form.Label>
        <Form.Control
          className={
            warn
              ? researchData.email && emailValid
                ? ""
                : "invalid-input"
              : ""
          }
          type="email"
          value={researchData.email}
          onChange={(e) => {
            setEmailValid(true);
            setResearchData({ ...researchData, email: e.target.value });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>رقم الهاتف</Form.Label>
        <Form.Control
          className={warn ? (researchData.phone ? "" : "invalid-input") : ""}
          type="number"
          value={researchData.phone}
          onChange={(e) =>
            setResearchData({ ...researchData, phone: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>السيرة الذاتية</Form.Label>
        <span className="file-name">:{fileName}</span>
        <Form.Control
          className={warn ? (files.cv ? "" : "invalid-input") : ""}
          type="file"
          name="cv"
          onChange={(e) => setFiles({ ...files, cv: e.target.files[0] })}
        />
      </Form.Group>
    </>
  );
}

export default PersonalInfo;
