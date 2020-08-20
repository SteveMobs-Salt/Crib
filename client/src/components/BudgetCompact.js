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
    console.log(percent);
  }
  //! 500EUR of budget available

  // const amount = budget ? budget.amount : 0;
  // const expenseTotal = expenses ?  expenses.reduce((a, c) => a + c.amount, 0) : 0;
  return (
    <div className="compact budget">
      <div className="compact-title">
        <span className="icon">
          <FontAwesomeIcon icon={faEuroSign} size="8x" />
        </span>
        <span className="title">Budget</span>
      </div>

      <div className="progress">
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
          text={`${parseInt(percent)}%`}
        >
          {/* <i className="fas fa-2x fa-piggy-bank"></i> */}
        </CircularProgressbarWithChildren>
      </div>
      <div className="details">€{budget}</div>
      {/* <h4>{amount && expenseTotal ? `Total Budget: ${amount}` : null}</h4>
    <h4>{amount && expenseTotal ? `Amount left: ${Number(amount - expenseTotal).toFixed(2)}` : null}</h4> */}
    </div>
  );
};

export default BudgetCompact;
