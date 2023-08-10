import { alert } from "./alert";

const emailRegEx =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

export function isValid(formData, files) {
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
    journal_edition === 0 ||
    edition_date === "" ||
    !outgoing_letter ||
    !incoming_letter ||
    !result
  ) {
    alert("من فضلك اكمل الحقول الفارغة", "warning");
    return false; // Rule 1: Required fields are missing
  }

  if (!email.match(emailRegEx)) {
    alert("من فضلك ادخل بريد الكتروني صالح", "warning");
    return false;
  }

  console.log(files);
  if (!files) {
    alert("من فضلك ادخل الملفات", "warning");
    return false;
  } else {
    for (const key in files) {
      if (!files[key]) {
        alert("من فضلك ادخل باقي الملفات", "warning");
        return false;
      }
      if (!["cv", "research_summary", "research_pdf"].includes(key)) {
        alert("من فضلك ادخل باقي الملفات", "warning");
        return false;
      }
      const fileExtension = files[key].name.split(".").pop();
      if (fileExtension !== "pdf") {
        alert(
          <>
            <span>pdf</span> يجب ان تكون الملفات بصيغة
          </>,
          "warning"
        );
        return false;
      }
    }
  }

  if (new Date().getFullYear() < new Date(edition_date).getFullYear()) {
    alert("من فضلك اختر عدد صالح للمجلة", "warning");
    return false;
  }

  if (
    new Date().getFullYear() === new Date(edition_date).getFullYear() &&
    new Date().getMonth() < new Date(edition_date).getMonth()
  ) {
    alert("من فضلك اختر عدد صالح للمجلة", "warning");
    return false;
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
      alert("من فضلك اكمل بيانات الحكام الغير مكتملة", "warning");
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
        alert("من فضلك اكمل بيانات المحكم الثالث", "warning");
        return false; // Rule 8: Missing judge data when exmn_result['0'] and exmn_result['1'] are not 'ok'
      }
    }
  }

  return true;
}
