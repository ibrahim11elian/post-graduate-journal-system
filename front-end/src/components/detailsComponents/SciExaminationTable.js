import { Table } from "react-bootstrap";
import formatDate from "../../utilities/format-date";

// SciExaminationTable Component: Displays a table of scientific examination details
function SciExaminationTable({ judgeExamination }) {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>المحكم</th>
          <th>رقم الصادر</th>
          <th>تاريخ الصادر</th>
          <th>النتيجة</th>
          <th>رقم خطاب التعديل</th>
          <th>تاريخ التعديل</th>
        </tr>
      </thead>
      <tbody>
        {judgeExamination.map((e, i) => {
          return (
            <tr key={i}>
              <td>{`${e.judge_degree || ""}/ ${e.judge_Name || ""}`}</td>
              <td>{e.examination_details.judge_letter}</td>
              <td>{formatDate(e.examination_details.letter_date)}</td>
              <td>{e.examination_details.result}</td>
              {e.examination_details.edit_letter ? (
                <td>{e.examination_details.judge_letter}</td>
              ) : null}
              {e.examination_details.edit_date ? (
                <td>{formatDate(e.examination_details.edit_date)}</td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default SciExaminationTable;
