import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import postData from "../utilities/post-data";
import Header from "../components/header";
import { isValid } from "../utilities/form-validation";
import { Link } from "react-router-dom";

const rData = {
  researcher_name: undefined,
  workplace: undefined,
  rank: undefined,
  email: undefined,
  phone: undefined,
  research_date: undefined,
  research_title: undefined,
  journal_edition: 0,
  edition_date: "",
  outgoing_letter: undefined,
  incoming_letter: undefined,
  result: undefined,
  judge_namee: undefined,
  judge_letter: undefined,
  letter_date: undefined,
  exmn_result: undefined,
};

function AddResearch() {
  const [researchData, setResearchData] = useState({ ...rData });
  const [files, setFiles] = useState({});
  const [prof, setProf] = useState(false);

  useEffect(() => {
    setResearchData({
      ...researchData,
      rank: prof
        ? researchData.rank.includes("دكتور")
          ? researchData.rank
          : `${researchData.rank} دكتور`
        : researchData.rank,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prof]);

  const handleEditionNumberChange = (e) => {
    if (e.target.value !== "") {
      const newEditionNumber = parseInt(e.target.value, 10);

      // Calculate and set the edition date based on the release schedule
      const isMarch = newEditionNumber % 2 === 0;
      const releaseMonth = isMarch ? 3 : 10; // March or October
      const firstEditionYear = 2000;
      let releaseYear =
        firstEditionYear + Math.floor((newEditionNumber - 1) / 2);
      releaseYear = isMarch ? releaseYear : releaseYear - 1;
      const calculatedEditionDate = new Date(releaseYear, releaseMonth - 1, 2);

      setResearchData({
        ...researchData,
        edition_date: calculatedEditionDate.toISOString().split("T")[0],
        journal_edition: newEditionNumber,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid({ ...researchData }, { ...files })
      ? postData(researchData, files)
      : console.error("form data is not valid!!");
  };

  return (
    <div className="add-search container-md">
      <Header />
      <div className="d-flex justify-content-between form-container">
        <h2 className="title ">إضافة بحث</h2>
        <Link to={"/search"}>
          <Button className="add col-auto form-container" variant="primary">
            صفحة البحث
          </Button>
        </Link>
      </div>
      <Form className="form form-container" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>إسم الضابط</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                researcher_name: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>جهة العمل</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              setResearchData({ ...researchData, workplace: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>الرتبة</Form.Label>
          <Form.Select
            type="text"
            className="mb-1"
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
            type="email"
            onChange={(e) =>
              setResearchData({ ...researchData, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>رقم الهاتف</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) =>
              setResearchData({ ...researchData, phone: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> تاريخ تقديم البحث</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                research_date: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>عنوان البحث</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                research_title: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>نسخة البحث</Form.Label>
          <Form.Control
            type="file"
            name="pdf"
            onChange={(e) =>
              setFiles({ ...files, research_pdf: e.target.files[0] })
            }
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>السيرة الذاتية</Form.Label>
          <Form.Control
            type="file"
            name="cv"
            onChange={(e) => setFiles({ ...files, cv: e.target.files[0] })}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>ملخص انجليزي</Form.Label>
          <Form.Control
            type="file"
            name="summary"
            onChange={(e) =>
              setFiles({ ...files, research_summary: e.target.files[0] })
            }
          />
        </Form.Group>

        <h3 className="full-grid-width up-border">عدد المجلة</h3>

        <Form.Group className="mb-3">
          <Form.Label> رقم العدد</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => handleEditionNumberChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> تاريخ العدد </Form.Label>
          <Form.Control
            type="date"
            value={researchData.edition_date}
            readOnly
          />
        </Form.Group>

        <h3 className="full-grid-width up-border">فحص البحث</h3>

        <Form.Group className="mb-3">
          <Form.Label> رقم الخطاب الصادر</Form.Label>
          <Form.Control
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
          <Form.Label> رقم الخطاب الوارد</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) =>
              setResearchData({
                ...researchData,
                incoming_letter: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="full-grid-width row">
          <Form.Label className="col-auto">نتيجة الفحص:</Form.Label>

          <div className="mb-3 col radios">
            <Form.Check
              inline
              label="صالح للتحكيم"
              name="group1"
              type="radio"
              value={"صالح للتحكيم"}
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  result: e.target.value,
                })
              }
            />
            <Form.Check
              inline
              label="صالح مع التعديل"
              name="group1"
              type="radio"
              value={"صالح مع التعديل"}
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  result: e.target.value,
                })
              }
            />
            <Form.Check
              inline
              name="group1"
              label="غير صالح للتحكيم"
              type="radio"
              value={"غير صالح للتحكيم "}
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  result: e.target.value,
                })
              }
            />
          </div>
        </Form.Group>

        <h3 className="full-grid-width up-border mb-3">الفحص العلمي</h3>

        <div className="full-grid-width row">
          <Form.Group className="mb-3 col">
            <Form.Label>إسم المحكم الأول</Form.Label>
            <Form.Control
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
        </div>

        <div className="full-grid-width row">
          <Form.Group className="mb-3 col">
            <Form.Label>إسم المحكم الثاني</Form.Label>
            <Form.Control
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
        </div>

        <div className="full-grid-width row">
          <Form.Group className="mb-3 col">
            <Form.Label>إسم المحكم الثالث (إختياري)</Form.Label>
            <Form.Control
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
        </div>

        <h3 className="full-grid-width up-border mb-3">رد المحكمين</h3>

        <Form.Group className="full-grid-width row">
          <Form.Label className="col-auto"> المحكم الأول:</Form.Label>

          <div className="mb-3 col radios">
            <Form.Check
              inline
              label="صالح للنشر"
              name="group2"
              type="radio"
              value={"صالح للنشر"}
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  exmn_result: {
                    ...researchData["exmn_result"],
                    0: e.target.value,
                  },
                })
              }
            />
            <Form.Check
              inline
              label="صالح مع التعديل"
              name="group2"
              type="radio"
              value={"صالح مع التعديل"}
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  exmn_result: {
                    ...researchData["exmn_result"],
                    0: e.target.value,
                  },
                })
              }
            />
            <Form.Check
              inline
              name="group2"
              label="غير صالح للنشر"
              type="radio"
              value="غير صالح للنشر"
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  exmn_result: {
                    ...researchData["exmn_result"],
                    0: e.target.value,
                  },
                })
              }
            />
          </div>
        </Form.Group>

        <Form.Group className="full-grid-width row">
          <Form.Label className="col-auto"> المحكم الثاني:</Form.Label>

          <div className="mb-3 col radios">
            <Form.Check
              inline
              label="صالح للنشر"
              name="group3"
              type="radio"
              value={"صالح للنشر"}
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  exmn_result: {
                    ...researchData["exmn_result"],
                    1: e.target.value,
                  },
                })
              }
            />
            <Form.Check
              inline
              label="صالح مع التعديل"
              name="group3"
              type="radio"
              value={"صالح مع التعديل"}
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  exmn_result: {
                    ...researchData["exmn_result"],
                    1: e.target.value,
                  },
                })
              }
            />
            <Form.Check
              inline
              name="group3"
              label="غير صالح للنشر"
              type="radio"
              value="غير صالح للنشر"
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  exmn_result: {
                    ...researchData["exmn_result"],
                    1: e.target.value,
                  },
                })
              }
            />
          </div>
        </Form.Group>

        <Form.Group className="full-grid-width row">
          <Form.Label className="col-auto ml-0">
            المحكم الثالث (إختياري):
          </Form.Label>

          <div className="mb-3 col radios">
            <Form.Check
              inline
              label="صالح للنشر"
              name="group4"
              type="radio"
              value={"صالح للنشر"}
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  exmn_result: {
                    ...researchData["exmn_result"],
                    2: e.target.value,
                  },
                })
              }
            />
            <Form.Check
              inline
              label="صالح مع التعديل"
              name="group4"
              type="radio"
              value={"صالح مع التعديل"}
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  exmn_result: {
                    ...researchData["exmn_result"],
                    2: e.target.value,
                  },
                })
              }
            />
            <Form.Check
              inline
              name="group4"
              label="غير صالح للنشر"
              value="غير صالح للنشر"
              type="radio"
              onClick={(e) =>
                setResearchData({
                  ...researchData,
                  exmn_result: {
                    ...researchData["exmn_result"],
                    2: e.target.value,
                  },
                })
              }
            />
          </div>
        </Form.Group>

        <div className="buttons full-grid-width row justify-content-center">
          {" "}
          <Button className="col-auto" variant="danger">
            إلغاء
          </Button>
          <Button
            className="col-auto"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            تأكيد
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddResearch;
