import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFetch } from "../hooks/usefetch";
import axios from "axios";
import { alert } from "../utilities/alert";
import judgeValid from "../utilities/validation/judge_info";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const judgeData = {
  j_name: "",
  degree: "",
  spec: "",
  job_title: "",
};

export const spec = [
  "تاريخ قانون",
  "علوم تكنولوجية",
  "علوم ادارية",
  "علوم اقتصادية",
  "علوم اجتماعية ونفسية",
  "علوم جنائية",
  "علوم شرعية",
  "قانون اداري",
  "قانون تجاري",
  "قانون دستوري",
  "قانون دولي إنساني",
  "قانون دولي عام",
  "قانون دولي خاص",
  "قانون مرافعات",
  "قانون مدني",
  "قانون بحري",
  "الاعلام الأمني",
];

const baseUrl = "http://localhost:3000";

function JudgeInfo() {
  const [judge, setJudge] = useState({ ...judgeData });
  const { fetchedData, fetchData } = useFetch();
  const [judgeList, setJudgeList] = useState({});
  const [warn, setWarn] = useState(false);

  const handleSearch = (params) => {
    fetchData(`${baseUrl}${params}`);
  };

  useEffect(() => {
    setJudgeList({ ...fetchedData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (judgeValid(setWarn, judge)) {
      try {
        const res = await axios.post(`${baseUrl}/api/judge-info`, judge);
        if (res.status === 201) {
          const newJudgeList = {
            data: [...judgeList.data, res.data.data],
          };
          setJudgeList({ ...newJudgeList });
          alert("تمت الاضافة بنجاح", "success");
        }
      } catch (error) {
        alert("المحكم موجود بالفعل", "error");
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/judge-info/${id}`);
      if (res.status === 200) {
        const newJudgeList = judgeList.data.filter((item) => item.id !== id);
        setJudgeList({ data: [...newJudgeList] });
        alert("تم الحذف بنجاح", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className="row justify-content-center align-items-center"
      >
        <Form.Group className="col">
          <Form.Label>التخصص</Form.Label>
          <Form.Select
            type="text"
            className={`mb-1 ${
              warn ? (judge.spec ? "" : "invalid-input") : ""
            }`}
            value={judge.spec}
            onChange={(e) => {
              const selectedValue = e.target.value;
              handleSearch(`/api/judge-info/${selectedValue}`);
              setJudge({
                ...judge,
                spec: selectedValue,
              });
            }}
            aria-label="Default select example"
          >
            <option value="">الكل</option>
            {spec.map((e, i) => {
              return (
                <option key={i} value={e}>
                  {e}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col">
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
        <Form.Group className=" col">
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
        <Form.Group className=" col">
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
        <div>
          <Button
            style={{ width: "fit-content" }}
            className="mt-4"
            variant="primary"
            onClick={(e) => handleSubmit(e)}
          >
            تأكيد
          </Button>
          <Link className={"mr-1"} to={"/"}>
            <Button className="mt-4" variant="outline-secondary">
              الرئيسية <FaHome />
            </Button>
          </Link>
        </div>
      </Form>
      <JudgeTable judgeList={judgeList} handleDelete={handleDelete} />
    </>
  );
}

function JudgeTable({ judgeList, handleDelete }) {
  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th scope="col">التخصص</th>
          <th scope="col">الدرجة العلمية</th>
          <th scope="col">الاسم</th>
          <th scope="col">المسمى الوظيفي</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {judgeList.data
          ? judgeList.data.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{ele.spec}</td>
                  <td>{ele.degree}</td>
                  <td>{ele.j_name}</td>
                  <td>{ele.job_title}</td>
                  <td>
                    <Button
                      style={{ width: "fit-content" }}
                      variant="danger"
                      onClick={() => handleDelete(ele.id)}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
}

export default JudgeInfo;
