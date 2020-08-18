import React, { useState, createContext } from 'react';
import './App.css';
import SignUpForm from './components/SignUp';
import SignInForm from './components/SignIn';
import Dashboard from './components/Dashboard';
import UserContext from './contexts/UserContext';
import HouseholdContext from './contexts/HouseholdContext';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BudgetOverview from './components/dashboard/BudgetOverview';
import ExpensesOverview from './components/dashboard/ExpensesOverview';
import ShoppingListOverview from './components/dashboard/ShoppingListOverview';


function App() {
  const [userID, setUserID] = useState('');
  const [householdID, setHouseholdID] = useState('');
  const [household, setHousehold] = useState('');
  const values = { userID, setUserID, householdID, setHouseholdID };
  const householdValue = { household, setHousehold };
  return (
    <UserContext.Provider value={values}>
      <HouseholdContext.Provider value={householdValue}>
        <Router>
          <div className="sign-links">
            <ul>
              <li>
                <Link to="/">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/expenses">Expenses</Link>
              </li>
            </ul>

            <hr />

            {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
            <Switch>
              <Route exact path="/">
                <SignUpForm />
              </Route>
              <Route exact path="/signin">
                <SignInForm />
              </Route>
              {/* <Route path="/user">
          <About />
        </Route> */}
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/dashboard/budget">
                <BudgetOverview />
              </Route>
              <Route path="/dashboard/expenses">
                <ExpensesOverview />
              </Route>
              <Route path="/dashboard/shopping-list">
                <ShoppingListOverview/>
              </Route>
            </Switch>
          </div>
        </Router>
      </HouseholdContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
