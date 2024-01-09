import { useResearchContext } from "../../../../hooks/useResearchContext";
import Form from "react-bootstrap/Form";

// JudgeLabel Component: Renders a label for displaying the selected judge
// Props:
// - index: The index of the judge (used for labeling)

function JudgeLabel({ index }) {
  const { researchData, warn } = useResearchContext();

  return (
    <Form.Group>
      {/* Label for the judge */}
      <Form.Label>المحكم ال{index + 1}</Form.Label>

      {/* Display the selected judge in a disabled input field */}
      <Form.Control
        className={
          warn
            ? researchData.judge_namee && researchData.judge_namee[index].trim()
              ? ""
              : "invalid-input"
            : ""
        }
        value={`${researchData?.degree[index]}/ ${researchData?.judge_namee[index]}`}
        disabled
      />
    </Form.Group>
  );
}

export default JudgeLabel;
