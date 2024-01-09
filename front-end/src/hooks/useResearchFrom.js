import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResearchContext } from "../hooks/useResearchContext";
import updateData from "../services/update-research";
import postData from "../services/create-research";
import {
  personalValid,
  researchValid,
  journalValid,
  securityExamenValid,
  sciExamenValid,
} from "../validation/";

// Helper function to determine the next step
const getNextStep = (currentStep, researchData) => {
  if (currentStep === 4 && researchData.result !== "صالح للتحكيم") {
    return currentStep + 2;
  } else {
    return currentStep + 1;
  }
};

// Helper function to determine the previous step
const getPrevStep = (currentStep, researchData) => {
  if (currentStep === 6 && researchData.result !== "صالح للتحكيم") {
    return currentStep - 2;
  } else {
    return currentStep - 1;
  }
};

// Custom hook for managing research form actions and validations
const useResearchForm = (isEditingResearch) => {
  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Get state and functions from the ResearchContext
  const {
    researchData,
    files,
    setWarn,
    setEmailValid,
    step,
    setStep,
    res,
    setRes,
    loading,
    setLoading,
  } = useResearchContext();

  // Effect to navigate to the details page when the research is submitted
  useEffect(() => {
    if (res) {
      navigate(`/details`, { state: { data: JSON.stringify(res.data.data) } });
    }
  }, [res, navigate]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    setRes(null);
    e.preventDefault();
    try {
      setLoading(true);
      // Call the appropriate service function based on whether editing or creating research
      isEditingResearch
        ? await updateData(researchData, files, setRes)
        : await postData(researchData, files, setRes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Validation functions for each step
  const stepValidationFunctions = [
    () => personalValid(researchData, files, setWarn, setEmailValid),
    () => researchValid(researchData, files, setWarn),
    () => journalValid(researchData, setWarn),
    () => securityExamenValid(researchData, setWarn),
    () => sciExamenValid(researchData, setWarn),
    () => true,
  ];

  // Function to handle moving to the next step
  const handleNext = useCallback(() => {
    const isStepValid = stepValidationFunctions[step - 1]();
    if (isStepValid) {
      setWarn(false);
      setStep(getNextStep(step, researchData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, stepValidationFunctions]);

  // Function to handle moving to the previous step
  const handlePrev = useCallback(() => {
    setStep(getPrevStep(step, researchData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Return functions and state to be used in the research form component
  return {
    handleSubmit,
    handleNext,
    handlePrev,
    loading,
    step,
  };
};

export default useResearchForm;
