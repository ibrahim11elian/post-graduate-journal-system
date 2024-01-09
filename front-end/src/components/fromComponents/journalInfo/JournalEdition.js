import React from "react";
import Form from "react-bootstrap/Form";
import { useResearchContext } from "../../../hooks/useResearchContext";

function JournalEdition() {
  // Extracting state and functions from the context
  const { setResearchData, researchData, warn } = useResearchContext();

  // Function to handle edition number change and calculate edition date
  const handleEditionNumberChange = (e) => {
    if (e.target.value !== "") {
      const newEditionNumber = parseInt(e.target.value, 10);

      // Calculate and set the edition date based on the release schedule
      const isMarch = newEditionNumber % 2 === 0;
      const releaseMonth = isMarch ? 3 : 10; // March or October
      const firstEditionYear = 2000;
      let releaseYear =
        firstEditionYear + Math.floor((newEditionNumber - 1) / 2);
      releaseYear = isMarch ? releaseYear : releaseYear - 1;
      const calculatedEditionDate = new Date(releaseYear, releaseMonth - 1, 2);

      // Update the research data with the calculated edition date and edition number
      setResearchData({
        ...researchData,
        edition_date: calculatedEditionDate
          .toISOString()
          .split("T")[0]
          .split("-")
          .slice(0, 2)
          .join("/"),
        journal_edition: newEditionNumber,
      });
    }
  };

  return (
    <>
      <h3 className="full-grid-width up-border">عدد المجلة</h3>

      {/* Edition number input */}
      <Form.Group className="mb-3 col-12 col-sm-6">
        <Form.Label> رقم العدد</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.journal_edition ? "" : "invalid-input") : ""
          }
          value={researchData.journal_edition}
          type="number"
          onChange={(e) => handleEditionNumberChange(e)}
        />
      </Form.Group>

      {/* Edition date input (disabled) */}
      <Form.Group className="mb-3 col-12 col-sm-6">
        <Form.Label> تاريخ العدد </Form.Label>
        <Form.Control
          className={
            warn ? (researchData.edition_date ? "" : "invalid-input") : ""
          }
          type="text"
          value={researchData.edition_date}
          disabled
        />
      </Form.Group>
    </>
  );
}

export default JournalEdition;
