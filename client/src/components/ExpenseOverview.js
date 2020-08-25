import React, { useState, useContext, useEffect } from 'react';
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
import Select from 'react-select';

function ExpenseOverview() {
  const [editMode, setEditMode] = useState(false);
  const [selectedDebtors, setSelectedDebtors] = useState([]);

  const history = useHistory();
  const { expenseId } = useParams();
  const {
    user,
    setHousehold,
    household,
    selectedHousehold
  } = useContext(HouseholdContext);
  let expense, expenses, categories, id;
  if (household) {
    ({ expenses, categories, _id: id } = household[selectedHousehold]);
  }
  if (expenses) {
    expense = expenses.find(e => e._id === expenseId);
  }

  useEffect(() => {
    setSelectedDebtors(expense.debtors);
  }, [editMode]);

  // not finished
  // CONTINUE FROM HERE TOMORROW
  const handleDelete = event => {
    event.preventDefault();
    axios
      .delete(`/expenses?expenseId=${expenseId}&id=${id}`)

      //TODO Make sure to delete item from expenses

      .then(data => {
        const copy = [...household];
        copy[selectedHousehold].expenses = copy[selectedHousehold].expenses.filter(a => a._id !== expenseId);
        setHousehold(copy);
      })
      .catch(err => console.log(err));
    history.go(-1);
  };

  const handleEdit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const amount = parseFloat(event.target.amount.value);
    // const debtors = event.target.debtors.value;
    const category = event.target.category.value;
    const debtors = selectedDebtors ? selectedDebtors : [];
    axios

      //TODO Make sure to edit item in expenses

      .put(`/expenses`, { name, expenseId, amount, category, id, debtors })
      .then(data => {
        // const copy = [...household];
        // const index = copy[selectedHousehold].expenses.map(a => a._id).indexOf(expenseId);
        // if (name) copy[selectedHousehold].expenses[index].name = name;
        // if (category) copy[selectedHousehold].expenses[index].category = category;
        // if (debtors) copy[selectedHousehold].expenses[index].debtors = debtors;
        // if (amount) copy[selectedHousehold].expenses[index].amount = amount;
        // setHousehold(copy);
        setHousehold(data.data);
      }
      )
      .catch(err => console.log(err));
  };

  let owners;
  if (household) {
    ({ owners } = household[selectedHousehold])
    owners = owners.filter(a => a.userId !== user).map(a => {
      return {
        value: a.userId,
        label: a.name
      }
    })
  }
  const onSelect = selectedOptions => {
    setSelectedDebtors(selectedOptions)
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
          <h2>Transaction</h2>
        </nav>
      </div>

      <div className="receipt compact">
        <div className="icon">
          <FontAwesomeIcon icon={faReceipt} size="lg" />
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
              <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
            </span>
            <span className="">
              {moment(expense.date).format('MMM Do YYYY')}
            </span>
          </div>
          <div className="category tag">
            <span className="category-icon">
              <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
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
              <Select
                options={owners}
                isMulti
                name="debtors"
                onChange={onSelect}
                className="basic-multi-select"
                classNamePrefix="select"
                defaultValue={expense.debtors}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ExpenseOverview;
