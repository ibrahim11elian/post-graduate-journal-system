import React from "react";
import SciExaminationTable from "./SciExaminationTable";

// ScientificExamination Component: Displays scientific examination details
function ScientificExamination({ judgeExamination }) {
  return judgeExamination.length ? ( // Check if judgeExamination has elements
    <SciExaminationTable judgeExamination={judgeExamination} />
  ) : null; // Render nothing if judgeExamination is empty
}

export default ScientificExamination;
