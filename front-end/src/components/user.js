import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../utilities/context";
import { IoIosLogOut } from "react-icons/io";

function UserHead() {
  const { userName, setUserName, setPassword } = useUserContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setUserName("");
    setPassword("");
  };
  return (
    <div className="d-flex gap-2 user-head" dir="ltr">
      <Link className="user-name" to={"/account"}>
        <p>{userName.charAt(0)}</p>
      </Link>
      <Button variant="outline-secondary" onClick={() => logout()}>
        Logout <IoIosLogOut />
      </Button>
    </div>
  );
}

export default UserHead;
