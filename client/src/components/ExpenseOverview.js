import React, { useContext } from 'react';
import HouseholdContext from '../contexts/HouseholdContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory,
    useParams
} from 'react-router-dom';
import axios from 'axios';

function ExpenseOverview() {

    const history = useHistory();
    const { id } = useParams();
    const { setHousehold,
        household: { expenses } } = useContext(HouseholdContext);
    let expense;
    if (expenses) {
        expense = expenses.find(e => e._id === id);
        console.log(expense);
    }

    const handleDelete = event => {
        event.preventDefault();
        axios
            .delete(`/expenses?id=${id}`)
            .then(data => setHousehold(data.data))
            .catch(err => console.log(err));
    }


    return (
        <div>
            <i className="fa fa-chevron-left"
                onClick={() => history.go(-1)}></i>
            <h4>{expense.name}{' '}{expense.amount}</h4>
            <p>Category: {expense.category}</p>
            <p>Date:{expense.date}</p>
            <p>Debtors: {expense.debtors}</p>

            <button name="editExpense" >Edit</button>
            <button name="removeExpense" type="button"
                onClick={event => handleDelete(event)}>Remove</button>
        </div>
    )
}

export default ExpenseOverview
