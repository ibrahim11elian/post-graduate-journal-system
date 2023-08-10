import React from 'react'

function Header({ research }) {
  return (
    <header className="add-header">
      <img
        className="head-img"
        src="./images/police.png"
        alt="وزارة الداخلية"
      />
      <div className="detail-header">
        <p className="researcher-name">
          {research.researcher.rank} / {research.researcher.researcher_name}
        </p>
        <p className="researcher-job">{research.researcher.workplace}</p>
      </div>
      <img
        className="head-img"
        src="./images/post.png"
        alt="كلية الدراسات العليا"
      />
    </header>
  );
}

export default Header