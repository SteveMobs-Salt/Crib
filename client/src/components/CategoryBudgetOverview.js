import React, { useContext} from 'react'
import HouseholdContext from '../contexts/HouseholdContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import ExpenseCompactView from './dashboard/ExpenseCompactView';

function CategoryBudgetOverview() {
  const {category} = useParams();
  const { household: { budgets, expenses } } = useContext(HouseholdContext);
  const {amount} = budgets.find(a => a.category === category);
  const catExpenses = expenses.filter(a=> a.category === category);
  return (
    <div>
      <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
      {/* add button to edit / delete budget????? */}
      {/* dashboard/budget/'category'/edit */}
      <h2>{category}</h2>
      <h3>{amount}</h3>
    {catExpenses.map(a => <ExpenseCompactView name={a.name} amount={a.amount} category={category}/>)}
    </div>
  )
}

export default CategoryBudgetOverview
