import { alert } from "../alert";

const emailRegEx =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

export function personalValid(formData, files, setWarn, setEmailValid) {
  const { researcher_name, workplace, rank, email, phone } = formData;
  if (!researcher_name || !workplace || !rank || !email || !phone) {
    setWarn(true);
    alert("من فضلك اكمل الحقول الفارغة", "warning");
    return false; // Rule 1: Required fields are missing
  }

  if (!email.match(emailRegEx)) {
    setEmailValid(false);
    setWarn(true);
    alert("من فضلك ادخل بريد الكتروني صالح", "warning");
    return false;
  }

  setEmailValid(true);

  if (!files) {
    setWarn(true);
    alert("من فضلك ارفق الملفات", "warning");
    return false;
  } else {
    if (!files["cv"]) {
      setWarn(true);
      alert("من فضلك ارفق ملف السيرة الذاتية", "warning");
      return false;
    }
    const fileExtension = files["cv"].name.split(".").pop();
    if (fileExtension !== "pdf") {
      setWarn(true);
      alert(
        <>
          <span>pdf</span> يجب ان تكون الملفات بصيغة
        </>,
        "warning"
      );
      return false;
    }

    // if (!files["photo"]) {
    //   setWarn(true);
    //   alert("من فضلك ارفق الصورة الشخصية للباحث", "warning");
    //   return false;
    // }

    if (files["photo"].name) {
      const photoFileExtension = files["photo"].name.split(".").pop();
      if (photoFileExtension !== "jpg" && photoFileExtension !== "png") {
        setWarn(true);
        alert(
          <>
            <span>png , jpg</span> يجب ان تكون الصورة بصيغة
          </>,
          "warning"
        );
        return false;
      }
    }
  }

  return true;
}
