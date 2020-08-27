import React, { useState, useContext, useEffect } from 'react';
import HouseholdContext from '../contexts/HouseholdContext';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faReceipt,
  faCalendarAlt,
  faFileInvoiceDollar,
  faTrash,
  faEdit,
  faCommentsDollar,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Select from 'react-select';

function ExpenseOverview() {
  const [editMode, setEditMode] = useState(false);
  const [selectedDebtors, setSelectedDebtors] = useState([]);
  

  const history = useHistory();
  const { expenseId } = useParams();
  const { user, setHousehold, household, selectedHousehold } = useContext(
    HouseholdContext,
  );
  let expense, expenses, categories, id, type;
  if (household) {
    ({ expenses, categories, _id: id, type } = household[selectedHousehold]);
  }
  if (expenses) {
    expense = expenses.find(e => e._id === expenseId);
  }
  useEffect(() => {

    setSelectedDebtors(expense.debtors);
  }, [editMode]);

  const handleDelete = event => {
    event.preventDefault();
    axios
      .delete(`/expenses?expenseId=${expenseId}&id=${id}`)

      //TODO Make sure to delete item from expenses

      .then(data => {
        const copy = [...household];
        copy[selectedHousehold].expenses = copy[
          selectedHousehold
        ].expenses.filter(a => a._id !== expenseId);
        setHousehold(copy);
      })
      .catch(err => console.log(err));
    history.go(-1);
  };

  const handleEdit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const amount = parseFloat(event.target.amount.value);
    const category = event.target.category.value;
    const debtors = selectedDebtors ? selectedDebtors : [];
    axios

      //TODO Make sure to edit item in expenses

      .put(`/expenses`, { name, expenseId, amount, category, id, debtors })
      .then(data => {
        setHousehold(data.data);
      })
      .catch(err => console.log(err));
      setSelectedDebtors([]);
      setEditMode(false);
  };

  let owners;
  if (household) {
    ({ owners } = household[selectedHousehold]);
    owners = owners
      .filter(a => a.userId !== user.userId)
      .map(a => {
        return {
          value: a.userId,
          label: a.name,
        };
      });
  }
  const onSelect = selectedOptions => {
    setSelectedDebtors(selectedOptions);
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
          <FontAwesomeIcon icon={faReceipt} size="lg" />
        </div>
        <div className="details">
          <span className="amount">€{expense.amount}</span>

          <div className="name tag">
            {/* <span className="date-icon">
              <FontAwesomeIcon icon={faCalendarAlt}  size="lg"/>
            </span> */}
            <span className="">{expense.name}</span>
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
            <span className="">{expense.category}</span>
          </div>
          {expense.debtors && expense.creditor !== user.userId ? (
            <div className="debt tag">
              <span className="date-icon">
                <FontAwesomeIcon icon={faCommentsDollar} size="lg" />
              </span>
              <span className="">
                You owe €{expense.amount / (expense.debtors.length + 1)}
              </span>
            </div>
          ) : null}
          {expense.debtors.length && expense.creditor === user.userId ? (
            <div className="debt tag">
              <span className="date-icon">
                <FontAwesomeIcon icon={faCommentsDollar} size="lg" />
              </span>
              <span className="">
                {expense.debtors.length === 1
                  ? `${expense.debtors[0].label} owes you €${
                      expense.amount / (expense.debtors.length + 1)
                    }`
                  : expense.debtors.length === 2
                  ? `${expense.debtors
                      .map(a => a.label)
                      .join(' and ')} each owe you ${
                      expense.amount / (expense.debtors.length + 1)
                    }`
                  :
                    expense.debtors.length > 2 
                    ? `${expense.debtors.slice(0, (expense.debtors.length -1) )
                          .map(a => a.label)
                          .join(', ')} and ${expense.debtors[expense.debtors.length -1].label} each owe you €${expense.amount / (expense.debtors.length + 1)}` : ''
                  }
              </span>
            </div>
          ) : null}
        </div>
        {expense.creditor === user.userId ? (
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
        ) : null}

        {editMode ? (
          <div className="edit-form">
            <form
              className="edit-expense"
              onSubmit={event => handleEdit(event)}
            >
              <input name="name" type="text" placeholder={expense.name} />
              <input
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder={expense.amount}
              />
              <select name="category" type="string">
                {categories
                  ? categories.map(category =>
                    category === expense.category ? (
                      <option key={category} value={category} selected>
                        {category}
                      </option>
                    ) : (
                        <option key={category} value={category}>{category}</option>
                      ),
                  )
                  : null}
              </select>
              {/* <input placeholder={expense.debtors}/> */}
              {type === 'Group' ? (
                <Select
                  options={owners}
                  isMulti
                  name="debtors"
                  onChange={onSelect}
                  className="debtors-select-container"
                  classNamePrefix="debtors-select"
                  defaultValue={expense.debtors}
                // styles={}
                />
              ) : null}
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ExpenseOverview;
