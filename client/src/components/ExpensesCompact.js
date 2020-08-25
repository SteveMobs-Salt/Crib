import React from 'react'
import ExpenseCompactView from './dashboard/ExpenseCompactView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEuroSign
} from '@fortawesome/free-solid-svg-icons';

const ExpensesCompact = ({ expenses }) => {
  let total = 0;
  let latest = [];
  if (expenses) {
    total = parseInt(expenses.reduce((a, c) => a + c.amount, 0));
    latest = expenses.sort((a, b) => b.date - a.date).slice(0, 2);
  }

  return (
    <div className="compact expenses">
      <div className="compact-extitle">
        <span className="title">Expenses</span>
        <span className="total-expenses">{total ? ` €${total}` : `Add your expenses`}</span>
      </div>
      {latest.map(item => <ExpenseCompactView key={item._id} name={item.name} amount={item.amount} category={item.category} date={item.date} />)}

    </div>
  )
}

export default ExpensesCompact
