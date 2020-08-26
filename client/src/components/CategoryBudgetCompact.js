import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCocktail,
  faHouseUser,
  faShoppingBasket,
  faShower,
  faSubway,
  faMoneyCheckAlt,
  faHospitalUser,
  faSwimmer,
  faUserSecret,
  faUtensils,
  faDice,
} from '@fortawesome/free-solid-svg-icons';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

function CategoryBudgetCompact({ category, spent, limit, transactions }) {
  let icon = null;
  switch (category) {
    case 'Entertainment':
      icon = faCocktail;
      break;
    case 'Housing':
      icon = faHouseUser;
      break;
    case 'Groceries':
      icon = faShoppingBasket;
      break;
    case 'Utilities':
      icon = faShower;
      break;
    case 'Transportation':
      icon = faSubway;
      break;
    case 'Loan Repayments':
      icon = faMoneyCheckAlt;
      break;
    case 'Insurance':
      icon = faHospitalUser;
      break;
    case 'Fitness':
      icon = faSwimmer;
      break;
    case 'Clothing':
      icon = faUserSecret;
      break;
    case 'Dining':
      icon = faUtensils;
      break;
    default:
      icon = faDice;
      break;
  }

  let percent = 0;
  let noBudget = false;
  if (category && spent && limit) {
    percent = (spent * 100) / limit;
  }
  if (limit === 0) {
    noBudget = true;
  }
  return (
    <div className="compact">
      <div className="expense">
        <div className="details">
          <div className="category-icon">
            <div className="category-progress-bar">
              <CircularProgressbarWithChildren
                value={percent > 100 ? percent -100 : percent}
                styles={buildStyles({
                  strokeLinecap: 'round',
                  pathTransitionDuration: 1,
                  pathColor: percent > 100 ? `rgba(255, 62, 52, 1)` : `rgba(62, 152, 199, 1)`,
                  textColor: '#444',
                  // textSize: '50px',
                  trailColor: '#dfdfdf',
                  backgroundColor: '#3e98c7',
                })}
              >
                <FontAwesomeIcon icon={icon} size="sm" />

                {/* <i className="fas fa-2x fa-piggy-bank"></i> */}
              </CircularProgressbarWithChildren>
            </div>
          </div>
          <div className="info">
            <span className="category">{category}</span>
            <span className="name">{ noBudget ? 'No budget set' : percent > 100 ? `${parseInt(percent-100)}% over budget` : `${parseInt(percent)}% of budget`}</span>
          </div>
        </div>
        <div className="numbers">
          <span className="amount">€{limit}</span>
          <span className="date">{transactions} transactions</span>
        </div>
      </div>
    </div>
  );
}

export default CategoryBudgetCompact;
