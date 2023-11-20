import React from "react";
import UserHead from "./user";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {path === "/login" ? null : <UserHead />}

      <header className="add-header">
        <img
          className="head-img"
          src="./images/post.png"
          alt="كلية الدراسات العليا"
        />
        <p>مجلة كلية الدراسات العليا</p>
        <img
          className="head-img"
          src="./images/police.png"
          alt="وزارة الداخلية"
        />
      </header>
    </>
  );
}

export default Header;
