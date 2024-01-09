import React, { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import initializeEditingResearch from "../utilities/initializeEditingResearch";

// Create a context for research-related data
export const ResearchContext = createContext();

// Initial data for adding a new research
const initialAddResearchData = {
  researcher_name: "",
  workplace: "",
  rank: "",
  email: "",
  phone: "",
  research_date: "",
  research_title: "",
  journal_edition: 0,
  edition_date: "",
  outgoing_letter: "",
  outgoing_date: "",
  incoming_letter: "",
  incoming_date: "",
  result: "",
  judge_namee: "",
  degree: "",
  judge_letter: "",
  letter_date: "",
  edit_letter: "",
  edit_date: "",
  exmn_result: "",
};

// ResearchProvider component to manage research-related state
export const ResearchProvider = ({ children, isEditingResearch = false }) => {
  // Get the current location using the useLocation hook
  const location = useLocation();

  // Initialize data and handleEditData based on whether editing research or not
  let data, handleEditData;

  if (isEditingResearch) {
    const research = location.state || {};
    data = JSON.parse(research.data || "null");
    handleEditData = initializeEditingResearch(data);
  }

  // Destructure data for editing research
  const {
    rData,
    cvFileName,
    photoFileName,
    researchFileName,
    enSummaryFileName,
    arSummaryFileName,
    finalCopyFileName,
  } = handleEditData || {};

  // Set initial state based on whether editing research or not
  const [researchData, setResearchData] = useState(
    isEditingResearch ? { ...rData } : { ...initialAddResearchData }
  );

  // Set initial state for file names based on whether editing research or not
  const [files, setFiles] = useState(
    isEditingResearch
      ? {
          cv: { name: cvFileName },
          photo: { name: photoFileName },
          research_pdf: { name: researchFileName },
          research_summary: { name: enSummaryFileName },
          research_summary_ar: { name: arSummaryFileName },
          final_copy: { name: finalCopyFileName },
        }
      : {}
  );

  // Set initial state for prof (boolean indicating if the researcher has a PhD)
  const [prof, setProf] = useState(
    isEditingResearch
      ? researchData.rank.split(" ").pop() === "دكتور"
        ? true
        : false
      : false
  );

  // Set initial state for warning flag
  const [warn, setWarn] = useState(false);

  // Set initial state for email validation
  const [emailValid, setEmailValid] = useState(false);

  // Set initial state for the step of the research form
  const [step, setStep] = useState(1);

  // Set initial state for the research response
  const [res, setRes] = useState(null);

  // Set initial state for loading flag
  const [loading, setLoading] = useState(false);

  // Create a context value to be provided to consumers
  const contextValue = {
    researchData,
    setResearchData,
    files,
    setFiles,
    prof,
    setProf,
    warn,
    setWarn,
    emailValid,
    setEmailValid,
    step,
    setStep,
    res,
    setRes,
    loading,
    setLoading,
  };

  // Provide the context value to the ResearchContext.Provider
  return (
    <ResearchContext.Provider value={contextValue}>
      {children}
    </ResearchContext.Provider>
  );
};
