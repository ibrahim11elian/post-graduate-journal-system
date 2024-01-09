export const researchStatus = (research) => {
  // Check if the research is eligible for arbitration
  if (research.examination.result === "صالح للتحكيم") {
    let validResponses = 0;
    let invalidResponses = 0;

    // Count the number of valid and invalid responses from judges
    research.judgeExamination.forEach((element) => {
      if (
        element.examination_details.result === "صالح للنشر" ||
        element.examination_details.result === "صالح مع التعديل"
      ) {
        validResponses += 1;
      } else if (element.examination_details.result === "غير صالح للنشر") {
        invalidResponses += 1;
      }
    });

    // Determine the research status based on the judge responses and journal edition date
    if (validResponses >= 2) {
      if (
        new Date(research.journal.edition_date).getFullYear() >
        new Date().getFullYear()
      ) {
        return "جاري نشره";
      } else if (
        new Date(research.journal.edition_date).getFullYear() ===
        new Date().getFullYear()
      ) {
        return new Date(research.journal.edition_date).getMonth() >
          new Date().getMonth()
          ? "جاري نشره"
          : "منشور";
      }
      return "منشور";
    } else if (invalidResponses >= 2) {
      return "غير صالح للنشر";
    } else {
      return "جارى التحكيم";
    }
  } else if (research.examination.result === "غير صالح للتحكيم") {
    return "غير صالح للتحكيم";
  } else {
    return "جاري الفحص";
  }
};
