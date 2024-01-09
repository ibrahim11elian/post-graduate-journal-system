import { memo, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utilities/format-date";
import { researchStatus } from "../../utilities/researchStatus";

// Table Component: Renders a table based on fetched data, search query, and route
function Table({ fetchedData, searchQuery, route }) {
  const navigate = useNavigate();

  // Handle click on the result to navigate to the details page
  const handleResultClick = useCallback(
    (data) => {
      // Navigate to the details page and pass search query and results as state
      navigate(`/details`, {
        state: {
          data: JSON.stringify(data),
          searchQuery: JSON.stringify(searchQuery),
          route: JSON.stringify(route),
        },
      });
    },
    [route, searchQuery, navigate]
  );

  return (
    <div className="table-responsive">
      {/* Table structure */}
      <table className="table mt-5">
        <thead className="table-header ">
          <tr>
            {/* Table headers based on the route */}
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
                    {/* Render judge names for the judge route */}
                    {route === "judge"
                      ? e.judgeExamination.map((i, k) => {
                          return i.judge_Name.includes(searchQuery) ? (
                            <td key={k}>{i.judge_Name}</td>
                          ) : null;
                        })
                      : null}

                    {/* Render researcher details */}
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

                    {/* Buttons for navigating to details and edit pages */}
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
                        onClick={() => {
                          navigate(`/edit`, {
                            state: {
                              data: JSON.stringify(e),
                            },
                          });
                        }}
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
    </div>
  );
}

export default memo(Table);
