import React, {useContext} from 'react';
import HouseholdContext from '../contexts/HouseholdContext';
import {BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory,
    useParams
  } from 'react-router-dom';

function ExpenseOverview() {
 const {id} = useParams();
 const {household: {expenses}} = useContext(HouseholdContext);
 let expense;
 if(expenses){
     expense = expenses.find(e => e._id === id );
     console.log(expense);
 }
    return (
        <div>
            <h4>{expense.name}{' '}{expense.amount}</h4>
        </div>
    )
}

export default ExpenseOverview
