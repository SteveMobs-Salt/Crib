import React from 'react'

function ExpenseCompactView({ name, amount, category }) {
  return (
    <div>
      {/* category with icon / possible its own component Icon */}
      {amount}
      {name}
    </div>
  )
}

export default ExpenseCompactView
