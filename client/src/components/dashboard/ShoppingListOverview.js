import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import HouseholdContext from '../../contexts/HouseholdContext';

function ShoppingListOverview() {
  const history = useHistory();
  const {
    household: { shoppingList },
  } = useContext(HouseholdContext);


  if (shoppingList) {
    return (
      <div>
        <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
        <h2>Shopping List</h2>
        {/* form + inputfield */}

      </div>
    );
  }
  return (
    <div>
      <i className="fa fa-chevron-left" onClick={() => history.go(-1)}></i>
      <h2>Shopping List</h2>
        {/* form + inputfield */}

      <p>please add some products</p>
    </div>
  );
}

export default ShoppingListOverview;
