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
import BudgetChart from '../BudgetChart';

function BudgetOverview({expenses}) {
  const history = useHistory();
  const {
    household: { budgets },
  } = useContext(HouseholdContext);


  if (budgets) {
    return (
      <div>
        <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
        <h2>Budget</h2>
        {/* {budget.amount} */}
    {/* {budgets.map( budget => <p>{budget}</p>)} */}
        {/* <BudgetChart /> */}
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
