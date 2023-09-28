import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { spec } from "../pages/judge-info";
import { useFetch } from "../hooks/usefetch";
import Button from "react-bootstrap/Button";
import { AiOutlineMore } from "react-icons/ai";

const baseUrl = "http://localhost:3000";

function SciExamination({ setResearchData, researchData, warn }) {
  const [chose, setChose] = useState({
    0: researchData.judge_namee["0"] ? false : true,
    1: researchData.judge_namee["1"] ? false : true,
    2: researchData.judge_namee["2"] ? false : true,
  });

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

  const { fetchedData, fetchData } = useFetch();
  const handleSearch = (params) => {
    fetchData(`${baseUrl}${params}`);
  };

  useEffect(() => {
    researchData.judge_namee["0"]
      ? setChose({ ...chose, 0: false })
      : setChose({ ...chose, 0: true });

    researchData.judge_namee["1"]
      ? setChose({ ...chose, 1: false })
      : setChose({ ...chose, 1: true });

    researchData.judge_namee["2"]
      ? setChose({ ...chose, 2: false })
      : setChose({ ...chose, 2: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 className="full-grid-width up-border mb-3">الفحص العلمي</h3>
      <div className="full-grid-width row mb-2 align-items-center">
        {chose["0"] ? (
          <>
            <Specialization handleSearch={handleSearch} />

            <Form.Group className="col">
              <Form.Label>المحكم الأول</Form.Label>
              <Form.Select
                type="text"
                className={`mb-1`}
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
            </Form.Group>
          </>
        ) : (
          <>
            <Button
              style={{
                width: "fit-content",
              }}
              className="mt-4 btn-details"
              onClick={() => setChose({ ...chose, 0: true })}
            >
              <AiOutlineMore color="#0d6efd" size={"1.5rem"} />
            </Button>
            <Form.Group className="col">
              <Form.Label>المحكم الأول</Form.Label>
              <Form.Control
                value={`${researchData?.degree["0"]}/ ${researchData?.judge_namee["0"]}`}
                disabled
              />
            </Form.Group>
          </>
        )}

        <Form.Group className="col">
          <Form.Label> رقم الخطاب </Form.Label>
          <Form.Control
            type="text"
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
            selected={researchData.letter_date["0"] || ""}
            className="form-control"
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
            className={`mb-1`}
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
        {chose["1"] ? (
          <>
            <Specialization handleSearch={handleSearch} />

            <Form.Group className="col">
              <Form.Label>المحكم الثاني</Form.Label>
              <Form.Select
                type="text"
                className={`mb-1`}
                onChange={(e) => {
                  const [degree, name] = e.target.value.split("/");
                  setResearchData({
                    ...researchData,
                    degree: {
                      ...researchData["degree"],
                      1: degree,
                    },
                    judge_namee: {
                      ...researchData["judge_namee"],
                      1: name,
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
            </Form.Group>
          </>
        ) : (
          <>
            <Button
              style={{
                width: "fit-content",
              }}
              className="mt-4 btn-details"
              onClick={() => setChose({ ...chose, 1: true })}
            >
              <AiOutlineMore color="#0d6efd" size={"1.5rem"} />
            </Button>
            <Form.Group className="col">
              <Form.Label>المحكم الثاني</Form.Label>
              <Form.Control
                className={
                  warn
                    ? researchData.judge_namee &&
                      researchData.judge_namee["1"].trim()
                      ? ""
                      : "invalid-input"
                    : ""
                }
                value={`${researchData?.degree["1"]}/ ${researchData?.judge_namee["1"]}`}
                disabled
              />
            </Form.Group>
          </>
        )}

        <Form.Group className="col">
          <Form.Label> رقم الخطاب </Form.Label>
          <Form.Control
            type="text"
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
            selected={researchData.letter_date["1"] || ""}
            className="form-control"
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
            className={`mb-1`}
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
          {chose["2"] ? (
            <>
              <Specialization handleSearch={handleSearch} />

              <Form.Group className="col">
                <Form.Label>المحكم الأول</Form.Label>
                <Form.Select
                  type="text"
                  className={`mb-1`}
                  onChange={(e) => {
                    const [degree, name] = e.target.value.split("/");
                    setResearchData({
                      ...researchData,
                      degree: {
                        ...researchData["degree"],
                        2: degree,
                      },
                      judge_namee: {
                        ...researchData["judge_namee"],
                        2: name,
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
              </Form.Group>
            </>
          ) : (
            <>
              <Button
                style={{
                  width: "fit-content",
                }}
                className="mt-4 btn-details"
                onClick={() => setChose({ ...chose, 2: true })}
              >
                <AiOutlineMore color="#0d6efd" size={"1.5rem"} />
              </Button>
              <Form.Group className="col">
                <Form.Label>المحكم الأول</Form.Label>
                <Form.Control
                  value={`${researchData?.degree["2"]}/ ${researchData?.judge_namee["2"]}`}
                  disabled
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="col">
            <Form.Label> رقم الخطاب </Form.Label>
            <Form.Control
              type="text"
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
              selected={researchData.letter_date["2"] || ""}
              className="form-control"
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
              className={`mb-1`}
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
          type="text"
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

function Specialization({ handleSearch }) {
  return (
    <Form.Group className="col">
      <Form.Label>التخصص</Form.Label>
      <Form.Select
        type="text"
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
  );
}

export default SciExamination;
