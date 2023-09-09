import axios from "axios";
import { alert } from "./alert";

const baseUrl = "http://localhost:3000/api";

async function deleteResearch(researchId, judgeId) {
  try {
    await axios
      .delete(`${baseUrl}/researcher/${researchId}`, { data: { judgeId } })
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
