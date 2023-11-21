import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Header from "../components/header";
import { alert } from "../utilities/alert";
import { useUserContext } from "../utilities/context";
import useAuth from "../hooks/useAuth";

const baseApiUrl = process.env.REACT_APP_API_URL;

const Account = () => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      return navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const { userName, setUserName } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      alert("منفضلك ادخل كلمة السر الجديدة", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("كلمة السر غير متطابقة", "error");
      return;
    }
    try {
      const response = await axios.put(`${baseApiUrl}/update`, {
        user_name: userName,
        pass_hash: oldPassword,
        new_user_name: newUserName,
        new_password: newPassword,
      });
      if (response.status === 200) {
        const { accessToken } = response.data;
        // Store the token in localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", newUserName);
        setUserName(newUserName);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("المستخدم غير موجود", "error");
      } else if (error.response.status === 403) {
        alert("اسم المستخدم موجود بالفعل", "error");
      } else {
        alert("كلمة السر غير صحيحة", "error");
      }
    }
  };

  return (
    <div className="container mt-6">
      <Header />
      <Form onSubmit={handleUpdate} className="login-form" dir="ltr">
        <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={userName}
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <Button variant="primary mr-1 mt-3" type="submit">
          Submit
        </Button>
        <Button variant="danger mt-3" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default Account;
