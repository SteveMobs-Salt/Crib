import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import HouseholdContext from '../contexts/HouseholdContext';

function ShoppingListItem({item}) {
  const {
    setHousehold,
    household,
    selectedHousehold
  } = useContext(HouseholdContext);

  let id;
  if(household){
    ({_id: id} = household[selectedHousehold]);
  }

  const handleDelete = taskId => {
    Axios
      .delete(`/shopping_list?taskId=${taskId}&id=${id}`)
      .then(data => {
        const copy = [...household];
        copy[selectedHousehold].shoppingList = copy[selectedHousehold].shoppingList.filter(a=> a._id !== taskId);
        setHousehold(copy);
      })
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
