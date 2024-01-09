import { alert } from "../utilities/alert";
import letterNumberValid from "./letter_number";

export function securityExamenValid(formData, setWarn) {
  const {
    outgoing_letter,
    outgoing_date,
    incoming_letter,
    incoming_date,
    result,
  } = formData;

  if (outgoing_letter) {
    // Check if outgoing_letter is a valid letter number
    if (!letterNumberValid(outgoing_letter)) {
      alert("!! رقم خطاب غير صالح", "warning");
      return false;
    }
    // Check if required fields are missing for outgoing examination
    if (!outgoing_date) {
      setWarn(true);
      alert("من فضلك اكمل الحقول الفارغة", "warning");
      return false; // Rule 1: Required fields are missing
    }
    // Check if incoming examination is provided
    if (incoming_letter) {
      // Check if incoming_letter is a valid letter number
      if (!letterNumberValid(incoming_letter)) {
        alert("!! رقم خطاب غير صالح", "warning");
        return false;
      }
      // Check if required fields are missing for incoming examination
      if (!incoming_date || !result) {
        setWarn(true);
        alert("من فضلك اكمل الحقول الفارغة", "warning");
        return false; // Rule 1: Required fields are missing
      }
    } else {
      // Check if incoming fields are empty when not needed
      if (incoming_date || result) {
        setWarn(true);
        alert("من فضلك اكمل الحقول الفارغة", "warning");
        return false; // Rule 1: Required fields are missing
      }
    }
  } else if (outgoing_date || incoming_letter || incoming_date || result) {
    setWarn(true);
    alert("من فضلك اكمل الحقول الفارغة", "warning");
    return false; // Rule 1: Required fields are missing
  }

  // All validation rules passed
  return true;
}
