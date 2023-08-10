import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Table({ fetchedData, setResearch }) {
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
              <th scope="col rounded-end">البريد الإلكتروني</th>
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
                      <td>
                        <Link
                          to={`/details?data=${encodeURIComponent(
                            JSON.stringify(e)
                          )}`}
                        >
                          <Button className="btn-details">تفاصيل</Button>
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
