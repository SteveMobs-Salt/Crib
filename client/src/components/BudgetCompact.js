import React from 'react';
import 'react-circular-progressbar/dist/styles.css';

const BudgetCompact = ({ budget, spent }) => {
  let percent;
  if (budget && spent) {
    percent = (spent * 100) / budget;
  }
  //! 500EUR of budget available

  return (
    <div className="compact budget">
      <div className="text">
        <span className="title">Budget</span>
        <span className="details">€{parseInt(budget)}</span>
      </div>

      <div id="myProgress">
        <div id="myBar" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default BudgetCompact;
