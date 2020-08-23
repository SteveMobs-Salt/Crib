import React, { useContext, useEffect } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import HouseholdContext from '../../contexts/HouseholdContext';
import CategoryBudgetCompact from '../CategoryBudgetCompact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

function BudgetOverview() {
  const history = useHistory();
  let storage = null;
  const {
    household: { budgets, expenses, categories },
  } = useContext(HouseholdContext);

  if (localStorage.getItem('localHousehold')) {
    storage = JSON.parse(localStorage.getItem('localHousehold'));
    console.log(storage)
    console.log(budgets)
  }

  const { path, url } = useRouteMatch();

  let data = null;
  if (budgets && expenses && categories) {
    data = categories.map(cat => {
      let total = expenses
        .filter(exp => exp.category === cat)
        .map(e => e.amount)
        .reduce((a, c) => a + c, 0);
      let { amount } = budgets.find(a => a.category === cat);
      let numOfExpenses = expenses.filter(a => a.category === cat).length;
      return {
        category: cat,
        spent: parseFloat(total.toFixed(2)),
        limit: amount,
        transactions: numOfExpenses,
      };
    });
  }
  return (
    <div className="budgets-overview">
      <div className="header">
        <nav>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            onClick={() => history.go(-1)}
          />
          <h2>Budget</h2>
        </nav>
        <Link to={`${url}/add`}>
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </Link>
      </div>
      <div className="numbers-overview">
        <span className="budget-total">
          <span className="number">
            ${budgets ? `${budgets.reduce((a, c) => a + c.amount, 0)}` : null}
          </span>
          <span>Total Budget</span>
        </span>
        <span className="spent-total">
          <span className="number">
            ${expenses ? `${expenses.reduce((a, c) => a + c.amount, 0)}` : null}
          </span>
          <span>Total Spent</span>
        </span>
      </div>
      {/* {budgets.map( budget => <p>{budget}</p>)} */}
      {/* <BudgetChart /> */}
      {data ? (
        data.map(cat => (
          <Link to={`${url}/${cat.category}`}>
            <CategoryBudgetCompact
              category={cat.category}
              spent={cat.spent}
              limit={cat.limit}
              transactions={cat.transactions}
            />
          </Link>
        ))
      ) : (
        <p>No data to show</p>
      )}
    </div>
  );
  // return (
  //   <div>
  //     <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
  //     <h2>Budget</h2>
  //     <p>please add a budget</p>
  //     {/* add expense button/link to navigate to /dashboard/budget/edit  */}

  //   </div>
  // );
}

export default BudgetOverview;
