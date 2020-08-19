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
  const history = useHistory();
  const {
    setHousehold,
    household: { shoppingList },
  } = useContext(HouseholdContext);

  const handleSubmit = event => {
    event.preventDefault();
    const shoppingItem = event.target.item;
    axios
      .post('/shopping_list', { name: shoppingItem.value })
      .then(data => setHousehold(data.data))
      .catch(err => console.log(err));
    shoppingItem.value = null;
  };

  const handleDelete = id => {
    console.log(id);
    axios
    .delete(`/shopping_list?id=${id}`)
    .then(data => setHousehold(data.data))
    .catch( err => console.log(err) );
  }

    return (
      <div>
        <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
        <h2>Shopping List</h2>
        <form onSubmit={event => handleSubmit(event)}>
          <label>Add item</label>
          <input name="item" />
          <button>Submit</button> 
        </form>
        {/* form + inputfield */}
        {shoppingList ? shoppingList.sort((a, b) => b.date - a.date).map(item => <p>{item.name}
        <button onClick={() => handleDelete(item._id)}>Remove</button></p>) : <p>Add items to buy here</p>}
      </div>
    );
  }

export default ShoppingListOverview;
