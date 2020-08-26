import React, { useContext } from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import HouseholdContext from '../contexts/HouseholdContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function EditBudget() {
  const { setHousehold, household, selectedHousehold } = useContext(
    HouseholdContext,
  );
  const history = useHistory();
  const { category } = useParams();
  let id;
  if (household) {
    ({ _id: id } = household[selectedHousehold]);
  }

  const handleEditBudget = e => {
    e.preventDefault();
    const newCat = e.target.category ? e.target.category.value : null;
    const amount = e.target.amount ? e.target.amount.value : null;
    axios
      .put(
        `/budget?${newCat ? `category=` + newCat : ''}&${
          amount ? `amount=` + amount : ''
        }&id=${id}&previousCategory=${category}`,
      )
      .then(response => setHousehold(response.data))
      .catch(err => console.log(err));
    history.go(-2);
  };
  const handleDeleteBudget = () => {
    axios
      .delete(`/budget?id=${id}&category=${category}`)
      .then(res => setHousehold(res.data))
      .catch(err => console.log(err));
    history.go(-2);
  };
  const defaultCat = [
    'Groceries',
    'Housing',
    'Utilities',
    'Transportation',
    'Insurance',
    'Loan Repayments',
    'Entertainment',
    'Clothing',
    'Dining',
    'Fitness',
    'Other',
  ];

  return (
    <div className="edit-budget">
      <div className="header">
        <nav>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            onClick={() => history.go(-1)}
          />
          <h2>Edit {category} Budget</h2>
        </nav>
        {defaultCat.includes(category) ? null : (
          
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="lg"
            className="header-icon"
            onClick={() => handleDeleteBudget()}
          />
        )}
      </div>
      <div className="form">
        <form onSubmit={e => handleEditBudget(e)}>
          {defaultCat.includes(category) ? null : (
            <input type="text" placeholder="Budget Name" name="category" />
          )}
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Amount"
            name="amount"
          />
          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
}

export default EditBudget;
