import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../utilities/context";

function UserHead() {
  const { userName, setUserName, setPassword } = useUserContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setUserName("");
    setPassword("");
    navigate("/login");
  };
  return (
    <>
      <div className="d-flex gap-2 user-head" dir="ltr">
        <p className="user-name">{userName.charAt(0)}</p>
        <Button variant="danger" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </>
  );
}

export default UserHead;
