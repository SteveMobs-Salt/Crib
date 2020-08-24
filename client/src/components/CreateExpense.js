import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom';
import HouseholdContext from '../contexts/HouseholdContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function CreateExpense() {
  const {
    setHousehold,
    household,
    selectedHousehold
  } = useContext(HouseholdContext);
  const history = useHistory();

  let categories, id;
  if(household) {
    ({categories, _id: id} = household[selectedHousehold])
  }

  const handleCreateExpense = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const amount = parseFloat(e.target.amount.value);
    const category = e.target.category.value;
    axios
      .post('/expenses', {
        name,
        amount,
        category,
        id
      })
      .then(data=> {
        return data.data
      })
      .then(res => setHousehold(res))
      .catch(err => console.log(err));
      history.go(-1)
  };

  return (
    <div className="create-expense">
      <div className="header">
        <nav>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            onClick={() => history.go(-1)}
          />
          <h2>Add Expense</h2>
        </nav>
      </div>

      <form onSubmit={e => handleCreateExpense(e)}>
        <input type="text" placeholder="Name" name="name" />
        <input type="number" placeholder="Amount" step="0.01" name="amount" min="0" />
        <select name="category" id="">
          {categories
            ? categories.map(c => <option value={c}>{c}</option>)
            : null}
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateExpense;
