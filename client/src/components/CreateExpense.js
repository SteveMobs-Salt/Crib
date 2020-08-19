import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import HouseholdContext from '../contexts/HouseholdContext';
import axios from 'axios';

function CreateExpense() {
  const {
    setHousehold,
    household: { categories },
  } = useContext(HouseholdContext);
  const history = useHistory();

  const handleCreateExpense = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const amount = parseInt(e.target.amount.value);
    const category = e.target.category.value;
    axios
      .post('/expenses', {
        name,
        amount,
        category,
      })
      .then(plb => {
        console.log(plb);
        return plb;
      })
      .then(res => setHousehold(res.data.data))
      .catch(err => console.log(err));
      history.go(-1)
  };

  return (
    <div>
      <div className="header">
        <nav>
          <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
          <h2>Create Expense</h2>
        </nav>
      </div>

      <form onSubmit={e => handleCreateExpense(e)}>
        <input type="text" name="name" id="" />
        <input type="number" name="amount" min="0" />
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
