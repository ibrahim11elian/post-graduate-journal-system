import { alert } from "../alert";

export function journalValid(formData, setWarn) {
  const { journal_edition, edition_date } = formData;

  if (journal_edition === 0 || edition_date === "") {
    setWarn(true);
    alert("من فضلك اكمل الحقول الفارغة", "warning");
    return false; // Rule 1: Required fields are missing
  }

  //   to check if the edition year is not in the future
  if (new Date(edition_date).getFullYear() - new Date().getFullYear() > 2) {
    setWarn(true);
    alert("من فضلك اختر عدد صالح للمجلة", "warning");
    return false;
  }

  return true;
}
