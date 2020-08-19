import React from 'react'
import ExpenseCompactView from './dashboard/ExpenseCompactView';

const ExpensesCompact = ({ expenses }) => {
  let total = 0;
  let latest = [];
  if (expenses) {
    total = expenses.reduce((a, c) => a + c.amount, 0);
    latest = expenses.sort((a, b) => b.date - a.date).slice(0, 2);
  }

  return (
    <div className="expenses-compact">
      <h4>Expenses</h4>
      <p>{total ? ` $${total}` : `Add your expenses`}</p>
      {latest.map(item => <p>{item.name}{' '}{'$'}{item.amount}</p>)}
      <ExpenseCompactView />
    </div>
  )
}

export default ExpensesCompact
