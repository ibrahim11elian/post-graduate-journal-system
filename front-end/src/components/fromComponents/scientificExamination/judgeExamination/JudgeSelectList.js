import Form from "react-bootstrap/Form";

// JudgeSelectList Component: Renders a dropdown list of judges
// Props:
// - index: The index of the judge (used for labeling)
// - handleJudgeSelectChange: Event handler for judge selection change
// - fetchedData: Data containing the list of judges

function JudgeSelectList({ index, handleJudgeSelectChange, fetchedData }) {
  return (
    <Form.Group className="col-12 col-sm-6 col-md-4 col-lg-2">
      {/* Label for the dropdown */}
      <Form.Label> المحكم الـ ({index + 1}) </Form.Label>

      {/* Dropdown list for selecting a judge */}
      <Form.Select
        type="text"
        className={`mb-1`}
        onChange={(e) => handleJudgeSelectChange(e, index)}
        aria-label="Default select example"
      >
        {/* Default hidden option */}
        <option value="" hidden>
          اختر المحكم
        </option>

        {/* Mapping through fetched data to populate dropdown options */}
        {fetchedData.data
          ? fetchedData.data.map((ele) => (
              <option key={ele.id} value={`${ele.degree}/ ${ele.j_name}`}>
                {`${ele.degree}/ ${ele.j_name}`}
              </option>
            ))
          : null}
      </Form.Select>
    </Form.Group>
  );
}

export default JudgeSelectList;
