import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import postData from "../utilities/post-data.ts";
import { isValid } from "../utilities/form-validation.ts";

const rData = {
  researcher_name: undefined,
  workplace: undefined,
  rank: undefined,
  email: undefined,
  phone: undefined,
  research_date: undefined,
  research_title: undefined,
  research_pdf: undefined,
  research_summary: undefined,
  cv: undefined,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid({ ...researchData, ...files })
      ? postData(researchData, files)
      : alert("دخل كل الداتا صح");
  };

  return (
    <div className="add-search">
      <Header />
      <h2 className="title form-container">إضافة بحث</h2>
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
          <Form.Control type="number" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> تاريخ العدد </Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <h3 className="full-grid-width up-border">فحص البحث</h3>

        <Form.Group className="mb-3">
          <Form.Label> رقم الخطاب الصادر</Form.Label>
          <Form.Control type="number" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> رقم الخطاب الوارد</Form.Label>
          <Form.Control type="number" />
        </Form.Group>

        <Form.Group className="full-grid-width row">
          <Form.Label className="col-auto">نتيجة الفحص:</Form.Label>

          <div className="mb-3 col radios">
            <Form.Check
              inline
              label="صالح للتحكيم"
              name="group1"
              type="radio"
            />
            <Form.Check
              inline
              label="صالح مع التعديل"
              name="group1"
              type="radio"
            />
            <Form.Check
              inline
              name="group1"
              label="غير صالح للتحكيم"
              type="radio"
            />
          </div>
        </Form.Group>

        <h3 className="full-grid-width up-border mb-3">الفحص العلمي</h3>

        <div className="full-grid-width row">
          <Form.Group className="mb-3 col">
            <Form.Label>إسم المحكم الأول</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3 col">
            <Form.Label> رقم الخطاب </Form.Label>
            <Form.Control type="number" />
          </Form.Group>

          <Form.Group className="mb-3 col">
            <Form.Label> تاريخ الإرسال </Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </div>

        <div className="full-grid-width row">
          <Form.Group className="mb-3 col">
            <Form.Label>إسم المحكم الثاني</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3 col">
            <Form.Label> رقم الخطاب </Form.Label>
            <Form.Control type="number" />
          </Form.Group>

          <Form.Group className="mb-3 col">
            <Form.Label> تاريخ الإرسال </Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </div>

        <div className="full-grid-width row">
          <Form.Group className="mb-3 col">
            <Form.Label>إسم المحكم الثالث (إختياري)</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3 col">
            <Form.Label> رقم الخطاب </Form.Label>
            <Form.Control type="number" />
          </Form.Group>

          <Form.Group className="mb-3 col">
            <Form.Label> تاريخ الإرسال </Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </div>

        <h3 className="full-grid-width up-border mb-3">رد المحكمين</h3>

        <Form.Group className="full-grid-width row">
          <Form.Label className="col-auto"> المحكم الأول:</Form.Label>

          <div className="mb-3 col radios">
            <Form.Check inline label="صالح للنشر" name="group2" type="radio" />
            <Form.Check
              inline
              label="صالح مع التعديل"
              name="group2"
              type="radio"
            />
            <Form.Check
              inline
              name="group2"
              label="غير صالح للنشر"
              type="radio"
            />
          </div>
        </Form.Group>

        <Form.Group className="full-grid-width row">
          <Form.Label className="col-auto"> المحكم الثاني:</Form.Label>

          <div className="mb-3 col radios">
            <Form.Check inline label="صالح للنشر" name="group3" type="radio" />
            <Form.Check
              inline
              label="صالح مع التعديل"
              name="group3"
              type="radio"
            />
            <Form.Check
              inline
              name="group3"
              label="غير صالح للنشر"
              type="radio"
            />
          </div>
        </Form.Group>

        <Form.Group className="full-grid-width row">
          <Form.Label className="col-auto ml-0">
            المحكم الثالث (إختياري):
          </Form.Label>

          <div className="mb-3 col radios">
            <Form.Check inline label="صالح للنشر" name="group4" type="radio" />
            <Form.Check
              inline
              label="صالح مع التعديل"
              name="group4"
              type="radio"
            />
            <Form.Check
              inline
              name="group4"
              label="غير صالح للنشر"
              type="radio"
            />
          </div>
        </Form.Group>

        <h3 className="full-grid-width up-border mb-3">
          النسخة النهائية بعد التعديل
        </h3>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>البحث بعد التعديل</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Form.Group className="mb-3 col">
          <Form.Label> رقم العدد </Form.Label>
          <Form.Control type="number" />
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

// function Table() {
//   const currentDate = new Date();
//   const formattedDate = currentDate.toLocaleDateString("en-US", {
//     month: "numeric",
//     day: "numeric",
//     year: "numeric",
//   });
//   return (
//     <>
//       <Header />
//       <Container fluid>
//         <table class="table mt-5">
//           <thead className="table-header ">
//             <tr>
//               <th scope="col rounded-start">الإسم</th>
//               <th scope="col">عنوان البحث</th>
//               <th scope="col">عدد المجلة</th>
//               <th scope="col">تاريخ التقديم</th>
//               <th scope="col">الهاتف</th>
//               <th scope="col rounded-end">البريد الإلكتروني</th>
//               <th scope="col"></th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <p className="name">محمد السيد محمد</p>
//                 <p className="rank">عميد</p>
//               </td>
//               <td>Lorem ipsum dolor sit amet.</td>
//               <td>12</td>
//               <td>{formattedDate}</td>
//               <td>012875469</td>
//               <td>mdo@gmail.com</td>
//               <td>
//                 <Button className="btn-details">تفاصيل</Button>
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <p className="name">محمد السيد محمد</p>
//                 <p className="rank">عميد</p>
//               </td>
//               <td>Jacob Lorem ipsum dolor sit.</td>
//               <td>34</td>
//               <td>{formattedDate}</td>
//               <td>0103874783</td>
//               <td>fat@gmail.com</td>
//               <td>
//                 <Button className="btn-details">تفاصيل</Button>
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <p className="name">محمد السيد محمد</p>
//                 <p className="rank">عميد</p>
//               </td>
//               <td>Larry Lorem, ipsum.</td>
//               <td>54</td>
//               <td>{formattedDate}</td>
//               <td>011465776</td>
//               <td>twitter@gmail.com</td>
//               <td>
//                 <Button className="btn-details">تفاصيل</Button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </Container>
//     </>
//   );
// }

function Header() {
  return (
    <header className="add-header">
      <img
        className="head-img"
        src="./images/police.png"
        alt="وزارة الداخلية"
      />
      <p>مجلة كلية الدراسات العليا</p>
      <img
        className="head-img"
        src="./images/post.png"
        alt="كلية الدراسات العليا"
      />
    </header>
  );
}

export default AddResearch;
