import React, { useContext } from 'react';
import HouseholdContext from '../contexts/HouseholdContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import ExpenseCompactView from './dashboard/ExpenseCompactView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
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
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

function CategoryBudgetOverview() {
  const history = useHistory();
  const { category } = useParams();
  const { path, url } = useRouteMatch();
  const {
    selectedHousehold,
    household
  } = useContext(HouseholdContext);
  let amount, catExpenses, percent, budgets, expenses;
  let budgetTotal=0, catExpensesTotal=0;
  if(household) {
    ({budgets, expenses} = household[selectedHousehold])
  }
  if (budgets && expenses) {
    let budget = budgets.find(a => a.category === category);
    amount = budget.amount;
    catExpenses = expenses.filter(a => a.category === category);
    percent = (catExpenses.reduce((a, c) => a + c.amount, 0) * 100) / budgets.reduce((a, c) => a + c.amount, 0)
  }

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
    <div className="category-budget-overview">
      <div className="header">
        <nav>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            onClick={() => history.go(-1)}
          />
          <h2>{category}</h2>
        </nav>
        <Link to={`${url}/edit`}>
            <FontAwesomeIcon icon={faEdit} size="lg" />
          </Link>
      </div>

      {/* add button to edit / delete budget????? */}
      {/* dashboard/budget/'category'/edit */}
      {/* <h3>{amount}</h3> */}
      <div className="category-progress-overview">
        <CircularProgressbarWithChildren
          value={percent}
          background
          backgroundPadding={6}
          // text={`${parseInt(percent)}% of total budget`}
          styles={buildStyles({
            strokeLinecap: 'butt',
            pathTransitionDuration: 1,
            pathColor: `rgba(255, 255, 255, 1)`,
            textColor: '#fff',
            textSize: '10px',
            trailColor: `rgba(62, 152, 199, 1)`,
            backgroundColor: '#3e98c7',
          })}>
            <div className="total-budget">
            <span className="percent">{`${parseInt(percent)}%`}</span>
            <br />
            {`of total budget`}
            </div>
          {/* <FontAwesomeIcon icon={icon} size="5x" /> */}
        </CircularProgressbarWithChildren>
      </div>
      <div>
        {catExpenses
          ? catExpenses.map(a => (
            <Link to={`/dashboard/expenses/${a._id}`}>
              <ExpenseCompactView
                name={a.name}
                amount={a.amount}
                category={category}
                date={a.date}
              />
            </Link>
            ))
          : null}
      </div>
    </div>
  );
}

export default CategoryBudgetOverview;
