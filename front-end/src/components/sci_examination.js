import React from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { spec } from "../pages/judge-info";
import { useFetch } from "../hooks/usefetch";

const baseUrl = "http://localhost:3000";

function SciExamination({ setResearchData, researchData, warn }) {
  const display3rd = () => {
    if (
      researchData.exmn_result["0"] === "غير صالح للنشر" &&
      researchData.exmn_result["1"] === "غير صالح للنشر"
    ) {
      return false;
    }
    if (
      researchData.exmn_result["0"] === "غير صالح للنشر" ||
      researchData.exmn_result["1"] === "غير صالح للنشر"
    ) {
      return true;
    } else {
      return false;
    }
  };

  // const { fetchedData, fetchData } = useFetch();
  // const handleSearch = (params) => {
  //   fetchData(`${baseUrl}${params}`);
  // };
  return (
    <>
      <h3 className="full-grid-width up-border mb-3">الفحص العلمي</h3>
      <div className="full-grid-width row mb-2">
        {/* <Form.Group className="col">
          <Form.Label>التخصص</Form.Label>
          <Form.Select
            type="text"
            // value={}
            onChange={(e) => {
              const selectedValue = e.target.value;
              handleSearch(`/api/judge-info/${selectedValue}`);
            }}
            aria-label="Default select example"
          >
            <option value="">اختر التخصص العلمي</option>
            {spec.map((e, i) => {
              return (
                <option key={i} value={e}>
                  {e}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="col">
          <Form.Label>المحكم الأول</Form.Label>
          <Form.Select
            type="text"
            className={`mb-1`}
            value={researchData?.judge_namee["0"]}
            onChange={(e) => {
              const [degree, name] = e.target.value.split("/");
              setResearchData({
                ...researchData,
                degree: {
                  ...researchData["degree"],
                  0: degree,
                },
                judge_namee: {
                  ...researchData["judge_namee"],
                  0: name,
                },
              });
            }}
            aria-label="Default select example"
          >
            <option value="" hidden>
              اختر المحكم
            </option>
            {fetchedData.data
              ? fetchedData.data.map((ele) => {
                  return (
                    <option
                      key={ele.id}
                      value={`${ele.degree}/ ${ele.j_name}`}
                    >{`${ele.degree}/ ${ele.j_name}`}</option>
                  );
                })
              : null}
          </Form.Select>
        </Form.Group> */}
        <Form.Group className="col">
          <Form.Label>الدرجة العلمية</Form.Label>
          <Form.Select
            type="text"
            className={`mb-1`}
            value={researchData?.degree["0"] || ""}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setResearchData({
                ...researchData,
                degree: {
                  ...researchData["degree"],
                  0:
                    selectedValue === "اختر الدرجة العلمية"
                      ? ""
                      : selectedValue,
                },
              });
            }}
            aria-label="Default select example"
          >
            <option value={null}>اختر الدرجة العلمية</option>
            <option value="لواء أستاذ دكتور">لواء أستاذ دكتور</option>
            <option value="عميد أستاذ دكتور">عميد أستاذ دكتور</option>
            <option value="عقيد أستاذ دكتور">عقيد أستاذ دكتور</option>
            <option value="أستاذ دكتور">أستاذ دكتور</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col">
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
            value={researchData.judge_namee["0"] || ""}
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

        <Form.Group className="col">
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
            value={researchData.judge_letter["0"] || ""}
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

        <Form.Group className="col">
          <Form.Label> تاريخ الإرسال </Form.Label>
          <DatePicker
            className={
              warn
                ? researchData.letter_date && researchData.letter_date["0"]
                  ? "form-control"
                  : "invalid-input form-control"
                : "form-control"
            }
            selected={researchData.letter_date["0"] || ""}
            dateFormat="dd/MM/yyyy" // Set the desired format here
            isClearable
            placeholderText="DD/MM/YYY"
            onChange={(e) => {
              setResearchData({
                ...researchData,
                letter_date: {
                  ...researchData["letter_date"],
                  0: e,
                },
              });
            }}
          />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>النتيجة</Form.Label>
          <Form.Select
            type="text"
            value={researchData.exmn_result["0"] || ""}
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
      {researchData.exmn_result &&
      researchData.exmn_result["0"] === "صالح مع التعديل" ? (
        <Edit
          researchData={researchData}
          setResearchData={setResearchData}
          i={0}
        />
      ) : null}

      <div className="full-grid-width row mb-2">
        <Form.Group className="col">
          <Form.Label>الدرجة العلمية</Form.Label>
          <Form.Select
            type="text"
            className={`mb-1`}
            value={researchData?.degree["1"] || ""}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setResearchData({
                ...researchData,
                degree: {
                  ...researchData["degree"],
                  1:
                    selectedValue === "اختر الدرجة العلمية"
                      ? ""
                      : selectedValue,
                },
              });
            }}
            aria-label="Default select example"
          >
            <option value={null}>اختر الدرجة العلمية</option>
            <option value="لواء أستاذ دكتور">لواء أستاذ دكتور</option>
            <option value="عميد أستاذ دكتور">عميد أستاذ دكتور</option>
            <option value="عقيد أستاذ دكتور">عقيد أستاذ دكتور</option>
            <option value="أستاذ دكتور">أستاذ دكتور</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>إسم المحكم الثاني</Form.Label>
          <Form.Control
            className={
              warn
                ? researchData.judge_namee && researchData.judge_namee["1"]
                  ? ""
                  : "invalid-input"
                : ""
            }
            value={researchData.judge_namee["1"] || ""}
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

        <Form.Group className="col">
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
            value={researchData.judge_letter["1"] || ""}
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

        <Form.Group className="col">
          <Form.Label> تاريخ الإرسال </Form.Label>
          <DatePicker
            className={
              warn
                ? researchData.letter_date && researchData.letter_date["1"]
                  ? "form-control"
                  : "invalid-input form-control"
                : "form-control"
            }
            selected={researchData.letter_date["1"] || ""}
            dateFormat="dd/MM/yyyy" // Set the desired format here
            isClearable
            placeholderText="DD/MM/YYY"
            onChange={(e) => {
              setResearchData({
                ...researchData,
                letter_date: {
                  ...researchData["letter_date"],
                  1: e,
                },
              });
            }}
          />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>النتيجة</Form.Label>
          <Form.Select
            type="text"
            value={researchData.exmn_result["1"] || ""}
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
      {researchData.exmn_result &&
      researchData.exmn_result["1"] === "صالح مع التعديل" ? (
        <Edit
          researchData={researchData}
          setResearchData={setResearchData}
          i={1}
        />
      ) : null}
      {display3rd() ? (
        <div className="full-grid-width row mb-2">
          <Form.Group className="col">
            <Form.Label>الدرجة العلمية</Form.Label>
            <Form.Select
              type="text"
              className={`mb-1`}
              value={researchData?.degree["2"] || ""}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setResearchData({
                  ...researchData,
                  degree: {
                    ...researchData["degree"],
                    2:
                      selectedValue === "اختر الدرجة العلمية"
                        ? ""
                        : selectedValue,
                  },
                });
              }}
              aria-label="Default select example"
            >
              <option value={null}>اختر الدرجة العلمية</option>
              <option value="لواء أستاذ دكتور">لواء أستاذ دكتور</option>
              <option value="عميد أستاذ دكتور">عميد أستاذ دكتور</option>
              <option value="عقيد أستاذ دكتور">عقيد أستاذ دكتور</option>
              <option value="أستاذ دكتور">أستاذ دكتور</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>إسم المحكم الثالث</Form.Label>
            <Form.Control
              className={
                warn
                  ? researchData.judge_namee && researchData.judge_namee["2"]
                    ? ""
                    : "invalid-input"
                  : ""
              }
              value={researchData.judge_namee["2"] || ""}
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

          <Form.Group className="col">
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
              value={researchData.judge_letter["2"] || ""}
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

          <Form.Group className="col">
            <Form.Label> تاريخ الإرسال </Form.Label>
            <DatePicker
              className={
                warn
                  ? researchData.letter_date && researchData.letter_date["2"]
                    ? "form-control"
                    : "invalid-input form-control"
                  : "form-control"
              }
              selected={researchData.letter_date["2"] || ""}
              dateFormat="dd/MM/yyyy" // Set the desired format here
              isClearable
              placeholderText="DD/MM/YYY"
              onChange={(e) => {
                setResearchData({
                  ...researchData,
                  letter_date: {
                    ...researchData["letter_date"],
                    2: e,
                  },
                });
              }}
            />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>النتيجة</Form.Label>
            <Form.Select
              type="text"
              className={`mb-1 ${
                warn ? (researchData.result ? "" : "invalid-input") : ""
              }`}
              aria-label="Default select example"
              value={researchData.exmn_result["2"] || ""}
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
      ) : null}
      {researchData.exmn_result &&
      researchData.exmn_result["2"] === "صالح مع التعديل" ? (
        <Edit
          researchData={researchData}
          setResearchData={setResearchData}
          i={2}
        />
      ) : null}
    </>
  );
}

function Edit({ researchData, setResearchData, i }) {
  return (
    <div className="full-grid-width row mb-4">
      <Form.Group className="col">
        <Form.Label> رقم خطاب التعديل </Form.Label>
        <Form.Control
          type="number"
          value={researchData.edit_letter[i] || ""}
          onChange={(e) =>
            setResearchData({
              ...researchData,
              edit_letter: {
                ...researchData["edit_letter"],
                [i]: e.target.value,
              },
            })
          }
        />
      </Form.Group>

      <Form.Group className="col">
        <Form.Label> تاريخ إرسال التعديل </Form.Label>
        <DatePicker
          className={"form-control"}
          selected={researchData.edit_date[i] || ""}
          dateFormat="dd/MM/yyyy" // Set the desired format here
          isClearable
          placeholderText="DD/MM/YYY"
          onChange={(e) => {
            setResearchData({
              ...researchData,
              edit_date: {
                ...researchData["edit_date"],
                [i]: e,
              },
            });
          }}
        />
      </Form.Group>
    </div>
  );
}

export default SciExamination;
