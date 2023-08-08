export function isValid(formData) {
  console.log(formData);
  for (const key in formData) {
    if (!formData[key]) {
      if (
        (key === "judge_namee" ||
          key === "letter_date" ||
          key === "exmn_result" ||
          key === "judge_letter") &&
        formData["result"] !== "صالح للتحكيم"
      ) {
        continue;
      }
      return false;
    }
  }

  // if (
  //   !validJudge(
  //     formData["judge_namee"],
  //     formData["letter_date"],
  //     formData["exmn_result"],
  //     formData["judge_letter"]
  //   )
  // ) {
  //   return false;
  // }
  return true;
}

// function validJudge(judge_namee, letter_date, exmn_result, judge_letter) {
//   if (judge_namee && letter_date && exmn_result && judge_letter) {
//     if (
//       ((Object.keys(judge_namee).length === Object.keys(letter_date).length) ===
//         Object.keys(exmn_result).length) ===
//       Object.keys(judge_letter).length
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   } else if (judge_namee || letter_date || exmn_result || judge_letter) {
//     alert("ادخل بيانات المحكمين كاملة");
//     return false;
//   } else {
//     return true;
//   }
// }
