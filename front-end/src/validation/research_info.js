import { alert } from "../utilities/alert";

export function researchValid(formData, files, setWarn) {
  const { research_date, research_title } = formData;

  // Check if required fields are missing
  if (!research_date || !research_title) {
    setWarn(true);
    alert("من فضلك اكمل الحقول الفارغة", "warning");
    return false; // Rule 1: Required fields are missing
  }

  // Check if the research PDF file is attached
  if (!files["research_pdf"]) {
    setWarn(true);
    alert("من فضلك ارفق ملف البحث", "warning");
    return false; // Rule 2: Research PDF file is missing
  }

  // Check the file format of the research PDF - should be PDF
  const fileExtension = files["research_pdf"].name.split(".").pop();
  if (fileExtension !== "pdf") {
    setWarn(true);
    alert(
      <>
        <span>pdf</span> يجب ان تكون الملفات بصيغة
      </>,
      "warning"
    );
    return false; // Rule 3: Research PDF file format is not PDF
  }

  // All validation rules passed
  return true;
}
