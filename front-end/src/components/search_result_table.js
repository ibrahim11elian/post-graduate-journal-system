import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

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
              <th scope="col rounded-start">الإسم</th>
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
