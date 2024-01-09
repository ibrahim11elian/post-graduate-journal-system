import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import useResearchForm from "../../hooks/useResearchFrom";
import { FaHome } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { memo, lazy, Suspense } from "react";

const Header = lazy(() => import("../Header"));
const StepBar = lazy(() => import("./progressBar/StepBar"));
const PersonalInfo = lazy(() => import("./researcherInfo/ResearcherInfo"));
const ResearchInfo = lazy(() => import("./researchInfo/ResearchInfo"));
const JournalEdition = lazy(() => import("./journalInfo/JournalEdition"));
const SecurityExam = lazy(() => import("./securityExamination/SecurityExam"));
const SciExamination = lazy(() =>
  import("./scientificExamination/SciExamination")
);
const FinalStep = lazy(() => import("./finalStep/FinalStep"));

// Helper function to render the current step component
const renderCurrentStep = (step) => {
  switch (step) {
    case 1:
      return <PersonalInfo />;
    case 2:
      return <ResearchInfo />;
    case 3:
      return <JournalEdition />;
    case 4:
      return <SecurityExam />;
    case 5:
      return <SciExamination />;
    default:
      return <FinalStep />;
  }
};

const ResearchForm = ({ isEditingResearch = false }) => {
  const { handleSubmit, handleNext, handlePrev, loading, step } =
    useResearchForm(isEditingResearch);

  return (
    <Suspense
      fallback={
        <div
          className="d-flex flex-column justify-content-end align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="loading-spinner "></div>
        </div>
      }
    >
      <div className="add-search pb-4">
        <Header />
        <div className="d-flex flex-wrap justify-content-between gap-2 form-container mt-2">
          <h2 className="title">
            {" "}
            {isEditingResearch ? "تعديل بحث" : "إضافة بحث"}
          </h2>
          <NavigationButtons />
        </div>

        <StepBar />

        <Form className="row form-container" onSubmit={handleSubmit}>
          {renderCurrentStep(step)}
        </Form>
        <StepChangerButtons
          handleSubmit={handleSubmit}
          step={step}
          handleNext={handleNext}
          handlePrev={handlePrev}
          isEditingResearch={isEditingResearch}
          loading={loading}
        />
      </div>
    </Suspense>
  );
};

export default memo(ResearchForm);

const NavigationButtons = memo(() => {
  return (
    <div>
      <Link to={"/search"}>
        <Button className="col-auto" variant="primary">
          صفحة البحث
        </Button>
      </Link>
      <Link className="me-2" to={"/"}>
        <Button variant="outline-secondary">
          الرئيسية <FaHome />
        </Button>
      </Link>
    </div>
  );
});

const StepChangerButtons = memo(
  ({
    handleSubmit,
    loading,
    isEditingResearch,
    step,
    handleNext,
    handlePrev,
  }) => {
    return (
      <div className="buttons  col justify-content-center">
        {step < 6 ? (
          <>
            <Button className="col" variant="primary" onClick={handleNext}>
              <FaArrowRight /> التالي
            </Button>

            {/* rendering submit button on update (Edit) page so the user can submit the from without need to go to the final step */}
            {isEditingResearch ? (
              <Button
                className="col me-2"
                variant="primary"
                type="submit"
                disabled={loading}
                onClick={(e) => handleSubmit(e)}
              >
                {loading ? "تحميل ..." : "تأكيد"}
              </Button>
            ) : (
              ""
            )}
          </>
        ) : (
          <Button
            className="col"
            variant="primary"
            type="submit"
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? "تحميل ..." : "تأكيد"}
          </Button>
        )}

        {step > 1 ? (
          <Button className="col me-2" variant="primary" onClick={handlePrev}>
            السابق <FaArrowLeft />
          </Button>
        ) : null}
        <Link className="col  me-2" to={"/search"}>
          <Button variant="danger">الغاء</Button>
        </Link>
      </div>
    );
  }
);
