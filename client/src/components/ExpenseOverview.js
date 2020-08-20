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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

function ExpenseOverview() {

    const history = useHistory();
    const { id } = useParams();
    const { setHousehold,
        household: { expenses, categories } } = useContext(HouseholdContext);
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
        history.go(-1);
    }

    const handleEdit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const amount = parseInt(event.target.amount.value);
        // const debtors = event.target.expense.debtors.value;
        const category = event.target.category.value;
        axios
            .put(`/expenses`, { name, id, amount, category })
            .then(data => setHousehold(data.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="expense-overview">
            <div className="header">
                <nav>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        size="lg"
                        onClick={() => history.go(-1)}
                    />
                    <h3>{expense.name}</h3>
                </nav>
            </div>
            <h4>{expense.name}{' '}{expense.amount}</h4>
            <p>Category: {expense.category}</p>
            <p>Date:{expense.date}</p>
            <p>Debtors: {expense.debtors}</p>

            <button name="editExpense" type="button">Edit</button>
            <button name="removeExpense" type="button"
                onClick={event => handleDelete(event)}>Remove</button>
            <div>
                <form className="edit-expense" onSubmit={event => handleEdit(event)}>
                    <input name="name" type="text" placeholder={expense.name} />
                    <input name="amount" type="number" placeholder={expense.amount} />
                    <select name="category" type="string">
                        {
                            categories ? categories.map(category => <option value={category}>{category}</option>) : null
                        }
                    </select>
                    {/* <input placeholder={expense.debtors}/> */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default ExpenseOverview
