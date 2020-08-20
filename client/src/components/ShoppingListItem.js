import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import HouseholdContext from '../contexts/HouseholdContext';

function ShoppingListItem({item}) {
  const {
    setHousehold,
    household: { shoppingList },
  } = useContext(HouseholdContext);



  const handleDelete = id => {
    console.log(id);
    Axios
      .delete(`/shopping_list?id=${id}`)
      .then(data => setHousehold(data.data))
      .catch(err => console.log(err));
  };
  return (
    <div className="compact">
      <div className="shopping-item">
        <p className="item-name">{item.name}</p>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleDelete(item._id)}
        />
      </div>
    </div>
  );
}

export default ShoppingListItem;
