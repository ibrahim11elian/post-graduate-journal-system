import axios from "axios";

// Get the base API URL from the environment variables
const baseApiUrl = process.env.REACT_APP_API_URL;

// Function to send a DELETE request to delete a research record
async function deleteResearch(researchId, judgeId) {
  try {
    // Send a DELETE request to the API endpoint with the specified researchId and judgeId
    const res = await axios.delete(`${baseApiUrl}/researcher/${researchId}`, {
      data: { judgeId },
    });

    // Return the status code from the response
    return res.status;
  } catch (error) {
    // Log any errors that occur during the request
    console.log(error);
  }
}

export default deleteResearch;
