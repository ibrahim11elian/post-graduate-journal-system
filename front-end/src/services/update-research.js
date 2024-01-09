import axios from "axios";
import { alert } from "../utilities/alert";

// Get the base API URL from the environment variables
const baseApiUrl = process.env.REACT_APP_API_URL;

// Function to send a PUT request to update a research record
async function updateData(researchData, files, setRes) {
  // Create a new FormData object to handle file uploads
  const formData = new FormData();

  // Append the research data and files to the FormData object
  formData.append("data", JSON.stringify(researchData));
  formData.append("cv", files.cv);
  formData.append("photo", files.photo);
  formData.append("researchCopy", files.research_pdf);
  formData.append("researchSummary", files.research_summary);
  formData.append("researchSummaryAr", files.research_summary_ar);
  formData.append("researchFinalCopy", files.final_copy);

  try {
    // Send a PUT request to the API endpoint
    await axios.put(`${baseApiUrl}/research-record`, formData).then((res) => {
      // Check the response status and show an alert based on the result
      if (res.status === 200) {
        alert("تمت العملية بنجاح", "success");
        setRes(res);
      } else {
        alert("حدث خطأ ما, من فضلك حاول مرة أخرى", "error");
      }
    });
  } catch (error) {
    // Log any errors that occur during the request
    console.log(error);
  }
}

export default updateData;
