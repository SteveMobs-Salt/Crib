import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faShower,
  faSubway,
  faMoneyCheckAlt,
  faHospitalUser,
  faHouseUser,
  faSwimmer,
  faCocktail,
  faUserSecret,
  faDice,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function ExpenseCompactView({ name, amount, category, date }) {
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
  return (
    <div className="compact">
      {/* category with icon / possible its own component Icon */}
      <div className="expense">
        <div className="details">
          <div className="category-icon">
            <FontAwesomeIcon icon={icon} size="lg" />
          </div>
          <div className="info">
            <span className="category">{category}</span>
            <span className="name">{name}</span>
          </div>
        </div>
        <div className="numbers">
          <span className="amount">€{amount}</span>
          <span className="date">{moment(date).format('MMM Do')}</span>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCompactView;
