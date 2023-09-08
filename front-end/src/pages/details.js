import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/details_header";
import ExaminationTable from "../components/examination_table";
import SciExaminationTable from "../components/sci_examination_table";
import { FaArrowLeft } from "react-icons/fa";
import { alert } from "../utilities/alert";

function extractFileName(path) {
  const pathSegments = path.split("\\");
  return pathSegments[pathSegments.length - 1];
}

function Details() {
  const location = useLocation();
  const data = location.state || {};
  const research = JSON.parse(data.data || "null");

  const navigate = useNavigate();

  const goBack = () => {
    if (data.searchQuery && data.route) {
      navigate("/search", {
        state: { searchQuery: data.searchQuery, route: data.route },
      }); // Go back to the previous page
    } else {
      navigate("/search");
    }
  };

  function deleteItem() {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("حذف البحث ؟");

    // Check if the user confirmed the action
    if (isConfirmed) {
      alert("تمت عملية الحذف بنجاح", "success");
      navigate("/");
    } else {
      // The user canceled the action
      alert("تم الالغاء", "success");
    }
  }
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
            <Button className="add col-auto outline">السيرة الذاتية</Button>
          </a>
          <Button variant="danger" onClick={() => deleteItem()}>
            حذف
          </Button>
          <Button
            className="search-btn"
            variant="outline-secondary"
            onClick={() => goBack()}
          >
            <FaArrowLeft /> الرجوع
          </Button>
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
                month: "numeric",
                day: "numeric",
                year: "numeric",
              }
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center gap-5 mt-4">
          <a
            href={`http://localhost:3000/researches/${extractFileName(
              research.research.research_pdf
            )}`}
          >
            <Button className="add col-auto outline">اقراء البحث</Button>
          </a>

          {research.research.final_copy ? (
            <a
              href={`http://localhost:3000/researches/${extractFileName(
                research.research.final_copy
              )}`}
            >
              <Button className="add col-auto outline">النسخة النهائية</Button>
            </a>
          ) : null}
          {research.research.research_summary ? (
            <a
              href={`http://localhost:3000/summaries/${extractFileName(
                research.research.research_summary
              )}`}
            >
              <Button className="add col-auto outline">ملخص انجليزي</Button>
            </a>
          ) : null}
          {research.research.research_summary_ar ? (
            <a
              href={`http://localhost:3000/ar-summaries/${extractFileName(
                research.research.research_summary_ar
              )}`}
            >
              <Button className="add col-auto outline">ملخص عربي</Button>
            </a>
          ) : null}
        </div>
        <div className="d-flex justify-content-center gap-5 mt-4">
          {research.examination ? (
            <ExaminationTable research={research.examination} />
          ) : null}

          {research.judgeExamination ? (
            <SciExaminationTable research={research.judgeExamination} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Details;
