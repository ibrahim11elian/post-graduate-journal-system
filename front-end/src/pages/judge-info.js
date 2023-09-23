import React, { useState } from "react";
import Header from "../components/header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFetch } from "../hooks/usefetch";
import axios from "axios";
import { alert } from "../utilities/alert";

const judgeData = {
  j_name: "",
  degree: "",
  spec: "",
};

const baseUrl = "http://localhost:3000";

function JudgeInfo() {
  const [judge, setJudge] = useState({ ...judgeData });
  const { loading, fetchedData, fetchData } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/api/judge-info`, judge);
      if (res.status === 201) {
        alert("تمت الاضاقة بنجاح", "success");
      }
    } catch (error) {
      alert("المحكم موجود بالفعل", "error");
      console.log(error);
    }
  };

  const handleSearch = (params) => {
    fetchData(`${baseUrl}${params}`);
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
            className={`mb-1`}
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
            <option value={null}>اختر التخصص العلمي</option>
            <option value="1">تخصص 1</option>
            <option value="2">تخصص 2</option>
            <option value="3">تخصص 3</option>
            <option value="4">تخصص 4</option>
            <option value="5">تخصص 5</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>الدرجة العلمية</Form.Label>
          <Form.Select
            type="text"
            className={`mb-1`}
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
            <option value={null}>اختر الدرجة العلمية</option>
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
            value={judge.j_name}
            onChange={(e) =>
              setJudge({
                ...judge,
                j_name: e.target.value,
              })
            }
          />
        </Form.Group>
        <Button
          style={{ width: "fit-content" }}
          className="mt-4"
          variant="primary"
          onClick={(e) => handleSubmit(e)}
        >
          تأكيد
        </Button>
      </Form>
      <JudgeTable fetchedData={fetchedData} />
    </>
  );
}

function JudgeTable({ fetchedData }) {
  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th scope="col">التخصص</th>
          <th scope="col">الدرجة العلمية</th>
          <th scope="col">الاسم</th>
        </tr>
      </thead>
      <tbody>
        {fetchedData.data
          ? fetchedData.data.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{ele.spec}</td>
                  <td>{ele.degree}</td>
                  <td>{ele.j_name}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
}

export default JudgeInfo;
