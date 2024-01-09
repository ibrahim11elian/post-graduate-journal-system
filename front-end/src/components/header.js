import { memo } from "react";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg " dir="ltr">
        <div className="container justify-content-center gap-2">
          <img
            className="head-img navbar-brand"
            src="./images/post.png"
            alt="كلية الدراسات العليا"
          />
          <p>مجلة كلية الدراسات العليا</p>

          <img
            className="head-img navbar-brand"
            src="./images/police.png"
            alt="وزارة الداخلية"
          />
        </div>
      </nav>
    </>
  );
}

export default memo(Header);
