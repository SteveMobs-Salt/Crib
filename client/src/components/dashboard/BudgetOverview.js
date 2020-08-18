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

function BudgetOverview() {
  const history = useHistory();
  const {
    household: { budget },
  } = useContext(HouseholdContext);


  if (budget) {
    return (
      <div>
        <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
        <h2>Budget</h2>

      </div>
    );
  }
  return (
    <div>
      <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
      <h2>Budget</h2>
      <p>please add a budget</p>
      {/* add expense button/link to navigate to /dashboard/budget/edit  */}

    </div>
  );
}

export default BudgetOverview
