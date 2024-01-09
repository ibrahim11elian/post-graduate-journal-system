import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Header from "../components/Header";
import { alert } from "../utilities/alert";
import { useUserContext } from "../hooks/useUserContext";

// API base URL from environment variable
const baseApiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  // Use the useUserContext hook to manage user-related state
  const { userName, setUserName, password, setPassword } = useUserContext();

  // State for showing/hiding the password
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the server
      const response = await axios.post(`${baseApiUrl}/login`, {
        user_name: userName,
        pass_hash: password,
      });

      // If login is successful, store the token in localStorage and navigate to the home page
      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", userName);
        navigate("/");
      }
    } catch (error) {
      // Handle errors based on response status
      if (error.response.status === 400) {
        alert("المستخدم غير موجود", "error");
      } else {
        alert("كلمة السر غير صحيحة", "error");
      }
    }
  };

  return (
    <div className="mt-6">
      <Header />
      <div className="d-flex justify-content-center">
        <Form
          onSubmit={handleLogin}
          className="col-12 col-sm-6 col-lg-4"
          dir="ltr"
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Checkbox to show/hide password */}
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Show Password"
              defaultChecked={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            />
          </Form.Group>

          <Button variant="primary mt-3" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
