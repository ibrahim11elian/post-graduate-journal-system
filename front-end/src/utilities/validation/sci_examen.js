import { alert } from "../alert";
import letterNumberValid from "./letter_number";

export function sciExamenValid(formData, setWarn) {
  const { judge_namee, judge_letter, edit_letter } = formData;

  if (judge_namee["0"] || judge_namee["1"] || judge_namee["2"]) {
    if (
      judge_namee["0"] === judge_namee["1"] ||
      judge_namee["0"] === judge_namee["2"] ||
      judge_namee["1"] === judge_namee["2"]
    ) {
      alert("!! لا يجب اختيار محكم أكثر من مرة", "warning");
      return false;
    }
  }

  if (
    (judge_letter["0"] && !letterNumberValid(judge_letter["0"])) ||
    (edit_letter["0"] && !letterNumberValid(edit_letter["0"]))
  ) {
    alert("!! رقم خطاب غير صالح", "warning");
    return false;
  }

  if (
    (judge_letter["1"] && !letterNumberValid(judge_letter["1"])) ||
    (edit_letter["1"] && !letterNumberValid(edit_letter["1"]))
  ) {
    alert("!! رقم خطاب غير صالح", "warning");
    return false;
  }

  if (
    (judge_letter["2"] && !letterNumberValid(judge_letter["2"])) ||
    (edit_letter["2"] && !letterNumberValid(edit_letter["2"]))
  ) {
    alert("!! رقم خطاب غير صالح", "warning");
    return false;
  }

  return true;
}
