import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEuroSign
} from '@fortawesome/free-solid-svg-icons';

const ShoppingListCompact = () => {
  return (
    <div className="compact shopping">
       <div className="compact-title">
        <span className="icon">
          {/* <FontAwesomeIcon icon={faEuroSign} size="8x" /> */}
        </span>
        <span className="title">Shopping List</span>
      </div>
    </div>
  )
}

export default ShoppingListCompact
