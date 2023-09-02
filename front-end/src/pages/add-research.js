/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import postData from "../utilities/post-data";
import Header from "../components/header";
import { isValid } from "../utilities/form-validation";
import { Link } from "react-router-dom";
import PersonalInfo from "../components/personal_info";
import ResearchInfo from "../components/research_info";
import JournalEdition from "../components/journal_edition";
import SecurityExam from "../components/security_exam";
import SciExamination from "../components/sci_examination";

const rData = {
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
  incoming_letter: "",
  result: "",
  judge_namee: "",
  judge_letter: "",
  letter_date: "",
  exmn_result: "",
};

function AddResearch() {
  const [researchData, setResearchData] = useState({ ...rData });
  const [files, setFiles] = useState({});
  const [prof, setProf] = useState(false);
  const [warn, setWarn] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setResearchData({
      ...researchData,
      rank: prof
        ? researchData.rank.includes("دكتور")
          ? researchData.rank
          : `${researchData.rank} دكتور`
        : researchData.rank,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prof]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    isValid({ ...researchData }, { ...files }, setWarn, setEmailValid)
      ? postData(researchData, files)
      : console.error("form data is not valid!!");
  };
  const handleNext = () => {
    // Perform validation checks on formData for the current step
    // If validation fails, display errors and prevent proceeding

    // Assuming validation passed, update formData and move to the next step
    setStep(step + 1);
  };
  const handlePrev = () => {
    // Perform validation checks on formData for the current step
    // If validation fails, display errors and prevent proceeding

    // Assuming validation passed, update formData and move to the next step
    setStep(step - 1);
  };

  useEffect(() => {
    fixStepIndicator(step);
  }, [step]);

  // Render different step components based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            setResearchData={setResearchData}
            researchData={researchData}
            warn={warn}
            setProf={setProf}
            prof={prof}
            setEmailValid={setEmailValid}
            emailValid={emailValid}
            files={files}
            setFiles={setFiles}
          />
        );
      case 2:
        return (
          <ResearchInfo
            setResearchData={setResearchData}
            researchData={researchData}
            warn={warn}
            files={files}
            setFiles={setFiles}
          />
        );
      case 3:
        return (
          <JournalEdition
            setResearchData={setResearchData}
            researchData={researchData}
            warn={warn}
          />
        );
      case 4:
        return (
          <SecurityExam
            setResearchData={setResearchData}
            researchData={researchData}
            warn={warn}
          />
        );

      case 5:
        return (
          <SciExamination
            setResearchData={setResearchData}
            researchData={researchData}
            warn={warn}
          />
        );

      default:
      // return <FinalStep data={formData} />;
    }
  };

  return (
    <div className="add-search container-md">
      <Header />
      <div className="d-flex justify-content-between form-container">
        <h2 className="title">إضافة بحث</h2>
        <Link to={"/search"}>
          <Button className="add col-auto form-container" variant="primary">
            صفحة البحث
          </Button>
        </Link>
      </div>
      <div className="step-bar d-flex gap-4 mb-4">
        <div className="step pt-2">
          <img src="./images/personal.png" alt=""></img>
        </div>
        <div className="step pt-2">
          <img src="./images/research.png" alt=""></img>
        </div>
        <div className="step pt-2">
          <img src="./images/journal.png" alt=""></img>
        </div>
        <div className="step pt-2">
          <img src="./images/examination.png" alt=""></img>
        </div>
        <div className="step pt-2">
          <img src="./images/sci-examination.png" alt=""></img>
        </div>
      </div>

      <Form className="form form-container" onSubmit={handleSubmit}>
        {renderStep()}
      </Form>
      <div className="buttons row justify-content-center">
        {step < 5 ? (
          <Button className="col" variant="primary" onClick={handleNext}>
            التالي
          </Button>
        ) : (
          <Button
            className="col"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            تأكيد
          </Button>
        )}

        {step > 1 ? (
          <Button className="col" variant="primary" onClick={handlePrev}>
            السابق
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  let i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("active", "finish");
  }
  for (i = 0; i < n - 1; i++) {
    x[i].classList.add("finish");
  }

  //... and adds the "active" class on the current step:
  x[n - 1].className += " active";
}

export default AddResearch;
