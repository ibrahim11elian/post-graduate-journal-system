import React from "react";
import formatDate from "../utilities/format-date";

function ExaminationTable({ research }) {
  return research.outgoing_date ? (
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
            {research.outgoing_date ? (
              <>
                <p className="td">
                  <span>رقم الخطاب الصادر: </span>
                  {research.outgoing_letter}
                </p>
                <p className="td">
                  <span>تاريخ الخطاب الصادر: </span>
                  {research.outgoing_date
                    ? formatDate(research.outgoing_date)
                    : null}
                </p>
              </>
            ) : null}
            {research.incoming_letter ? (
              <>
                <p className="td">
                  <span>رقم الخطاب الوارد: </span>
                  {research.incoming_letter}
                </p>
                <p className="td">
                  <span>تاريخ الخطاب الوارد: </span>
                  {research.outgoing_date
                    ? formatDate(research.incoming_date)
                    : null}
                </p>
              </>
            ) : null}
          </td>
          <td className="result">{research.result}</td>
        </tr>
      </tbody>
    </table>
  ) : null;
}

export default ExaminationTable;
