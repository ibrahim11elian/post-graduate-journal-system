import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Table({ fetchedData }) {
  const researchStatus = (research) => {
    if (research.examination.result === "صالح للتحكيم") {
      let validResponses = 0;
      let invalidResponses = 0;
      research.judgeExamination.forEach((element) => {
        if (
          element.examination_details.result === "صالح للنشر" ||
          element.examination_details.result === "صالح مع التعديل"
        ) {
          validResponses += 1;
        } else if (element.examination_details.result === "غير صالح للنشر") {
          invalidResponses += 1;
        }
      });
      if (validResponses >= 2) {
        return "منشور";
      } else if (invalidResponses >= 2) {
        return "غير منشور";
      } else {
        return "جارى التحكيم";
      }
    } else if (research.examination.result === "غير صالح للتحكيم") {
      return "ممنوع من النشور";
    } else {
      return "جاري الفحص";
    }
  };
  return (
    <>
      <Container fluid>
        <table className="table mt-5">
          <thead className="table-header ">
            <tr>
              <th scope="col rounded-start">الإسم</th>
              <th scope="col">عنوان البحث</th>
              <th scope="col">عدد المجلة</th>
              <th scope="col">تاريخ التقديم</th>
              <th scope="col">الهاتف</th>
              <th scope="col">البريد الإلكتروني</th>
              <th scope="col rounded-end">حالة البحث</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {typeof fetchedData.data === "object" &&
            Object.keys(fetchedData.data).includes("data")
              ? fetchedData.data.data.map((e) => {
                  return (
                    <tr key={e.researcher.id}>
                      <td>
                        <p className="name">{e.researcher.researcher_name}</p>
                        <p className="rank">{e.researcher.rank}</p>
                      </td>
                      <td>{e.research.research_title}</td>
                      <td>{e.journal.journal_edition}</td>
                      <td>
                        {new Date(e.research.research_date).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td>{e.researcher.phone}</td>
                      <td>{e.researcher.email}</td>
                      <td>{researchStatus(e)}</td>
                      <td className="tc-btn">
                        <Link
                          to={`/details?data=${encodeURIComponent(
                            JSON.stringify(e)
                          )}`}
                        >
                          <Button className="btn-details">تفاصيل</Button>
                        </Link>
                        <Link
                          to={`/edit?data=${encodeURIComponent(
                            JSON.stringify(e)
                          )}`}
                        >
                          <Button className="btn-details">تعديل</Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </Container>
    </>
  );
}

export default Table;
