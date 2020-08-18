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

function ExpensesOverview() {
  const history = useHistory();
  const {
    household: { expenses },
  } = useContext(HouseholdContext);


  if (expenses) {
    return (
      <div>
        <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
        <h2>Expenses</h2>
        {/* map over <ExpenseCompactView />  */}
        {expenses.map( expense => <ExpenseCompactView category={expense.category} amount={expense.amount} name={expense.name} /> )}
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

export default ExpensesOverview
