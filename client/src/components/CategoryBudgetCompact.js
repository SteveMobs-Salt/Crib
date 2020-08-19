import React from 'react';

function CategoryBudgetCompact({ category, spent, limit }) {
  return (
    <div>
      <span>{category}</span>
      <p>
        ${spent} of {limit}
      </p>
      <p>${limit - spent} left</p>
    </div>
  );
}

export default CategoryBudgetCompact;
