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
        {research
          ? research.map((e, i) => {
              return (
                <tr key={i}>
                  <td>
                    <p className="td">
                      <span>اسم المحكم :</span>
                      {`${e.judge_degree || ""}/ ${e.judge_Name || ""}`}
                    </p>
                    <p className="td">
                      <span>رقم الخطاب:</span>
                      {e.examination_details.judge_letter}
                    </p>
                    <p className="td">
                      <span>تاريخ الخطاب:</span>
                      {e.examination_details.letter_date
                        ? new Date(
                            e.examination_details.letter_date
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })
                        : null}
                    </p>
                    {e.examination_details.edit_letter ? (
                      <p className="td">
                        <span>خطاب التعديل:</span>
                        {e.examination_details.judge_letter}
                      </p>
                    ) : null}
                    {e.examination_details.edit_date ? (
                      <p className="td">
                        <span>تاريخ التعديل:</span>
                        {new Date(
                          e.examination_details.edit_date
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    ) : null}
                  </td>
                  <td className="result">{e.examination_details.result}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
}

export default SciExaminationTable;
