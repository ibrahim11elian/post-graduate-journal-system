import React from "react";
import { Table } from "react-bootstrap";
import formatDate from "../../utilities/format-date";

// SecurityExamination Component: Displays security examination details
function SecurityExamination({ examination }) {
  return examination ? (
    <Table striped bordered responsive>
      <thead>
        {/* Table header */}
        <tr>
          <th style={{ width: "70px" }}>الفحص</th>
          <th></th>
          <th>النتيجة</th>
        </tr>
      </thead>
      <tbody>
        {/* Security examination details */}
        <tr>
          <th>رقم الصادر</th>
          <td>{examination.outgoing_letter}</td>
          <td rowSpan={4}>{examination.result}</td>
        </tr>
        <tr>
          <th>تاريخ الصادر</th>
          <td>{formatDate(examination.outgoing_date)}</td>
        </tr>
        <tr>
          <th>رقم الوارد</th>
          <td>{examination.incoming_letter}</td>
        </tr>
        <tr>
          <th>تاريخ الوارد</th>
          <td>
            {/* Format the incoming date if available */}
            {examination.incoming_date
              ? formatDate(examination.incoming_date)
              : null}
          </td>
        </tr>
      </tbody>
    </Table>
  ) : null; // Render nothing if examination data is not available
}

export default SecurityExamination;
