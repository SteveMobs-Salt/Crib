import React, { useContext } from 'react';
import {
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import HouseholdContext from '../../contexts/HouseholdContext';
import ExpenseCompactView from './ExpenseCompactView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
        {expenses.length ? expenses.map(expense => (
          <Link to={`${url}/${expense._id}`}>
            <ExpenseCompactView
              category={expense.category}
              amount={expense.amount}
              name={expense.name}
              date={expense.date}
            />
          </Link>
        )) : (<div className="no-expense"><span>Add your first expense</span></div>)}
        {/* add expense button/link to navigate to /dashboard/expenses/add  */}
      </div>
    );
}

export default ExpensesOverview;
