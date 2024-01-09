import { useResearchContext } from "../../../../hooks/useResearchContext";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ExaminationDatePicker Component: Renders a date picker for examination date
// Props:
// - index: The index of the examination (used for identifying the examination)
// - edit: A boolean indicating whether it's date of editing letter or not (default is false)

function ExaminationDatePicker({ index, edit = false }) {
  const { setResearchData, researchData } = useResearchContext();

  return (
    <Form.Group className={`col-12 col-sm-6 col-md-4 col-lg-2`}>
      {/* Label for the examination date */}
      <Form.Label>{!edit ? "تاريخ الإرسال" : "تاريخ التعديل"}</Form.Label>

      {/* Date picker for the examination date */}
      <DatePicker
        selected={
          !edit
            ? researchData.letter_date[index] || ""
            : researchData.edit_date[index] || ""
        }
        className="form-control"
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="DD/MM/YYY"
        onChange={(e) =>
          setResearchData({
            ...researchData,
            [!edit ? "letter_date" : "edit_date"]: {
              ...(!edit ? researchData.letter_date : researchData.edit_date),
              [index]: e,
            },
          })
        }
      />
    </Form.Group>
  );
}

export default ExaminationDatePicker;
