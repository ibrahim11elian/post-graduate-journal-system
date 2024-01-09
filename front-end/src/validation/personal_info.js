import { alert } from "../utilities/alert";

const emailRegEx =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

export function personalValid(formData, files, setWarn, setEmailValid) {
  const { researcher_name, workplace, rank, email, phone } = formData;

  // Check if required fields are missing
  if (!researcher_name || !workplace || !rank || !email || !phone) {
    setWarn(true);
    alert("من فضلك اكمل الحقول الفارغة", "warning");
    return false; // Rule 1: Required fields are missing
  }

  // Check if the email is valid using a regular expression
  if (!email.match(emailRegEx)) {
    setEmailValid(false);
    setWarn(true);
    alert("من فضلك ادخل بريد الكتروني صالح", "warning");
    return false; // Rule 2: Invalid email format
  }

  setEmailValid(true);

  // Check the file format of CV (if provided) - should be PDF
  if (files["cv"] && files["cv"].name) {
    const fileExtension = files["cv"].name.split(".").pop();
    if (fileExtension !== "pdf") {
      setWarn(true);
      alert(
        <>
          <span>pdf</span> يجب ان تكون الملفات بصيغة
        </>,
        "warning"
      );
      return false; // Rule 3: CV file format is not PDF
    }
  }

  // Check the file format of the photo (if provided) - should be JPG or PNG
  if (files["photo"] && files["photo"].name) {
    const photoFileExtension = files["photo"].name.split(".").pop();
    if (photoFileExtension !== "jpg" && photoFileExtension !== "png") {
      setWarn(true);
      alert(
        <>
          <span>png , jpg</span> يجب ان تكون الصورة بصيغة
        </>,
        "warning"
      );
      return false; // Rule 4: Photo file format is not JPG or PNG
    }
  }

  // All validation rules passed
  return true;
}
