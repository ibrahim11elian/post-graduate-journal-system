/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import updateData from "../utilities/update-research";
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
import FinalStep from "../components/final_step";
import { sciExamenValid } from "../utilities/validation/sci_examen";
import { FaHome } from "react-icons/fa";

function extractFileName(path) {
  const pathSegments = path.split("\\");
  return pathSegments[pathSegments.length - 1];
}

function EditResearch() {
  const location = useLocation();
  const research = location.state || {};
  const data = JSON.parse(research.data || "null");
  const fileName = extractFileName(data.researcher.cv || "");
  const photoFileName = extractFileName(data.researcher.photo || "");
  const pdf = extractFileName(data.research.research_pdf);
  const en = extractFileName(data.research.research_summary || "");
  const ar = extractFileName(data.research.research_summary_ar || "");
  const final_copy = extractFileName(data.research.final_copy || "");

  let judge_namee = {},
    degree = {},
    judge_letter = {},
    letter_date = {},
    edit_letter = {},
    edit_date = {},
    exmn_result = {},
    judge_id = {},
    examination_details = {};

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

  const [researchData, setResearchData] = useState({ ...rData });
  const [files, setFiles] = useState({
    cv: { name: fileName },
    photo: { name: photoFileName },
    research_pdf: { name: pdf },
    research_summary: { name: en },
    research_summary_ar: { name: ar },
    final_copy: { name: final_copy },
  });
  const [prof, setProf] = useState(
    researchData.rank.split(" ").pop() === "دكتور" ? true : false
  );
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
      await updateData(researchData, files, setRes);
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
            photoFileName={photoFileName}
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

  return (
    <div className="add-search">
      <Header />
      <div className="d-flex justify-content-between form-container">
        <h2 className="title">تعديل بحث</h2>
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

      <Form className="form form-container">{renderStep()}</Form>
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
        <Link className="col" to={"/search"}>
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

export default EditResearch;
