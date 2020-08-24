import React, { useState, useContext } from 'react';
import HouseholdContext from '../contexts/HouseholdContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faPlus,
  faReceipt,
  faCalendarAlt,
  faFileInvoiceDollar,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
function ExpenseOverview() {
  const [editMode, setEditMode] = useState(false);

  const history = useHistory();
  const { taskId } = useParams();
  const {
    setHousehold,
    household: { expenses, categories },
  } = useContext(HouseholdContext);
  let expense;
  if (expenses) {
    expense = expenses.find(e => e._id === taskId);
    console.log(expense);
  }


  // not finished
  // CONTINUE FROM HERE TOMORROW
  const handleDelete = event => {
    event.preventDefault();
    axios
      .delete(`/expenses?id=${taskId}`)
      .then(data => setHousehold(data.data))
      .catch(err => console.log(err));
    history.go(-1);
  };

  const handleEdit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const amount = parseInt(event.target.amount.value);
    // const debtors = event.target.expense.debtors.value;
    const category = event.target.category.value;
    axios
      .put(`/expenses`, { name, taskId, amount, category })
      .then(data => setHousehold(data.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="expense-overview">
      <div className="header">
        <nav>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            onClick={() => history.go(-1)}
          />
          <h2>Transaction</h2>
        </nav>
      </div>

      <div className="receipt compact">
        <div className="icon">
          <FontAwesomeIcon icon={faReceipt}  size="lg"/>
        </div>
        <div className="details">
          <span className="amount">€{expense.amount}</span>

          <div className="name tag">
            {/* <span className="date-icon">
              <FontAwesomeIcon icon={faCalendarAlt}  size="lg"/>
            </span> */}
            <span className="">
              {expense.name}
            </span>
          </div>

          <div className="date tag">
            <span className="date-icon">
              <FontAwesomeIcon icon={faCalendarAlt}  size="lg"/>
            </span>
            <span className="">
              {moment(expense.date).format('MMM Do YYYY')}
            </span>
          </div>
          <div className="category tag">
            <span className="category-icon">
              <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg"/>
            </span>
            <span className="">
                {expense.category}
            </span>
          </div>
        </div>
        <div className="actions">
          <button
          className="edit"

            name="editExpense"
            type="button"
            onClick={() => setEditMode(!editMode)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
          className="remove"
            name="removeExpense"
            type="button"
            onClick={event => handleDelete(event)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>

        {editMode ? (
          <div className="edit-form">
            <form
              className="edit-expense"
              onSubmit={event => handleEdit(event)}
            >
              <input name="name" type="text" placeholder={expense.name} />
              <input name="amount" type="number" step="0.01" min="0" placeholder={expense.amount} />
              <select name="category" type="string">
                {categories
                  ? categories.map(category => (
                      <option value={category}>{category}</option>
                    ))
                  : null}
              </select>
              {/* <input placeholder={expense.debtors}/> */}
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ExpenseOverview;
