import React from "react";

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
              <span>تاريخ الخطاب الصادر:</span>
              {research.outgoing_date
                ? new Date(research.outgoing_date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                : null}
            </p>
            <p className="td">
              <span>رقم الخطاب الوارد:</span>
              {research.incoming_letter}
            </p>
            <p className="td">
              <span>تاريخ الخطاب الوارد:</span>
              {research.incoming_date
                ? new Date(research.incoming_date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                : null}
            </p>
          </td>
          <td className="result">{research.result}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ExaminationTable;