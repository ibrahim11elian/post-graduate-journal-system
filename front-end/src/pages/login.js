import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Header from "../components/header";
import { alert } from "../utilities/alert";
import { useUserContext } from "../utilities/context";

const baseApiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const { userName, setUserName, password, setPassword } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApiUrl}/login`, {
        user_name: userName,
        pass_hash: password,
      });
      if (response.status === 200) {
        const { accessToken } = response.data;
        // Store the token in localStorage
        localStorage.setItem("token", accessToken);

        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("المستخدم غير موجود", "error");
      } else {
        alert("كلمة السر غير صحيحة", "error");
      }
    }
  };

  return (
    <div className="container mt-6">
      <Header />
      <Form onSubmit={handleLogin} className="login-form" dir="ltr">
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
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
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
  );
};

export default Login;
