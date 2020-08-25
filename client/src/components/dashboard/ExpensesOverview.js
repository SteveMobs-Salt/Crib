import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import HouseholdContext from '../../contexts/HouseholdContext';
import ExpenseCompactView from './ExpenseCompactView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faUtensils,
  faHamburger,
  faBolt,
  faShower,
  faSubway,
  faMoneyCheckAlt,
  faHouseDamage,
  faHospitalUser,
  faPiggyBank,
  faHouseUser,
  faSwimmer,
  faCocktail,
  faUserSecret,
  faTshirt,
  faDice,
  faCalculator,
  faShoppingBasket,
  faChevronCircleLeft,
  faChevronLeft,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

function ExpensesOverview() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const {
    selectedHousehold,
    household,
  } = useContext(HouseholdContext);

  let expenses;
  if (household) {
    ({expenses} = household[selectedHousehold])
  }
  if (expenses) {
    return (
      <div className="expenses-overview">
        <div className="header">
          <nav>
            <FontAwesomeIcon icon={faChevronLeft} size="lg" onClick={() => history.go(-1)}/>
            <h2>Expenses</h2>
          </nav>
          <Link to={`${url}/add`}>
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Link>
        </div>
        {/* map over <ExpenseCompactView />  */}
        {expenses.map(expense => (
          <Link to={`${url}/${expense._id}`}>
            <ExpenseCompactView
              category={expense.category}
              amount={expense.amount}
              name={expense.name}
              date={expense.date}
            />
          </Link>
        ))}
        {/* add expense button/link to navigate to /dashboard/expenses/add  */}
      </div>
    );
  }
  return (
    <div>
      <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
      <h2>Expenses</h2>
      <p>please add some expenses</p>
      {/* add expense button/link to navigate to /dashboard/expenses/add  */}
    </div>
  );
}

export default ExpensesOverview;
