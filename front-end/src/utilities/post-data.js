import axios from "axios";
import { alert } from "./alert";

const baseUrl = "http://localhost:3000/api";

async function postData(researchData, files) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(researchData));
  formData.append("cv", files.cv);
  formData.append("researchCopy", files.research_pdf);
  formData.append("researchSummary", files.research_summary);

  try {
    await axios.post(`${baseUrl}/research-record`, formData).then((res) => {
      res.status === 201
        ? alert("تمت العملية بنجاح", "success")
        : alert("حدث خطأ ما, من فضلك حاول مرة أخرى", "error");
    });
  } catch (error) {
    console.log(error);
  }
}

export default postData;
