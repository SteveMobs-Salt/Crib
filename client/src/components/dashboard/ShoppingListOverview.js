import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import HouseholdContext from '../../contexts/HouseholdContext';
import { func } from 'prop-types';
import axios from 'axios';

function ShoppingListOverview() {
  const [item, setItem] = useState("");
  const history = useHistory();
  const {
    setHousehold,
    household: { shoppingList },
  } = useContext(HouseholdContext);

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('/shopping_list', { name: item })
      .then(data => setHousehold(data.data))
      .catch(err => console.log(err));
  };

    return (
      <div>
        <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
        <h2>Shopping List</h2>
        <form onSubmit={event => handleSubmit(event)}>
          <label>Add item</label>
          <input onChange={event => setItem(event.target.value)} />
          <button>Submit</button>
        </form>
        {/* form + inputfield */}
        {shoppingList ? shoppingList.map(item => <p>{item.name}</p>) : <p>Add items to buy here</p>}
      </div>
    );
  }

export default ShoppingListOverview;
