import { useResearchContext } from "../../../../hooks/useResearchContext";
import ExaminationDatePicker from "./ExaminationDatePicker";
import ExaminationResultSelect from "./ExaminationResultSelect";
import JudgeLetter from "./JudgeLetter";
import SpecializationAndJudge from "./SpecializationAndJudge";

function JudgeExamination({ index }) {
  const { researchData } = useResearchContext();

  return (
    <div className="full-grid-width row mb-3 pb-1 justify-content-center border-bottom border-dark">
      {/* Display specialization and judge information */}
      <SpecializationAndJudge index={index} />

      {/* Display judge's letter information */}
      <JudgeLetter index={index} />

      {/* Display examination date picker */}
      <ExaminationDatePicker index={index} />

      {/* Display examination result select input */}
      <ExaminationResultSelect index={index} />

      {/* Conditionally display additional information for a specific result */}
      {researchData.exmn_result &&
        researchData.exmn_result[0] === "صالح مع التعديل" && (
          <div className="full-grid-width row justify-content-center mb-4">
            {/* Display judge's edited letter information */}
            <JudgeLetter index={index} edit={true} />

            {/* Display edited examination date picker */}
            <ExaminationDatePicker index={index} edit={true} />
          </div>
        )}
    </div>
  );
}

export default JudgeExamination;
