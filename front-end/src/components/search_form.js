import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { alert } from "../utilities/alert";
import { FaSearch } from "react-icons/fa";

function SearchForm({
  handleSearch,
  loading,
  searchQuery,
  setResearchQuery,
  route,
  setRoute,
}) {
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      alert("من فضلك ادخل نص البحث", "warning");
    } else if (!route) {
      alert("من فضلك اختر نوع البحث", "warning");
    } else {
      handleSearch(`/api/${route}/${searchQuery}`);
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
        defaultValue={routes[route]}
        aria-label="Default select example"
        onChange={(e) => setRoute(e.target.value)}
      >
        <option value="none" hidden>
          اختيارات البحث
        </option>
        <option value="researcher">البحث عن باحث</option>
        <option value="research">البحث بعنوان بحث</option>
      </Form.Select>
      <div className="d-flex">
        <Form.Control
          className="search-input"
          type="text"
          placeholder="ادخل محتوى البحث"
          value={searchQuery}
          onChange={(e) => setResearchQuery(e.target.value)}
        ></Form.Control>
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <Button
            variant="outline-secondary"
            onClick={(e) => HandleSubmit(e)}
            className="search-btn"
          >
            <FaSearch />
          </Button>
        )}
      </div>
    </Form>
  );
}

const routes = {
  researcher: "البحث عن باحث",
  research: "البحث بعنوان بحث",
};

export default SearchForm;
