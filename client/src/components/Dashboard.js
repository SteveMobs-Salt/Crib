import React, { Component, useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import BudgetCompact from './BudgetCompact'
import ExpensesCompact from './ExpensesCompact'
import ShoppingListCompact from './ShoppingListCompact'
import HouseholdContext from '../contexts/HouseholdContext'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faUtensils,
  faHamburger,
  faBolt,
  faShower,
  faSubway,
  faMoneyCheckAlt,
  faHouseDamage,
  faHospitalUser,
  faPiggyBank,
  faHouseUser,
  faSwimmer,
  faCocktail,
  faUserSecret,
  faTshirt,
  faDice,
  faCalculator,
  faShoppingBasket,
  faChevronCircleLeft,
  faChevronLeft,
  faPlus,
  faUsers,
  faUser
} from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
  const { userID } = useContext(UserContext);
  const { setHousehold, household: { expenses, budgets, shoppingList} } = useContext(HouseholdContext);
  const { path, url } = useRouteMatch();
  const history = useHistory();
  useEffect(() => {
    fetch('/api/household')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        // put all households in loclstorage
        setHousehold(data)
      })
      .catch(err => console.log(err))
  }, [])

  let totalBudget= 0, totalSpent= 0;
  if (expenses && budgets) {
    totalBudget = budgets.reduce((a, c) => a+c.amount, 0)
    totalSpent = expenses.reduce((a, c) => a+c.amount, 0)
  }
  
  const handleLogout = () => {
    fetch('/api/auth/logout')
      .then(res => history.push('/signin'))
      .catch(err => console.log(err))
  }

  return (
    <div className="dashboard">
      <div className="header">
          <nav>
            {/* <FontAwesomeIcon icon={faChevronLeft} size="lg" onClick={() => history.go(-1)}/> */}
            <h2>Dashboard</h2>
          </nav>
          {/* <Link to={`${url}/add`}> */}
          <div className="household-views">
            <FontAwesomeIcon icon={faUser} size="lg" className="person"/>
            <FontAwesomeIcon icon={faUsers} size="lg" className="group" onClick={()=> handleLogout()} />
          </div>
          {/* </Link> */}
        </div>
      
      {/* /dashboard/budget */}
      <Link to={`${url}/budget`} >
        <BudgetCompact budget={totalBudget} spent={totalSpent} />
      </Link>
      {/* /dashboard/expenses */}
      <Link to={`${url}/expenses`} >
        <ExpensesCompact expenses={expenses}/>
      </Link>
      {/* /dashboard/shopping-list */}
      <Link to={`${url}/shopping-list`} >
        <ShoppingListCompact items={shoppingList}/>
      </Link>
    </div>
  )
}

export default Dashboard



