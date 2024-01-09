import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { alert } from "../utilities/alert";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import updateUser from "../services/updateUser";

const AccountForm = () => {
  const navigate = useNavigate();
  const { userName, setUserName } = useUserContext();
  const [newUserName, setNewUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      userName,
      oldPassword,
      newUserName,
      newPassword,
    };
    if (!newPassword || !confirmPassword) {
      alert("من فضلك ادخل كلمة السر الجديدة", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("كلمة السر غير متطابقة", "error");
      return;
    }

    try {
      const res = await updateUser(data, setUserName);
      const { accessToken } = res;
      // Store the token in localStorage
      localStorage.setItem("token", accessToken);
      if (newUserName) {
        localStorage.setItem("user", newUserName);
        setUserName(newUserName);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      onSubmit={handleUpdate}
      className="login-form mt-5 col-12 col-sm-6 col-lg-4"
      dir="ltr"
    >
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
      <Button variant="primary me-1 mt-3" type="submit">
        Submit
      </Button>
      <Button variant="danger mt-3" onClick={() => navigate("/")}>
        Cancel
      </Button>
    </Form>
  );
};

export default AccountForm;
