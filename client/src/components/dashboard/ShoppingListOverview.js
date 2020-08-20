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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import ShoppingListItem from '../ShoppingListItem';

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
      .catch(err => console.log(err));
  };

  return (
    <div className="shoppingList-overview">
      <div className="header">
        <nav>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            onClick={() => history.go(-1)}
          />
          <h2>Shopping List</h2>
        </nav>
      </div>
      <form onSubmit={event => handleSubmit(event)}>
        <input name="item" required placeholder="Need anything?" />
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
      {/* form + inputfield */}
      
      {shoppingList ? (
        shoppingList
          .sort((a, b) => b.date - a.date)
          .map(item => (
            <ShoppingListItem item={item}/>
            // <div className="compact">
            //   <div className="shopping-item">
            //     <p className="item-name">{item.name}</p>
            //     <FontAwesomeIcon
            //       icon={faTrash}
            //       onClick={() => handleDelete(item._id)}
            //     />
            //   </div>
            // </div>
          ))
      ) : (
        <p>Add items to buy here</p>
      )}
    </div>
  );
}

export default ShoppingListOverview;
