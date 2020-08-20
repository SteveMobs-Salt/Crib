import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEuroSign
} from '@fortawesome/free-solid-svg-icons';
import ShoppingListItem from './ShoppingListItem';

const ShoppingListCompact = ({items}) => {
  return (
    <div className="compact shopping">
       <div className="compact-title">
        <span className="icon">
          {/* <FontAwesomeIcon icon={faEuroSign} size="8x" /> */}
        </span>
        <span className="title">Shopping List</span>
        {items?  items.splice(0, 3).map(i => <ShoppingListItem key={i._id} item={i}/>) : null}
      </div>
    </div>
  )
}

export default ShoppingListCompact
