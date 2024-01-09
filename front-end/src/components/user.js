import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { IoIosLogOut } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

function UserHead() {
  const navigate = useNavigate();

  const { userName, setUserName, setPassword } = useUserContext();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setUserName("");
    setPassword("");
  };

  return (
    <div className=" user-head p-2 rounded-start-3" dir="ltr">
      <IoPerson className="user-icon mt-1 pe-1" />

      <div className="d-flex gap-2 ">
        <Link className="user-name" to={"/account"}>
          <p>{userName.charAt(0)}</p>
        </Link>
        <Button variant="outline-secondary" onClick={() => logout()}>
          Logout <IoIosLogOut />
        </Button>
      </div>
    </div>
  );
}

export default UserHead;
