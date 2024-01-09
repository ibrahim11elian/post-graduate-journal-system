import Form from "react-bootstrap/Form";
import specializationList from "../../../../data/specialization_list";

const baseUrl = process.env.REACT_APP_BASE_URL;

function Specialization({ fetchData }) {
  const handleSearch = (params) => fetchData(`${baseUrl}${params}`);
  return (
    <Form.Group className="col-12 col-sm-6 col-md-4 col-lg-3">
      <Form.Label>التخصص</Form.Label>
      <Form.Select
        type="text"
        onChange={(e) => {
          const selectedValue = e.target.value;
          handleSearch(`/api/judge-info/${selectedValue}`);
        }}
        aria-label="Default select example"
      >
        <option value="">اختر التخصص العلمي</option>
        {specializationList.map((e, i) => (
          <option key={i} value={e}>
            {e}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default Specialization;
