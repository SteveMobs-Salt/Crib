import React, { Component, useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import BudgetCompact from './BudgetCompact'
import ExpensesCompact from './ExpensesCompact'
import ShoppingListCompact from './ShoppingListCompact'
import HouseholdContext from '../contexts/HouseholdContext'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';

const Dashboard = () => {
  const { userID } = useContext(UserContext);
  const { household, setHousehold } = useContext(HouseholdContext);
  const { path, url } = useRouteMatch();
  useEffect(() => {
    fetch('/household')
      .then(res => res.json())
      .then(data => setHousehold(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h2>Dashboard</h2>

      {/* /dashboard/budget */}
      <Link to={`${url}/budget`} >
        <BudgetCompact budget={household.budget} expenses={household.expenses} />
      </Link>
      {/* /dashboard/expenses */}
      <Link to={`${url}/expenses`} >
        <ExpensesCompact expenses={household.expenses}/>
      </Link>
      {/* /dashboard/shopping-list */}
      <Link to={`${url}/shopping-list`} >
        <ShoppingListCompact />
      </Link>
    </div>
  )
}

export default Dashboard



