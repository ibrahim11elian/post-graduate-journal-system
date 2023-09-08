import React from "react";

function Header() {
  return (
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
  );
}

export default Header;