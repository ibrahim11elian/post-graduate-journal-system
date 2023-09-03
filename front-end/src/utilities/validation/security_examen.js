import { alert } from "../alert";

export function securityExamenValid(formData, setWarn) {
  const {
    outgoing_letter,
    outgoing_date,
    incoming_letter,
    incoming_date,
    result,
  } = formData;

  if (outgoing_letter) {
    if (!outgoing_date) {
      setWarn(true);
      alert("من فضلك اكمل الحقول الفارغة", "warning");
      return false; // Rule 1: Required fields are missing
    }
    if (incoming_letter) {
      if (!incoming_date || !result) {
        setWarn(true);
        alert("من فضلك اكمل الحقول الفارغة", "warning");
        return false; // Rule 1: Required fields are missing
      }
    } else {
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

  return true;
}
