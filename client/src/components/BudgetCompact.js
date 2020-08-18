import React from 'react'

const BudgetCompact = ({budget, expenses}) => {
  const amount = budget ? budget.amount : 0; 
  const expenseTotal = expenses ?  expenses.reduce((a, c) => a + c.amount, 0) : 0;
  return (
    <div className="budget-compact">
      Budget component
    <h4>{amount && expenseTotal ? `Total Budget: ${amount}` : null}</h4>
    <h4>{amount && expenseTotal ? `Amount left: ${Number(amount - expenseTotal).toFixed(2)}` : null}</h4>
    </div>
  )
}

export default BudgetCompact
