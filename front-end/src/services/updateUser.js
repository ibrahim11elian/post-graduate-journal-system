import axios from "axios";
import { alert } from "../utilities/alert";

// Get the base API URL from the environment variables
const baseApiUrl = process.env.REACT_APP_API_URL;

// Function to send a PUT request to update user information
async function updateUser(data, setUserName) {
  // Destructure the data object to get relevant information
  const { userName, oldPassword, newUserName, newPassword } = data;

  try {
    // Send a PUT request to the API endpoint with the user information
    const response = await axios.put(
      `${baseApiUrl}/update`,
      {
        user_name: userName,
        pass_hash: oldPassword,
        new_user_name: newUserName,
        new_password: newPassword,
      },
      {
        // Include the authorization header with the token
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Check the response status and show an alert based on the result
    if (response.status === 200) {
      alert("تمت العملية بنجاح", "success");
      return response.data;
    }
  } catch (error) {
    // Handle different error statuses and show corresponding alerts
    if (error.response.status === 400) {
      alert("المستخدم غير موجود", "error");
    } else if (error.response.status === 403) {
      alert("اسم المستخدم موجود بالفعل", "error");
    } else {
      alert("كلمة السر القديمة غير صحيحة", "error");
    }
  }
}

export default updateUser;
