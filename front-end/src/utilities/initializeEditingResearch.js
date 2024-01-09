import { createContext } from "react";

// Create a context for editing research
export const EditResearchContext = createContext();

// Helper function to extract the file name from a path
function extractFileName(path) {
  const pathSegments = path.split("\\");
  return pathSegments[pathSegments.length - 1];
}

// Function to initialize editing research data
export default function initializeEditingResearch(data) {
  // Extract file names for various documents
  const cvFileName = extractFileName(data.researcher.cv || "");
  const photoFileName = extractFileName(data.researcher.photo || "");
  const researchFileName = extractFileName(data.research.research_pdf);
  const enSummaryFileName = extractFileName(
    data.research.research_summary || ""
  );
  const arSummaryFileName = extractFileName(
    data.research.research_summary_ar || ""
  );
  const finalCopyFileName = extractFileName(data.research.final_copy || "");

  // Initialize data for editing research
  let judge_namee = {},
    degree = {},
    judge_letter = {},
    letter_date = {},
    edit_letter = {},
    edit_date = {},
    exmn_result = {},
    judge_id = {},
    examination_details = {};

  // Extract data for each judge examination
  data.judgeExamination.forEach((e, i) => {
    judge_namee[i] = e.judge_Name;
    degree[i] = e.judge_degree;
    judge_letter[i] = e.examination_details.judge_letter;
    letter_date[i] = e.examination_details.letter_date
      ? new Date(e.examination_details.letter_date)
      : null;
    edit_letter[i] = e.examination_details.edit_letter;
    edit_date[i] = e.examination_details.edit_date
      ? new Date(e.examination_details.edit_date)
      : null;
    exmn_result[i] = e.examination_details.result;
    judge_id[i] = e.examination_details.judge_id;
    examination_details[i] = e.examination_details.id;
  });

  // Combine all the extracted data into a single object
  const rData = {
    researcher_name: data.researcher.researcher_name,
    workplace: data.researcher.workplace,
    rank: data.researcher.rank,
    email: data.researcher.email,
    phone: data.researcher.phone,
    research_date: data.research.research_date
      ? new Date(data.research.research_date)
      : null,
    research_title: data.research.research_title,
    journal_edition: data.journal.journal_edition,
    edition_date: data.journal.edition_date,
    outgoing_letter: data.examination.outgoing_letter,
    outgoing_date: data.examination.outgoing_date
      ? new Date(data.examination.outgoing_date)
      : null,
    incoming_letter: data.examination.incoming_letter,
    incoming_date: data.examination.incoming_date
      ? new Date(data.examination.incoming_date)
      : null,
    result: data.examination.result,
    judge_namee: { ...judge_namee },
    degree: { ...degree },
    judge_letter: { ...judge_letter },
    letter_date: { ...letter_date },
    edit_letter: { ...edit_letter },
    edit_date: { ...edit_date },
    exmn_result: { ...exmn_result },
    researcher_id: data.researcher.id,
    research_id: data.research.id,
    journal_id: data.journal.id,
    examination_id: data.examination.id,
    judge_id: { ...judge_id },
    examination_details_id: { ...examination_details },
  };

  // Return the organized data along with file names
  return {
    rData,
    cvFileName,
    photoFileName,
    researchFileName,
    enSummaryFileName,
    arSummaryFileName,
    finalCopyFileName,
  };
}
