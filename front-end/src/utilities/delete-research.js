import axios from "axios";
import { alert } from "./alert";

const baseApiUrl = process.env.REACT_APP_API_URL;

async function deleteResearch(researchId, judgeId) {
  try {
    await axios
      .delete(`${baseApiUrl}/researcher/${researchId}`, { data: { judgeId } })
      .then((res) => {
        if (res.status === 200) {
          alert("تمت العملية بنجاح", "success");
        } else {
          alert("حدث خطأ ما, من فضلك حاول مرة أخرى", "error");
        }
      });
  } catch (error) {
    console.log(error);
  }
}

export default deleteResearch;
