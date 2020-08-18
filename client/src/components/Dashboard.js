import React, { Component, useContext } from 'react'
import UserContext from '../UserContext'
import BudgetCompact from './BudgetCompact'
import ExpensesCompact from './ExpensesCompact'
import ShoppingListCompact from './ShoppingListCompact'

const Dashboard = () => {
  const { userID } = useContext(UserContext)
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



