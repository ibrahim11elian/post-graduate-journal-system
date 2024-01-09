import { GiFinishLine } from "react-icons/gi";
import { BsJournalBookmark } from "react-icons/bs";
import { MdChecklist } from "react-icons/md";
import { RiShieldCheckLine } from "react-icons/ri";
import { GiArchiveResearch } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { memo, useCallback, useEffect } from "react";
import useResearchForm from "../../../hooks/useResearchFrom";

const steps = [
  { icon: <IoPerson />, alt: "Personal" },
  { icon: <GiArchiveResearch />, alt: "Research" },
  { icon: <BsJournalBookmark />, alt: "Journal" },
  { icon: <RiShieldCheckLine />, alt: "Examination" },
  { icon: <MdChecklist />, alt: "Sci Examination" },
  { icon: <GiFinishLine />, alt: "Final" },
];

function StepBar() {
  const { step } = useResearchForm();

  const fixStepIndicator = useCallback((n) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fixStepIndicator(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <div className="step-bar d-flex flex-wrap gap-4 mb-4 mt-4 justify-content-center">
      {renderSteps(steps)}
    </div>
  );
}

export default memo(StepBar);

const Step = memo(({ icon, alt }) => (
  <div className="step pt-2" title={alt}>
    {icon}
    <span className="visually-hidden">{alt}</span>
  </div>
));

const renderSteps = (steps) => (
  <div className="step-bar d-flex flex-wrap gap-4 mb-4 mt-4 justify-content-center">
    {steps.map((step, index) => (
      <Step key={index} {...step} />
    ))}
  </div>
);
