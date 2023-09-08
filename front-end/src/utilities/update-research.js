import axios from "axios";
import { alert } from "./alert";

const baseUrl = "http://localhost:3000/api";

async function updateData(researchData, files, setRes) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(researchData));
  formData.append("cv", files.cv);
  formData.append("researchCopy", files.research_pdf);
  formData.append("researchSummary", files.research_summary);
  formData.append("researchSummaryAr", files.research_summary_ar);
  formData.append("researchFinalCopy", files.final_copy);

  try {
    await axios.put(`${baseUrl}/research-record`, formData).then((res) => {
      if (res.status === 200) {
        alert("تمت العملية بنجاح", "success");
        setRes(res);
      } else {
        alert("حدث خطأ ما, من فضلك حاول مرة أخرى", "error");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export default updateData;