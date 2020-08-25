import React from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
  CircularProgressbar,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEuroSign,
  faHandHoldingUsd,
  faPiggyBank,
} from '@fortawesome/free-solid-svg-icons';
const BudgetCompact = ({ budget, spent }) => {
  let percent;
  if (budget && spent) {
    //(spent * 100) / budget
    percent = (spent * 100) / budget;
  }
  //! 500EUR of budget available

  // const amount = budget ? budget.amount : 0;
  // const expenseTotal = expenses ?  expenses.reduce((a, c) => a + c.amount, 0) : 0;
  return (
    <div className="compact budget">
      <div className="text">
        <span className="title">Budget</span>
        <span className="details">€{parseInt(budget)}</span>
      </div>
      {/* <div className="progress">
        <CircularProgressbarWithChildren
          value={percent}
          styles={buildStyles({
            strokeLinecap: 'round',
            pathTransitionDuration: 1,
            pathColor: `rgba(62, 152, 199, 1)`,
            textColor: '#444',
            textSize: '25px',
            trailColor: '#dfdfdf',
            backgroundColor: '#3e98c7',
          })}
          strokeWidth={10}
          text={`${parseInt(percent)}%`}
        >
        </CircularProgressbarWithChildren>
        <div className="bar"></div>
      </div> */}

      <div id="myProgress">
        <div id="myBar" style={{ width: `${percent}%` }}></div>
      </div>

      {/* <h4>{amount && expenseTotal ? `Total Budget: ${amount}` : null}</h4>
    <h4>{amount && expenseTotal ? `Amount left: ${Number(amount - expenseTotal).toFixed(2)}` : null}</h4> */}
    </div>
  );
};

export default BudgetCompact;
