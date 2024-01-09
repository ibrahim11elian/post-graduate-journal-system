import React from "react";
import { Table, Button } from "react-bootstrap";
import formatDate from "../../utilities/format-date";

const baseUrl = process.env.REACT_APP_BASE_URL;

// ResearchInfo Component: Displays detailed information about a research
function ResearchInfo({ research }) {
  // Function to extract the file name from a given path
  const extractFileName = (path) => {
    const pathSegments = path.split("\\");
    return pathSegments[pathSegments.length - 1];
  };

  return (
    <Table striped bordered responsive>
      <tbody>
        {/* Research details */}
        <tr>
          <th style={{ width: "70px" }}>عنوان البحث</th>
          <td>{research.research.research_title}</td>
        </tr>
        <tr>
          <th>تاريخ التقديم</th>
          <td>{formatDate(research.research.research_date)}</td>
        </tr>
        <tr>
          <th>عدد المجلة</th>
          <td>{research.journal.journal_edition}</td>
        </tr>
        <tr>
          <th>تاريخ العدد</th>
          <td>{research.journal.edition_date}</td>
        </tr>
        {/* Research attachments */}
        <tr>
          <th>نسخة البحث</th>
          <td>
            {/* Link to the research PDF */}
            <a
              href={`${baseUrl}/researches/${extractFileName(
                research.research.research_pdf
              )}`}
            >
              <Button className="add col-auto outline">اقرأ البحث</Button>
            </a>
            {/* Link to the final copy if available */}
            {research.research.final_copy ? (
              <a
                href={`${baseUrl}/researches/${extractFileName(
                  research.research.final_copy
                )}`}
                className="me-1"
              >
                <Button className="add outline">النسخة النهائية</Button>
              </a>
            ) : null}
          </td>
        </tr>
        {/* Research summaries */}
        <tr>
          <th>ملخص البحث</th>
          <td>
            {/* Link to the English summary if available */}
            {research.research.research_summary ? (
              <a
                href={`${baseUrl}/summaries/${extractFileName(
                  research.research.research_summary
                )}`}
              >
                <Button className="add outline">ملخص انجليزي</Button>
              </a>
            ) : null}
            {/* Link to the Arabic summary if available */}
            {research.research.research_summary_ar ? (
              <a
                href={`${baseUrl}/ar-summaries/${extractFileName(
                  research.research.research_summary_ar
                )}`}
                className="me-1"
              >
                <Button className="add outline">ملخص عربي</Button>
              </a>
            ) : null}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ResearchInfo;
