import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEuroSign
} from '@fortawesome/free-solid-svg-icons';
import ShoppingListItem from './ShoppingListItem';

const ShoppingListCompact = ({items}) => {
  let fewItems;
  if (items) {
    fewItems = items.slice(0, 3);
  }
  return (
    <div className="compact shopping">
       <div className="compact-title">
        <span className="icon">
          {/* <FontAwesomeIcon icon={faEuroSign} size="8x" /> */}
        </span>
        <span className="title">Shopping List</span>
        {items ? fewItems.map(i => <ShoppingListItem key={i._id} item={i}/>) : null}
      </div>
    </div>
  )
}

export default ShoppingListCompact
