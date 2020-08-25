import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import HouseholdContext from '../contexts/HouseholdContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

function CreateExpense() {
  const { user, setHousehold, household, selectedHousehold } = useContext(
    HouseholdContext,
  );
  const [selectedDebtors, setSelectedDebtors] = useState([]);
  const history = useHistory();

  let categories, id, type;
  if (household) {
    ({ categories, _id: id, type } = household[selectedHousehold]);
  }

  const handleCreateExpense = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const amount = parseFloat(e.target.amount.value);
    const category = e.target.category.value;
    // const debtors = selectedDebtors ? selectedDebtors.map(a=> a.value) : null;
    const debtors = selectedDebtors ? selectedDebtors : null;
    axios
      .post('/expenses', {
        name,
        amount,
        category,
        id,
        debtors,
      })
      .then(data => {
        return data.data;
      })
      .then(res => setHousehold(res))
      .catch(err => console.log(err));
    history.go(-1);
  };
  let owners;
  if(household){
    ({owners} = household[selectedHousehold])
    owners = owners.filter( a => a.userId !== user).map(a=> {
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
        <input
          type="number"
          placeholder="Amount"
          step="0.01"
          name="amount"
          min="0"
        />
        <select name="category" id="">
          {categories
            ? categories.map(c => <option value={c}>{c}</option>)
            : null}
        </select>

        {type === "Group" ? <Select
          options={owners}
          isMulti
          name="debtors"
          onChange={onSelect}
          className="basic-multi-select"
          classNamePrefix="select"
        /> : null}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateExpense;
