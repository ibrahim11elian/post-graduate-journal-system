import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./add-research";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useFetch } from "../hooks/usefetch";

const baseUrl = "http://localhost:3000";

function Search({ setResearch }) {
  const [route, setRoute] = useState("");
  const [params, setParams] = useState("");
  const [searchQuery, setResearchQuery] = useState("");
  const { loading, fetchedData } = useFetch(`${baseUrl}${params}`);
  return (
    <>
      <Header />
      <SearchForm
        route={route}
        searchQuery={searchQuery}
        setParams={setParams}
        setRoute={setRoute}
        setResearchQuery={setResearchQuery}
      />
      <Table fetchedData={fetchedData} setResearch={setResearch} />
    </>
  );
}

function SearchForm({
  route,
  searchQuery,
  setParams,
  setRoute,
  setResearchQuery,
}) {
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!route) {
      alert("من فضلك اختر نوع البحث");
    } else {
      setParams(`/api/${route}/${searchQuery}`);
    }
  };
  return (
    <Form
      className="form form-container search"
      onSubmit={(e) => HandleSubmit(e)}
    >
      <Link to={"/"}>
        <Button className="add col-auto" variant="primary">
          إضافة بحث
        </Button>
      </Link>

      <Form.Select
        type="text"
        className="mb-1"
        aria-label="Default select example"
        onChange={(e) => setRoute(e.target.value)}
      >
        <option value="none" hidden defaultValue>
          اختيارات البحث
        </option>
        <option value="researcher">البحث عن باحث</option>
        <option value="نقيب">نقيب</option>
        <option value="رائد">رائد</option>
        <option value="مقدم">مقدم</option>
        <option value="عقيد">عقيد</option>
        <option value="عميد">عميد</option>
        <option value="لواء">لواء</option>
      </Form.Select>
      <Form.Control
        className="search-input"
        type="text"
        placeholder="ابحث بإسم الباحث"
        value={searchQuery}
        onChange={(e) => setResearchQuery(e.target.value)}
      ></Form.Control>
    </Form>
  );
}

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

export default Search;
