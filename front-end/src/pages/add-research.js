/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import postData from "../utilities/post-data";
import Header from "../components/header";
import { Link } from "react-router-dom";
import PersonalInfo from "../components/personal_info";
import ResearchInfo from "../components/research_info";
import JournalEdition from "../components/journal_edition";
import SecurityExam from "../components/security_exam";
import SciExamination from "../components/sci_examination";
import { personalValid } from "../utilities/validation/personal_info";
import { researchValid } from "../utilities/validation/research_info";
import { journalValid } from "../utilities/validation/journal_edition";
import { securityExamenValid } from "../utilities/validation/security_examen";
import { sciExamenValid } from "../utilities/validation/sci_examen";
import { FaHome } from "react-icons/fa";
import FinalStep from "../components/final_step";

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

function AddResearch() {
  const [researchData, setResearchData] = useState({ ...rData });
  const [files, setFiles] = useState({});
  const [prof, setProf] = useState(false);
  const [warn, setWarn] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [res, setRes] = useState(null);

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

  const handleSubmit = async (e) => {
    setRes(null);
    e.preventDefault();
    try {
      await postData(researchData, files, setRes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    res
      ? navigate(`/details`, { state: { data: JSON.stringify(res.data.data) } })
      : null;
  }, [res, navigate]);

  // Validation functions for each step
  const stepValidationFunctions = [
    () => personalValid(researchData, files, setWarn, setEmailValid),
    () => researchValid(researchData, files, setWarn),
    () => journalValid(researchData, setWarn),
    () => securityExamenValid(researchData, setWarn),
    () => sciExamenValid(researchData, setWarn),
    () => true,
  ];
  const handleNext = () => {
    // Validate data for the current step
    const isStepValid = stepValidationFunctions[step - 1]();

    if (isStepValid) {
      // Move to the next step
      setWarn(false);
      if (step === 4 && researchData.result !== "صالح للتحكيم") {
        setStep(step + 2);
      } else {
        setStep(step + 1);
      }
    }
  };
  const handlePrev = () => {
    // Navigate to the previous step without validation
    if (step === 6 && researchData.result !== "صالح للتحكيم") {
      setStep(step - 2);
    } else {
      setStep(step - 1);
    }
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
            fileName={fileName}
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
        return (
          <FinalStep data={researchData} setFiles={setFiles} files={files} />
        );
    }
  };

  // Display the selected file name
  const fileName = files.cv ? files.cv.name : "";

  return (
    <div className="add-search">
      <Header />
      <div className="d-flex justify-content-between form-container">
        <h2 className="title">إضافة بحث</h2>

        <Link className="mr-auto" to={"/search"}>
          <Button className="col-auto" variant="primary">
            صفحة البحث
          </Button>
        </Link>
        <Link className="mr-1" to={"/"}>
          <Button variant="outline-secondary">
            الرئيسية <FaHome />
          </Button>
        </Link>
      </div>
      <div className="step-bar d-flex gap-4 mb-4 mt-4">
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
        <div className="step pt-2">
          <img src="./images/final.png" alt=""></img>
        </div>
      </div>

      <Form className="form form-container" onSubmit={handleSubmit}>
        {renderStep()}
      </Form>
      <div className="buttons row justify-content-center">
        {step < 6 ? (
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
        <Link className="col" to={"/"}>
          <Button variant="danger">الغاء</Button>
        </Link>
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
