import { useResearchContext } from "../../../../hooks/useResearchContext";
import Form from "react-bootstrap/Form";

// ExaminationResultSelect Component: Renders a form control for selecting examination result
// Props:
// - index: The index of the examination (used for identifying the judge number)

function ExaminationResultSelect({ index }) {
  const { setResearchData, researchData } = useResearchContext();

  return (
    <Form.Group className={`col-12 col-sm-6 col-md-4 col-lg-2`}>
      {/* Label for the examination result */}
      <Form.Label>النتيجة</Form.Label>

      {/* Select input for choosing the examination result */}
      <Form.Select
        type="text"
        value={researchData.exmn_result[index] || ""}
        className={`mb-1`}
        aria-label="Default select example"
        onChange={(e) =>
          setResearchData({
            ...researchData,
            exmn_result: {
              ...researchData.exmn_result,
              [index]: e.target.value,
            },
          })
        }
      >
        {/* Default and hidden option */}
        <option value="none" hidden defaultValue>
          اختر النتيجة
        </option>

        {/* Options for different examination results */}
        <option value="صالح للنشر">صالح للنشر</option>
        <option value="صالح مع التعديل">صالح مع التعديل</option>
        <option value="غير صالح للنشر">غير صالح للنشر</option>
      </Form.Select>
    </Form.Group>
  );
}

export default ExaminationResultSelect;
