import React, { Component, useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import BudgetCompact from './BudgetCompact'
import ExpensesCompact from './ExpensesCompact'
import ShoppingListCompact from './ShoppingListCompact'
import HouseholdContext from '../contexts/HouseholdContext'

const Dashboard = () => {
  const { userID } = useContext(UserContext);
  const { household, setHousehold } = useContext(HouseholdContext);
  useEffect(() => {
    fetch('/household')
      .then(res => res.json())
      .then(data => setHousehold(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h2>Dashboard</h2>
      <BudgetCompact />
      <ExpensesCompact />
      <ShoppingListCompact />
    </div>
  )
}

export default Dashboard



