import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom';
import HouseholdContext from '../contexts/HouseholdContext'

function ManageGroups() {
  const history = useHistory();
  const { household, setHousehold } = useContext(HouseholdContext);

  let householdsArray;
  if(household) {
    householdsArray = household.filter(a=> a.type === "Group").map(a => {
      return {
       members: a.owners.length,
       budgets: a.budgets.length,
       budgetAmount: a.budgets.reduce((a, c) => a + c.amount, 0),
       expenses: a.expenses.length,
       expenseAmount: a.expenses.reduce((a, c) => a + c.amount, 0),
       listItems: a.shoppingList.length,
       name: a.name,
       code: a.referral_code,
       id: a._id
      }
    })
    console.log(householdsArray);
  }
  return (
    <div className="manage-groups">
      <div className="header">
        <nav>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            onClick={() => history.go(-1)}
          />
          <h2>Manage Groups</h2>
        </nav>
      </div>
      <div className="group-list">
        <ul>
  {householdsArray && householdsArray.length ? householdsArray.map(a=> <li key={a.id}>
  <p className="name">{a.name}</p>
    <span className="budget-amount">Amount: €{a.budgetAmount}</span>
    <span className="budgets"># of budgets: {a.budgets}</span>
    <span className="code">Budget Total: {a.code}</span>
    <span className="expense-amount">Expense Total: €{a.expenses}</span>
    <span className="expenses"># of expenses: {a.expenseAmount}</span>
    <span className="list-items"># of items: {a.listItems}</span>
    <span className="members"># of members: {a.members}</span>
    <button type="button">Delete icon</button>
  </li>) : "Join group first"}

  {/* budgetAmount: 0
budgets: 11
code: "B928E2"
expenseAmount: 0
expenses: 0
id: "5f466dacd37d8c0017296b32"
listItems: 0
members: 1 */}
{/* name: "Jonas Brothers" */}
        </ul>
      </div>
    </div>
  )
}

export default ManageGroups
