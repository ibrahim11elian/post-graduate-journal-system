import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
        <option value="none" hidden>
          اختيارات البحث
        </option>
        <option value="researcher" defaultValue>
          البحث عن باحث
        </option>
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

export default SearchForm;
