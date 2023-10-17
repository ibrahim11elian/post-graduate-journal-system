import React from "react";
import formatDate from "../utilities/format-date";

function SciExaminationTable({ research }) {
  return research.length ? (
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
                  <span>اسم المحكم: </span>
                  {`${e.judge_degree || ""}/ ${e.judge_Name || ""}`}
                </p>
                <p className="td">
                  <span>رقم الخطاب: </span>
                  {e.examination_details.judge_letter}
                </p>
                <p className="td">
                  <span>تاريخ الخطاب: </span>
                  {formatDate(e.examination_details.letter_date)}
                </p>
                {e.examination_details.edit_letter ? (
                  <p className="td">
                    <span>خطاب التعديل: </span>
                    {e.examination_details.judge_letter}
                  </p>
                ) : null}
                {e.examination_details.edit_date ? (
                  <p className="td">
                    <span>تاريخ التعديل: </span>
                    {formatDate(e.examination_details.edit_date)}
                  </p>
                ) : null}
              </td>
              <td className="result">{e.examination_details.result}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
}

export default SciExaminationTable;
