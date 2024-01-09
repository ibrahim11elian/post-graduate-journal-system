import { useState, useEffect } from "react";
import { useResearchContext } from "../../../../hooks/useResearchContext";
import Button from "react-bootstrap/Form";
import { useFetch } from "../../../../hooks/usefetch";
import Specialization from "./SpecializationSelectList";
import JudgeSelectList from "./JudgeSelectList";
import JudgeLabel from "./JudgeLabel";
import { AiOutlineMore } from "react-icons/ai";

function SpecializationAndJudge({ index }) {
  const { setResearchData, researchData } = useResearchContext();

  const [chose, setChose] = useState(
    [0, 1, 2].map((i) => !researchData.judge_namee[i])
  );

  const { fetchedData, fetchData } = useFetch();

  const handleJudgeSelectChange = (e, index) => {
    const [degree, name] = e.target.value.split("/");
    setResearchData({
      ...researchData,
      degree: { ...researchData.degree, [index]: degree },
      judge_namee: { ...researchData.judge_namee, [index]: name },
    });
    setChose({ ...chose, [index]: false });
  };

  useEffect(() => {
    setChose((prevChose) =>
      [0, 1, 2].map((i) => (researchData.judge_namee[i] ? false : prevChose[i]))
    );
  }, [researchData.judge_namee]);

  return chose[index] ? (
    <>
      {/* Render specialization select list and judge select list */}
      <Specialization fetchData={fetchData} />
      <JudgeSelectList
        index={index}
        handleJudgeSelectChange={handleJudgeSelectChange}
        fetchedData={fetchedData}
      />
    </>
  ) : (
    // Render label for the selected judge
    <div
      className={`d-flex gap-2 align-items-center col-12 col-sm-6 col-md-4 col-lg-3`}
    >
      <MoreButton index={index} setChose={setChose} />
      <JudgeLabel index={index} />
    </div>
  );
}

export default SpecializationAndJudge;

function MoreButton({ index, setChose }) {
  return (
    // Render button to reveal more options for judge selection
    <Button
      style={{ width: "fit-content" }}
      className="btn-details mt-4"
      onClick={() =>
        setChose((prevChose) => [
          ...prevChose.slice(0, index),
          true,
          ...prevChose.slice(index + 1),
        ])
      }
    >
      <AiOutlineMore color="#0d6efd" size={"1.5rem"} />
    </Button>
  );
}
