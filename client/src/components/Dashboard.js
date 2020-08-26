import React, { useContext, useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import BudgetCompact from './BudgetCompact';
import ExpensesCompact from './ExpensesCompact';
import ShoppingListCompact from './ShoppingListCompact';
import HouseholdContext from '../contexts/HouseholdContext';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const {
    setHousehold,
    household,
    selectedHousehold,
    setSelectedHousehold,
  } = useContext(HouseholdContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { url } = useRouteMatch();
  const history = useHistory();
  useEffect(() => {
    fetch('/api/household')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setHousehold(data);
      })
      .catch(err => console.log(err));
  }, [setHousehold]);

  let expenses = [], budgets, shoppingList, personalIndex;
  if (household) {
    console.log(household);
    ({ expenses, budgets, shoppingList } = household[selectedHousehold]);
    personalIndex = household
      .map((a, index) => {
        return { ...a, index };
      })
      .find(a => a.type === 'Personal').index;
  }

  let totalBudget = 0,
    totalSpent = 0;
  if (expenses && budgets) {
    totalBudget = budgets.reduce((a, c) => a + c.amount, 0);
    totalSpent = expenses.reduce((a, c) => a + c.amount, 0);
  }

  const handleLogout = () => {
    fetch('/api/auth/logout')
      .then(res => {
        history.push('/signin');
        localStorage.removeItem('households');
        localStorage.removeItem('user');
        localStorage.removeItem('selectedHousehold');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Menu
        customBurgerIcon={false}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(!sidebarOpen)}
        right
      >
        <span
          className="menu-item"
          onClick={() => {
            setSelectedHousehold(personalIndex);
            setSidebarOpen(!sidebarOpen);
          }}
        >
          Personal
        </span>

        <div className="menu-groups">
          <ul className="">
            <span className="menu-item">Groups</span>
          {household && household.length > 1
            ? household
                .map((a, index) => {
                  return { ...a, index };
                })
                .filter(a => a.type !== 'Personal')
                .map(a => (
                  <li className="group-name"
                    onClick={() => {
                      setSelectedHousehold(a.index);
                      setSidebarOpen(!sidebarOpen);
                    }}
                  >
                    {a.name}
                  </li>
                ))
            : null}
            </ul>
        </div>
        <Link to="/create-group">
          <span className="menu-item create"> Create group </span>
        </Link>
        <Link to="/join-group">
          <span className="menu-item join"> Join group </span>
        </Link>
        <span className="menu-item">Settings</span>

        <span className="menu-item logout" onClick={() => handleLogout()}>Logout</span>
      </Menu>
      <div className="dashboard">
        <div className="header">
          <nav>
            <h2>Dashboard</h2>
          </nav>
          <div className="household-views">
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              className="menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        </div>
        <Link to={`${url}/budget`}>
          <BudgetCompact budget={totalBudget} spent={totalSpent} />
        </Link>
        <Link to={`${url}/expenses`}>
          <ExpensesCompact expenses={expenses} />
        </Link>
        <Link to={`${url}/shopping-list`}>
          <ShoppingListCompact items={shoppingList} />
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
