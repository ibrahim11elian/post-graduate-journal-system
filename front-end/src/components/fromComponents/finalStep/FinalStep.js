import React from "react";
import Form from "react-bootstrap/Form";
import { useResearchContext } from "../../../hooks/useResearchContext";

// FinalStep Component: Renders the final step of the research form
function FinalStep() {
  const { researchData, files, setFiles } = useResearchContext();

  // Get the name of the final copy file
  const fileName = files.final_copy?.name;

  // Determine whether to render the final copy section based on conditions
  const shouldRenderFinalCopy = () =>
    researchData.result === "صالح للتحكيم" &&
    researchData.exmn_result &&
    ["0", "1", "2"].some(
      (index) => researchData.exmn_result[index] === "صالح مع التعديل"
    );

  return (
    <div className="full-grid-width">
      <h3 className="up-border mb-3 head">النهاية</h3>

      {/* Display researcher's name */}
      <div className="mb-3">
        <span>الاسم: </span> {researchData.researcher_name}
      </div>

      {/* Display research title */}
      <div className="mb-3">
        <span>عنوان البحث: </span> {researchData.research_title}
      </div>

      {/* Render final copy section if conditions are met */}
      {shouldRenderFinalCopy() && (
        <Form.Group controlId="formFile" className="mb-3 col-12 col-sm-3">
          {/* Label for the final copy file input */}
          <Form.Label>النسخة النهائية</Form.Label>

          {/* Display the name of the selected final copy file */}
          <span className="file-name">: {fileName}</span>

          {/* Input for selecting the final copy file */}
          <Form.Control
            type="file"
            name="researchFinalCopy"
            onChange={(e) =>
              setFiles({ ...files, final_copy: e.target.files[0] })
            }
          />
        </Form.Group>
      )}
    </div>
  );
}

export default FinalStep;
