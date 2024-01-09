import { useResearchContext } from "../../../hooks/useResearchContext";
import JudgeExamination from "./judgeExamination/index";

function SciExamination() {
  // Extracting research data from the context
  const { researchData } = useResearchContext();

  // Function to determine whether to display the third judge examination
  const display3rd = () => {
    const invalidCount = [0, 1].filter(
      (i) => researchData.exmn_result[i] === "غير صالح للنشر"
    ).length;
    return invalidCount === 0 ? false : invalidCount === 1;
  };

  return (
    <>
      <h3 className="full-grid-width up-border mb-5">الفحص العلمي</h3>

      {/* Display the first judge examination */}
      <JudgeExamination index={0} />

      {/* Display the second judge examination */}
      <JudgeExamination index={1} />

      {/* Conditionally display the third judge examination based on criteria */}
      {display3rd() && (
        <>
          <JudgeExamination index={2} />
        </>
      )}
    </>
  );
}

export default SciExamination;
