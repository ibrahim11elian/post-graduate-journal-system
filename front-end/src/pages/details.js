import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useLocation } from "react-router-dom";

function extractFileName(path) {
  const pathSegments = path.split("\\");
  return pathSegments[pathSegments.length - 1];
}

function Details() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const research = JSON.parse(decodeURIComponent(query.get("data")));
  return (
    <div>
      <Header research={research} />
      <div className="personal container-md">
        <h3 className="full-grid-width up-border mb-3 head">
          المعلومات الشخصية
        </h3>
        <div>
          <div className="phone">
            <span>الهاتف: </span> {research.researcher.phone}
          </div>
          <div className="email">
            <span>البريد الالكتروني: </span>
            {research.researcher.email}
          </div>
          <a
            href={`http://localhost:3000/cv/${extractFileName(
              research.researcher.cv
            )}`}
          >
            <Button className="add col-auto">السيرة الذاتية</Button>
          </a>
        </div>
      </div>

      <div className="research container-md">
        <h3 className="full-grid-width up-border mb-3 head">البحث</h3>
        <div className="research-title mt-4">
          <span>العنوان:</span> {research.research.research_title}
        </div>
        <div className="d-flex justify-content-between mt-4">
          <div>
            <span>تاريخ التقديم:</span>
            {new Date(research.research.research_date).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }
            )}
          </div>
          <div>
            <span>العدد :</span>
            {research.journal.journal_edition}
          </div>
          <div>
            <span>تاريخ العدد:</span>
            {new Date(research.journal.edition_date).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              }
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center gap-5 mt-4">
          <Link
            to={`/viewer?data=${extractFileName(
              research.research.research_pdf
            )}`}
          >
            <Button className="add col-auto">اقراء البحث</Button>
          </Link>
          <a
            href={`http://localhost:3000/summaries/${extractFileName(
              research.research.research_summary
            )}`}
          >
            <Button className="add col-auto">ملخص انجليزي</Button>
          </a>
        </div>
        <div className="d-flex justify-content-center gap-5 mt-4">
          <ExaminationTable research={research.examination} />
          {research.judgeExamination ? (
            <SciExaminationTable research={research.judgeExamination} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Header({ research }) {
  return (
    <header className="add-header">
      <img
        className="head-img"
        src="./images/police.png"
        alt="وزارة الداخلية"
      />
      <div className="detail-header">
        <p className="researcher-name">
          {research.researcher.rank} / {research.researcher.researcher_name}
        </p>
        <p className="researcher-job">{research.researcher.workplace}</p>
      </div>
      <img
        className="head-img"
        src="./images/post.png"
        alt="كلية الدراسات العليا"
      />
    </header>
  );
}

function ExaminationTable({ research }) {
  return (
    <table className="table mt-5">
      <thead className="table-header ">
        <tr>
          <th scope="col rounded-start">الفحص</th>
          <th scope="col">النتيجة</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p className="td">
              <span>رقم الخطاب الصادر:</span>
              {research.outgoing_letter}
            </p>
            <p className="td">
              <span>رقم الخطاب الوارد:</span>
              {research.incoming_letter}
            </p>
          </td>
          <td className="result">{research.result}</td>
        </tr>
      </tbody>
    </table>
  );
}
function SciExaminationTable({ research }) {
  return (
    <table className="table mt-5">
      <thead className="table-header ">
        <tr>
          <th scope="col rounded-start"> الفحص العلمي</th>
          <th scope="col">النتيجة</th>
        </tr>
      </thead>
      <tbody>
        {research.map((e, i) => {
          return (
            <tr key={i}>
              <td>
                <p className="td">
                  <span>اسم المحكم :</span>
                  {e.judge_Name}
                </p>
                <p className="td">
                  <span>رقم الخطاب:</span>
                  {e.examination_details.judge_letter}
                </p>
                <p className="td">
                  <span>تاريخ الخطاب:</span>
                  {new Date(
                    e.examination_details.letter_date
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </p>
              </td>
              <td className="result">{e.examination_details.result}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Details;
