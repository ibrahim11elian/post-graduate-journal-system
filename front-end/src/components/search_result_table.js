import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import formatDate from "../utilities/format-date";

function Table({ fetchedData, searchQuery, route }) {
  const navigate = useNavigate();
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
        if (
          new Date(research.journal.edition_date).getFullYear() >
          new Date().getFullYear()
        ) {
          return "جاري نشره";
        } else if (
          new Date(research.journal.edition_date).getFullYear() ===
          new Date().getFullYear()
        ) {
          return new Date(research.journal.edition_date).getMonth() >
            new Date().getMonth()
            ? "جاري نشره"
            : "منشور";
        }
        return "منشور";
      } else if (invalidResponses >= 2) {
        return "غير صالح للنشر";
      } else {
        return "جارى التحكيم";
      }
    } else if (research.examination.result === "غير صالح للتحكيم") {
      return "غير صالح للتحكيم";
    } else {
      return "جاري الفحص";
    }
  };

  const handleResultClick = (data) => {
    // Navigate to the details page and pass search query and results as state
    navigate(`/details`, {
      state: {
        data: JSON.stringify(data),
        searchQuery: JSON.stringify(searchQuery),
        route: JSON.stringify(route),
      },
    });
  };

  return (
    <>
      <Container fluid>
        <table className="table mt-5">
          <thead className="table-header ">
            <tr>
              {route === "judge" ? (
                <th scope="col rounded-start">اسم المحكم</th>
              ) : null}
              <th scope="col rounded-start">اسم الباحث</th>
              <th scope="col">عنوان البحث</th>
              <th scope="col">عدد المجلة</th>
              <th scope="col">تاريخ التقديم</th>
              <th scope="col">الهاتف</th>
              <th scope="col">البريد الإلكتروني</th>
              <th scope="col rounded-end">حالة البحث</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {typeof fetchedData.data === "object"
              ? fetchedData.data.map((e) => {
                  return (
                    <tr key={e.researcher.id}>
                      {route === "judge"
                        ? e.judgeExamination.map((i, k) => {
                            return i.judge_Name.includes(searchQuery) ? (
                              <td key={k}>{i.judge_Name}</td>
                            ) : null;
                          })
                        : null}

                      <td>
                        <p className="rank">{e.researcher.rank}</p>
                        <p className="name">{e.researcher.researcher_name}</p>
                      </td>
                      <td>{e.research.research_title}</td>
                      <td>{e.journal.journal_edition}</td>
                      <td>{formatDate(e.research.research_date)}</td>
                      <td>{e.researcher.phone}</td>
                      <td>{e.researcher.email}</td>
                      <td>{researchStatus(e)}</td>
                      <td>
                        <Button
                          className="btn-details"
                          onClick={() => handleResultClick(e)}
                        >
                          تفاصيل
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn-details"
                          onClick={() =>
                            navigate(`/edit`, {
                              state: {
                                data: JSON.stringify(e),
                              },
                            })
                          }
                        >
                          تعديل
                        </Button>
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
