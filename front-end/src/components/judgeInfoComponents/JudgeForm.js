import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import judgeValid from "../../validation/judge_info";
import axios from "axios";
import { alert } from "../../utilities/alert";
import specializationList from "../../data/specialization_list";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const judgeData = {
  j_name: "",
  degree: "",
  spec: "",
  job_title: "",
};

const baseApiUrl = process.env.REACT_APP_API_URL;

function JudgeForm({ judgeList, setJudgeList, fetchData }) {
  const [warn, setWarn] = useState(false);
  const [judge, setJudge] = useState({ ...judgeData });

  const handleSearch = (params) => {
    fetchData(`${baseApiUrl}${params}`);
  };

  useEffect(() => {
    handleSearch("/judge-info");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (judgeValid(setWarn, judge)) {
      try {
        const res = await axios.post(`${baseApiUrl}/judge-info`, judge);
        if (res.status === 201) {
          const newJudgeList = {
            data: [...judgeList.data, res.data.data],
          };
          setJudgeList({ ...newJudgeList });
          alert("تمت الاضافة بنجاح", "success");
          setJudge(judgeData);
        }
      } catch (error) {
        alert("المحكم موجود بالفعل", "error");
        console.log(error);
      }
    }
  };
  return (
    <Form
      onSubmit={(e) => handleSubmit(e)}
      className="row justify-content-center align-items-center mt-4"
    >
      <Form.Group className="col-12 col-sm-6 col-md-3">
        {/* Specialization */}
        <Form.Label>التخصص</Form.Label>
        <Form.Select
          type="text"
          className={`mb-1 ${warn ? (judge.spec ? "" : "invalid-input") : ""}`}
          value={judge.spec}
          onChange={(e) => {
            const selectedValue = e.target.value;
            handleSearch(`/judge-info/${selectedValue}`);
            setJudge({
              ...judge,
              spec: selectedValue,
            });
          }}
          aria-label="Default select example"
        >
          <option value="">الكل</option>
          {specializationList.map((e, i) => {
            return (
              <option key={i} value={e}>
                {e}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="col-12 col-sm-6 col-md-3">
        {/* Academic Degree */}
        <Form.Label>الدرجة العلمية</Form.Label>
        <Form.Label>الدرجة العلمية</Form.Label>
        <Form.Select
          type="text"
          className={`mb-1 ${
            warn ? (judge.degree ? "" : "invalid-input") : ""
          }`}
          value={judge.degree}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setJudge({
              ...judge,
              degree: selectedValue,
            });
          }}
          aria-label="Default select example"
        >
          <option value="">اختر الدرجة العلمية</option>
          <option value="لواء أستاذ دكتور">لواء أستاذ دكتور</option>
          <option value="عميد أستاذ دكتور">عميد أستاذ دكتور</option>
          <option value="عقيد أستاذ دكتور">عقيد أستاذ دكتور</option>
          <option value="أستاذ دكتور">أستاذ دكتور</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="col-12 col-sm-6 col-md-3">
        {/* Judge Name */}
        <Form.Label>الإسم</Form.Label>
        <Form.Control
          type="text"
          className={`mb-1 ${
            warn ? (judge.j_name ? "" : "invalid-input") : ""
          }`}
          value={judge.j_name}
          onChange={(e) =>
            setJudge({
              ...judge,
              j_name: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group className="col-12 col-sm-6 col-md-3">
        {/* Job Title */}
        <Form.Label>المسمى الوظيفي</Form.Label>
        <Form.Control
          type="text"
          className={`mb-1 ${
            warn ? (judge.job_title ? "" : "invalid-input") : ""
          }`}
          value={judge.job_title}
          onChange={(e) =>
            setJudge({
              ...judge,
              job_title: e.target.value,
            })
          }
        />
      </Form.Group>
      <div className="col-12">
        {/* Buttons */}
        <Button
          style={{ width: "fit-content" }}
          className="mt-4"
          variant="primary"
          onClick={(e) => handleSubmit(e)}
        >
          تأكيد
        </Button>
        <Link className={"me-1"} to={"/"}>
          <Button className="mt-4" variant="outline-secondary">
            الرئيسية <FaHome />
          </Button>
        </Link>
      </div>
    </Form>
  );
}
export default JudgeForm;
