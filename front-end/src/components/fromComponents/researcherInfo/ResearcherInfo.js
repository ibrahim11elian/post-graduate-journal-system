import Form from "react-bootstrap/Form";
import { useResearchContext } from "../../../hooks/useResearchContext";
import { memo, useEffect } from "react";

function PersonalInfo() {
  // Extracting state and functions from the context
  const {
    setResearchData,
    researchData,
    warn,
    setProf,
    prof,
    setEmailValid,
    emailValid,
    files,
    setFiles,
  } = useResearchContext();

  // Effect to update the research data when the professor checkbox is toggled
  useEffect(() => {
    setResearchData((prevData) => ({
      ...prevData,
      rank: prof
        ? prevData.rank.includes("دكتور")
          ? prevData.rank
          : `${prevData.rank} دكتور`
        : prevData.rank
        ? prevData.rank
            .split(" ")
            .filter((e) => e !== "دكتور")
            .join(" ")
        : "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prof]);

  // Display the selected file names
  const fileName = files.cv ? files.cv.name : "";
  const photoFileName = files.photo ? files.photo.name : "";

  return (
    <>
      <h3 className="full-grid-width up-border">المعلومات الشخصية</h3>

      {/* Rank selection dropdown and professor checkbox */}
      <Form.Group className="mb-2 col-12 col-sm-6">
        <Form.Label>الرتبة</Form.Label>
        <Form.Select
          type="text"
          value={prof ? researchData.rank.split(" ")[0] : researchData.rank}
          className={`mb-1 ${
            warn ? (researchData.rank ? "" : "invalid-input") : ""
          }`}
          aria-label="Default select example"
          onChange={(e) => {
            setResearchData({
              ...researchData,
              rank: e.target.value,
            });
          }}
        >
          {/* Dropdown options */}
          <option value="none" hidden defaultValue>
            اختر الرتبة
          </option>
          <option value="ملازم أول">ملازم أول</option>
          {/* Other options... */}
        </Form.Select>
        {/* Professor checkbox */}
        <Form.Check
          type="checkbox"
          label="دكتور ؟"
          defaultChecked={prof}
          onClick={() => {
            researchData.rank ? setProf((old) => !old) : setProf(prof);
          }}
        />
      </Form.Group>

      {/* Officer name input */}
      <Form.Group className="mb-2 col-12 col-sm-6" controlId="officerName">
        <Form.Label>إسم الضابط</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.researcher_name ? "" : "invalid-input") : ""
          }
          type="text"
          value={researchData.researcher_name}
          onChange={(e) =>
            setResearchData({
              ...researchData,
              researcher_name: e.target.value,
            })
          }
        />
      </Form.Group>

      {/* Workplace input */}
      <Form.Group
        className="mb-2 col-12 col-sm-6"
        controlId="formBasicWorkplace"
      >
        <Form.Label>جهة العمل</Form.Label>
        <Form.Control
          className={
            warn ? (researchData.workplace ? "" : "invalid-input") : ""
          }
          type="text"
          value={researchData.workplace}
          onChange={(e) =>
            setResearchData({ ...researchData, workplace: e.target.value })
          }
        />
      </Form.Group>

      {/* Email input */}
      <Form.Group className="mb-2 col-12 col-sm-6" controlId="formBasicEmail">
        <Form.Label>البريد الإلكتروني</Form.Label>
        <Form.Control
          className={
            warn
              ? researchData.email && emailValid
                ? ""
                : "invalid-input"
              : ""
          }
          type="email"
          value={researchData.email}
          onChange={(e) => {
            setEmailValid(true);
            setResearchData({ ...researchData, email: e.target.value });
          }}
        />
      </Form.Group>

      {/* Phone number input */}
      <Form.Group className="mb-2 col-12 col-sm-6" controlId="formBasicPhone">
        <Form.Label>رقم الهاتف</Form.Label>
        <Form.Control
          className={warn ? (researchData.phone ? "" : "invalid-input") : ""}
          type="number"
          value={researchData.phone}
          onChange={(e) =>
            setResearchData({ ...researchData, phone: e.target.value })
          }
        />
      </Form.Group>

      {/* CV file input */}
      <Form.Group controlId="formFile" className="mb-2 col-12 col-sm-6">
        <Form.Label>السيرة الذاتية</Form.Label>
        <span className="file-name">:{fileName || ""}</span>
        <Form.Control
          type="file"
          name="cv"
          onChange={(e) => setFiles({ ...files, cv: e.target.files[0] })}
        />
      </Form.Group>

      {/* Photo file input */}
      <Form.Group controlId="formFile" className="mb-2 col-12 col-sm-6">
        <Form.Label>الصورة الشخصية</Form.Label>
        <span className="file-name">:{photoFileName || ""}</span>
        <Form.Control
          type="file"
          name="photo"
          onChange={(e) => setFiles({ ...files, photo: e.target.files[0] })}
        />
      </Form.Group>
    </>
  );
}

export default memo(PersonalInfo);
