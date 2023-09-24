import { alert } from "../alert";

export default function judgeValid(setWarn, judge) {
  const { j_name, degree, spec } = judge;
  if (!j_name || !degree || !spec) {
    setWarn(true);
    alert("من فضلك اكمل الحقول الفارغة", "warning");
    return false; // Rule 1: Required fields are missing
  }
  return true;
}
