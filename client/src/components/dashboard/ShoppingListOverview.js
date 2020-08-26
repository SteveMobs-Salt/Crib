import React, { useContext } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import HouseholdContext from '../../contexts/HouseholdContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import ShoppingListItem from '../ShoppingListItem';

function ShoppingListOverview() {
  const history = useHistory();
  const {
    setHousehold,
    household,
    selectedHousehold
  } = useContext(HouseholdContext);


  let shoppingList, id;
  if (household) {
    ({shoppingList, _id: id} = household[selectedHousehold])
  }

  const handleSubmit = event => {
    event.preventDefault();
    const shoppingItem = event.target.item;
    axios
      .post('/shopping_list', { name: shoppingItem.value, id })
      .then(data => setHousehold(data.data))
      .catch(err => console.log(err));
    shoppingItem.value = null;
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
          ))
      ) : (
        <p>Add items to buy here</p>
      )}
    </div>
  );
}

export default ShoppingListOverview;
