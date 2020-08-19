import React, { useContext} from 'react'
import HouseholdContext from '../contexts/HouseholdContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams
} from "react-router-dom";
import ExpenseCompactView from './dashboard/ExpenseCompactView';

function CategoryBudgetOverview() {
  const history = useHistory();
  const {category} = useParams();
  const { household: { budgets, expenses } } = useContext(HouseholdContext);
  let amount, catExpenses;
  if(budgets && expenses){
    let budget = budgets.find(a => a.category === category);
    amount = budget.amount;
    catExpenses = expenses.filter(a=> a.category === category);
  }
  return (
    <div>
      <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
      {/* add button to edit / delete budget????? */}
      {/* dashboard/budget/'category'/edit */}
      <h2>{category}</h2>
      <h3>{amount}</h3>
    {catExpenses ? catExpenses.map(a => <ExpenseCompactView name={a.name} amount={a.amount} category={category}/>) : null}
    </div>
  )
}

export default CategoryBudgetOverview
