import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faRunning } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import HouseholdContext from '../contexts/HouseholdContext'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import axios from 'axios';

function ManageGroups() {
  const history = useHistory();
  const { user, household, setHousehold } = useContext(HouseholdContext);

  let householdsArray;
  if (household) {
    householdsArray = household.filter(a => a.type === "Group").map(a => {
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

  const handleLeaveGroup = (id) => {
    axios
      .delete(`/api/groups/leave?id=${id}&userId=${user.userId}`)
      .then(data => { 
        setHousehold(data.data) 
      })
      .catch(err => console.log(err));
    history.go(-1);
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
          {householdsArray && householdsArray.length ? householdsArray.map(a => <li key={a.id}>
            <p className="name">{a.name}</p>
            <div className="manage-progress-bar">
              <CircularProgressbarWithChildren
                value={parseInt((a.expenseAmount * 100) / a.budgetAmount)}
                styles={buildStyles({
                  strokeLinecap: 'round',
                  pathTransitionDuration: 1,
                  pathColor: 0 > 100 ? `rgba(255, 62, 52, 1)` : `rgba(62, 152, 199, 1)`,
                  textColor: '#444',
                  trailColor: '#dfdfdf',
                  backgroundColor: '#3e98c7',
                })}
              >
                <span className="budget-percent"> {parseInt((a.expenseAmount * 100) / a.budgetAmount)}%
                </span>
                <span className="budget-amount"> of €{a.budgetAmount} </span>
              </CircularProgressbarWithChildren>
            </div>
            <span className="code">Group code: {a.code}</span>
            <span className="expenses">Total expenses: €{a.expenseAmount}</span>
            <span className="members">Group members: {a.members}</span>
            <button type="button" onClick={() => handleLeaveGroup(a.id)}>Leave Group <FontAwesomeIcon icon={faRunning} size="lg" /></button>
          </li>) : "Join group first"}
        </ul>
      </div>
    </div>
  )
}

export default ManageGroups
