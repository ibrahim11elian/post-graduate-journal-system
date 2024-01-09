import Form from "react-bootstrap/Form";
import { useResearchContext } from "../../../../hooks/useResearchContext";

// JudgeLetter Component: Renders an input field for the judge letter number
// Props:
// - index: The index of the judge (used for identifying the judge)
// - edit: A boolean indicating whether it's editing letter or not (default is false)

function JudgeLetter({ index, edit = false }) {
  const { setResearchData, researchData } = useResearchContext();

  return (
    <Form.Group className={`col-12 col-sm-6 col-md-4 col-lg-2`}>
      {/* Label for the judge letter */}
      <Form.Label> {!edit ? "رقم الخطاب" : "خطاب التعديل"}</Form.Label>

      {/* Input field for the judge letter number */}
      <Form.Control
        type="text"
        value={
          !edit
            ? researchData.judge_letter[index] || ""
            : researchData.edit_letter[index] || ""
        }
        onChange={(e) =>
          setResearchData({
            ...researchData,
            [!edit ? "judge_letter" : "edit_letter"]: {
              ...(!edit ? researchData.judge_letter : researchData.edit_letter),
              [index]: e.target.value,
            },
          })
        }
      />
    </Form.Group>
  );
}

export default JudgeLetter;
