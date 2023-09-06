import React from "react";
import Form from "react-bootstrap/Form";

function FinalStep({ data, setFiles, files }) {
  // Display the selected file name
  const fileName = files.final_copy ? files.final_copy.name : "";
  const finalCopy = () => {
    if (data.result === "صالح للتحكيم") {
      if (
        data.exmn_result &&
        (data.exmn_result["0"] === "صالح مع التعديل" ||
          data.exmn_result["1"] === "صالح مع التعديل" ||
          data.exmn_result["2"] === "صالح مع التعديل")
      ) {
        return true;
      }
      return false;
    }
    return false;
  };
  return (
    <>
      <div className="full-grid-width">
        <h3 className=" up-border mb-3 head">النهاية</h3>
        <div>
          <div>
            <span>الاسم: </span> {data.researcher_name}
          </div>
          <div>
            <span>عنوان البحث: </span>
            {data.research_title}
          </div>
          {finalCopy() ? (
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>النسخة النهائية</Form.Label>
              <span className="file-name">: {fileName}</span>
              <Form.Control
                type="file"
                name="researchFinalCopy"
                onChange={(e) =>
                  setFiles({ ...files, final_copy: e.target.files[0] })
                }
              />
            </Form.Group>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default FinalStep;
