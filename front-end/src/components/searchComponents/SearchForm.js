import React, { useCallback, memo } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { alert } from "../../utilities/alert";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

// Routes for different search types
const routes = {
  researcher: "البحث عن باحث",
  research: "البحث بعنوان بحث",
  journal: "البحث بعدد المجلة",
  judge: "البحث بإسم المحكم",
};

// SearchForm Component: Renders the search form and navigation buttons
function SearchForm({
  handleSearch,
  loading,
  searchQuery,
  setResearchQuery,
  route,
  setRoute,
}) {
  // Handle form submission
  const HandleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!searchQuery) {
        alert("من فضلك ادخل نص البحث", "warning");
      } else if (!route) {
        alert("من فضلك اختر نوع البحث", "warning");
      } else {
        handleSearch(`/${route}/${searchQuery}`);
      }
    },
    [searchQuery, route, handleSearch]
  );

  return (
    <div className="row gap-1">
      {/* Navigation buttons */}
      <NavigateButtons />

      {/* Search form */}
      <div className="col-12 col-md-6">
        <Form
          className="form-container search d-flex gap-2"
          onSubmit={HandleSubmit}
        >
          {/* Dropdown for selecting the search type */}
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
            <option value="journal">البحث بعدد المجلة</option>
            <option value="judge">البحث بإسم المحكم</option>
          </Form.Select>

          {/* Input for entering the search query */}
          <div className="d-flex">
            <Form.Control
              className="search-input col-md-6"
              type="text"
              placeholder="ادخل محتوى البحث"
              value={searchQuery}
              onChange={(e) => setResearchQuery(e.target.value)}
            />

            {/* Search button */}
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
      </div>
    </div>
  );
}

export default memo(SearchForm);

// NavigateButtons Component: Renders navigation buttons
const NavigateButtons = React.memo(() => {
  return (
    <div className="col-md-4">
      <div className="d-flex gap-2 align-items-center">
        {/* Home button */}
        <Link to={"/"}>
          <Button variant="outline-secondary">
            الرئيسية <FaHome />
          </Button>
        </Link>

        {/* Add Research button */}
        <Link to={"/add-research"}>
          <Button variant="primary">إضافة بحث</Button>
        </Link>
      </div>
    </div>
  );
});
