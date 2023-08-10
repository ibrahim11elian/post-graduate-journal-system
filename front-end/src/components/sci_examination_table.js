import React from "react";

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

export default SciExaminationTable;
