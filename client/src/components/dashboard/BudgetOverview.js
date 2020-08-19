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
import CategoryBudgetCompact from '../CategoryBudgetCompact';

function BudgetOverview() {
  const history = useHistory();
  const {
    household: { budgets, expenses, categories },
  } = useContext(HouseholdContext);

  // map over categories, which maps over expenses matching the categories
  let data = [];
  if (budgets && expenses && categories) {
    data = categories.map(cat => {
      let total = expenses
        .filter(exp => exp.category === cat)
        .map(e => e.amount)
        .reduce((a, c) => a + c, 0);
      let {amount} = budgets.find(a=> a.category === cat)

      return { category: cat, spent: parseFloat(total.toFixed(2)), limit: amount };
    });
  }
  return (
    <div>
      <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
      <h2>Budget</h2>
      {/* {budget.amount} */}
      {/* {budgets.map( budget => <p>{budget}</p>)} */}
      {/* <BudgetChart /> */}
      { data ? data.map(cat => <CategoryBudgetCompact category={cat.category} spent={cat.spent} limit={cat.limit}/>) : null}
    </div>
  );
  // return (
  //   <div>
  //     <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
  //     <h2>Budget</h2>
  //     <p>please add a budget</p>
  //     {/* add expense button/link to navigate to /dashboard/budget/edit  */}

  //   </div>
  // );
}

export default BudgetOverview;
