import { alert } from "../alert";

export function researchValid(formData, files, setWarn) {
  const { research_date, research_title } = formData;

  if (!research_date || !research_title) {
    setWarn(true);
    alert("من فضلك اكمل الحقول الفارغة", "warning");
    return false; // Rule 1: Required fields are missing
  }

  if (!files["research_pdf"]) {
    setWarn(true);
    alert("من فضلك ارفق ملف البحث", "warning");
    return false;
  }
  const fileExtension = files["research_pdf"].name.split(".").pop();
  if (fileExtension !== "pdf") {
    setWarn(true);
    alert(
      <>
        <span>pdf</span> يجب ان تكون الملفات بصيغة
      </>,
      "warning"
    );
    return false;
  }
  return true;
}
