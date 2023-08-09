import axios from "axios";

const baseUrl = "http://localhost:3000/api";

async function postData(researchData, files) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(researchData));
  formData.append("cv", files.cv);
  formData.append("researchCopy", files.research_pdf);
  formData.append("researchSummary", files.research_summary);
  console.log("ok");

  // try {
  //   await axios
  //     .post(`${baseUrl}/research-record`, formData)
  //     .then((res) => alert(JSON.stringify(res.data)));
  // } catch (error) {
  //   console.log(error);
  // }
}

export default postData;