export function isValid(formData) {
  const {
    researcher_name,
    workplace,
    rank,
    email,
    phone,
    research_date,
    research_title,
    journal_edition,
    edition_date,
    outgoing_letter,
    incoming_letter,
    result,
    judge_namee,
    judge_letter,
    letter_date,
    exmn_result,
  } = formData;

  if (
    !researcher_name ||
    !workplace ||
    !rank ||
    !email ||
    !phone ||
    !research_date ||
    !research_title ||
    !journal_edition ||
    !edition_date ||
    !outgoing_letter ||
    !incoming_letter ||
    !result
  ) {
    alert("من فضلك اكمل الحقول الفارغة");
    return false; // Rule 1: Required fields are missing
  }

  if (result === "صالح للتحكيم") {
    if (
      !judge_namee ||
      !judge_letter ||
      !letter_date ||
      !exmn_result ||
      (!judge_namee["0"].trim() && !judge_namee["1"].trim()) ||
      (!judge_letter["0"].trim() && !judge_letter["1"].trim()) ||
      (!letter_date["0"].trim() && !letter_date["1"].trim()) ||
      (!exmn_result["0"].trim() && !exmn_result["1"].trim())
    ) {
      alert("من فضلك اكمل بيانات الحكام الغير مكتملة");
      return false; // Rule 7: Incomplete judge data when result is 'ok'
    }
    if (
      exmn_result["0"] === "غير صالح للنشر" &&
      exmn_result["1"] === "غير صالح للنشر"
    ) {
      return true;
    } else if (
      exmn_result["0"] === "غير صالح للنشر" ||
      exmn_result["1"] === "غير صالح للنشر"
    ) {
      if (
        !judge_namee["2"] ||
        !judge_letter["2"] ||
        !letter_date["2"] ||
        !exmn_result["2"] ||
        !judge_namee["2"].trim() ||
        !judge_letter["2"].trim() ||
        !letter_date["2"].trim() ||
        !exmn_result["2"].trim()
      ) {
        alert("من فضلك اكمل بيانات المحكم الثالث");
        return false; // Rule 8: Missing judge data when exmn_result['0'] and exmn_result['1'] are not 'ok'
      }
    }
  }

  return true;
}

function validJudge(name, date, letter, result) {
  // Check if any of the objects is undefined
  if (!name || !date || !letter || !result) {
    return false;
  }

  const keys1 = Object.keys(name);
  const keys2 = Object.keys(date);
  const keys3 = Object.keys(letter);
  const keys4 = Object.keys(result);

  // Check if all objects have the same number of keys
  if (
    keys1.length !== keys2.length ||
    keys1.length !== keys3.length ||
    keys1.length !== keys4.length
  ) {
    return false;
  }

  // Check if all keys are the same across all objects
  const allKeys = new Set([...keys1, ...keys2, ...keys3, ...keys4]);
  if (allKeys.size !== keys1.length) {
    return false;
  }

  // Check if any key is undefined or has an empty string value in any object
  for (const key of allKeys) {
    if (
      (name[key] === undefined || name[key] === "") &&
      (date[key] === undefined || date[key] === "") &&
      (letter[key] === undefined || letter[key] === "") &&
      (result[key] === undefined || result[key] === "")
    ) {
      continue;
    }
    if (
      (name[key] === undefined || name[key] === "") &&
      (date[key] === undefined || date[key] === "")
    ) {
      return false;
    }
    if (
      (name[key] === undefined || name[key] === "") &&
      (letter[key] === undefined || letter[key] === "")
    ) {
      return false;
    }
    if (
      (name[key] === undefined || name[key] === "") &&
      (result[key] || result[key] === "")
    ) {
      return false;
    }
  }

  return true;
}
