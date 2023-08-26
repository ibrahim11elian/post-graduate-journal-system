import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SciExamination({ setResearchData, researchData, warn }) {
  return (
    <>
      <h3 className="full-grid-width up-border mb-3">الفحص العلمي</h3>
      <div className="full-grid-width row">
        <Form.Group className="mb-3 col">
          <Form.Label>الدرجة العلمية</Form.Label>
          <Form.Select
            type="text"
            className={`mb-1`}
            aria-label="Default select example"
          >
            <option value="لواء أستاذ دكتور">لواء أستاذ دكتور</option>
            <option value="عميد أستاذ دكتور">عميد أستاذ دكتور</option>
            <option value="عقيد أستاذ دكتور">عقيد أستاذ دكتور</option>
            <option value="أستاذ دكتور">أستاذ دكتور</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col">
          <Form.Label>إسم المحكم الأول</Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.judge_namee &&
                  researchData.judge_namee["0"].trim()
                  ? ""
                  : "invalid-input"
                : ""
            }
            onChange={(e) =>
              setResearchData({
                ...researchData,
                judge_namee: {
                  ...researchData["judge_namee"],
                  0: e.target.value,
                },
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3 col">
          <Form.Label> رقم الخطاب </Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.judge_letter &&
                  researchData.judge_letter["0"].trim()
                  ? ""
                  : "invalid-input"
                : ""
            }
            type="number"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                judge_letter: {
                  ...researchData["judge_letter"],
                  0: e.target.value,
                },
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3 col">
          <Form.Label> تاريخ الإرسال </Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.letter_date && researchData.letter_date["0"]
                  ? ""
                  : "invalid-input"
                : ""
            }
            type="date"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                letter_date: {
                  ...researchData["letter_date"],
                  0: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>النتيجة</Form.Label>
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
                exmn_result: {
                  ...researchData["exmn_result"],
                  0: e.target.value,
                },
              })
            }
          >
            <option value="none" hidden defaultValue>
              اختر النتيجة
            </option>
            <option value="صالح للنشر">صالح للنشر</option>
            <option value="صالح مع التعديل">صالح مع التعديل</option>
            <option value="غير صالح للنشر">غير صالح للنشر</option>
          </Form.Select>
        </Form.Group>
      </div>
      <div className="full-grid-width row">
        <Form.Group className="mb-3 col">
          <Form.Label>الدرجة العلمية</Form.Label>
          <Form.Select
            type="text"
            className={`mb-1`}
            aria-label="Default select example"
          >
            <option value="لواء أستاذ دكتور">لواء أستاذ دكتور</option>
            <option value="عميد أستاذ دكتور">عميد أستاذ دكتور</option>
            <option value="عقيد أستاذ دكتور">عقيد أستاذ دكتور</option>
            <option value="أستاذ دكتور">أستاذ دكتور</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col">
          <Form.Label>إسم المحكم الثاني</Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.judge_namee && researchData.judge_namee["1"]
                  ? ""
                  : "invalid-input"
                : ""
            }
            onChange={(e) =>
              setResearchData({
                ...researchData,
                judge_namee: {
                  ...researchData["judge_namee"],
                  1: e.target.value,
                },
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3 col">
          <Form.Label> رقم الخطاب </Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.judge_letter && researchData.judge_letter["1"]
                  ? ""
                  : "invalid-input"
                : ""
            }
            type="number"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                judge_letter: {
                  ...researchData["judge_letter"],
                  1: e.target.value,
                },
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3 col">
          <Form.Label> تاريخ الإرسال </Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.letter_date && researchData.letter_date["1"]
                  ? ""
                  : "invalid-input"
                : ""
            }
            type="date"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                letter_date: {
                  ...researchData["letter_date"],
                  1: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>النتيجة</Form.Label>
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
                exmn_result: {
                  ...researchData["exmn_result"],
                  1: e.target.value,
                },
              })
            }
          >
            <option value="none" hidden defaultValue>
              اختر النتيجة
            </option>
            <option value="صالح للنشر">صالح للنشر</option>
            <option value="صالح مع التعديل">صالح مع التعديل</option>
            <option value="غير صالح للنشر">غير صالح للنشر</option>
          </Form.Select>
        </Form.Group>
      </div>
      <div className="full-grid-width row">
        <Form.Group className="mb-3 col">
          <Form.Label>الدرجة العلمية</Form.Label>
          <Form.Select
            type="text"
            className={`mb-1`}
            aria-label="Default select example"
          >
            <option value="لواء أستاذ دكتور">لواء أستاذ دكتور</option>
            <option value="عميد أستاذ دكتور">عميد أستاذ دكتور</option>
            <option value="عقيد أستاذ دكتور">عقيد أستاذ دكتور</option>
            <option value="أستاذ دكتور">أستاذ دكتور</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col">
          <Form.Label>إسم المحكم الثالث</Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.judge_namee && researchData.judge_namee["2"]
                  ? ""
                  : "invalid-input"
                : ""
            }
            onChange={(e) =>
              setResearchData({
                ...researchData,
                judge_namee: {
                  ...researchData["judge_namee"],
                  2: e.target.value,
                },
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3 col">
          <Form.Label> رقم الخطاب </Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.judge_letter && researchData.judge_letter["2"]
                  ? ""
                  : "invalid-input"
                : ""
            }
            type="number"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                judge_letter: {
                  ...researchData["judge_letter"],
                  2: e.target.value,
                },
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3 col">
          <Form.Label> تاريخ الإرسال </Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.letter_date && researchData.letter_date["2"]
                  ? ""
                  : "invalid-input"
                : ""
            }
            type="date"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                letter_date: {
                  ...researchData["letter_date"],
                  2: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>النتيجة</Form.Label>
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
                exmn_result: {
                  ...researchData["exmn_result"],
                  2: e.target.value,
                },
              })
            }
          >
            <option value="none" hidden defaultValue>
              اختر النتيجة
            </option>
            <option value="صالح للنشر">صالح للنشر</option>
            <option value="صالح مع التعديل">صالح مع التعديل</option>
            <option value="غير صالح للنشر">غير صالح للنشر</option>
          </Form.Select>
        </Form.Group>
      </div>
    </>
  );
}

export default SciExamination;
