import React, { useContext } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import axios from 'axios';
import HouseholdContext from '../contexts/HouseholdContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function CreateBudget() {
  const history = useHistory();
  const { selectedHousehold, household, setHousehold } = useContext(HouseholdContext);

  // REDIRECT AFTER POST
  let id;
  if(household) {
    id = household[selectedHousehold]._id;
  }

  // Possibly better alternative
  // let id;
  // if(household) {
  //   ({_id: id} = household[selectedHousehold]);
  // }

  const handleCreateBudget = event => {
    event.preventDefault();
    const body = {
      category: event.target.category.value,
      amount: parseFloat(event.target.amount.value),
      id
    };
    axios
      .post('/budget', body)
      .then(data => {
        return data;
      })
      .then(res => {
        setHousehold(res.data);
        history.go(-2);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="create-budget">
      <div className="header">
        <nav>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            onClick={() => history.go(-1)}
          />
          <h2>Create Budget</h2>
        </nav>
      </div>
      <form onSubmit={event => handleCreateBudget(event)}>
        <input name="category" type="text" required placeholder="Budget type" />
        <input name="amount" type="number" required step="0.01" min="0" placeholder="Amount" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateBudget;
