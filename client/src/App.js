import React, { useState, createContext } from 'react';
import './App.css';
import SignUpForm from './components/SignUp';
import SignInForm from './components/SignIn';
import Dashboard from './components/Dashboard';
import HouseholdContext from './contexts/HouseholdContext';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BudgetOverview from './components/dashboard/BudgetOverview';
import ExpensesOverview from './components/dashboard/ExpensesOverview';
import ShoppingListOverview from './components/dashboard/ShoppingListOverview';
import CreateBudget from './components/CreateBudget';

function App() {
  const [household, setHousehold] = useState('');

  const householdValue = { household, setHousehold };
  return (
    <HouseholdContext.Provider value={householdValue}>
    <Router>
      {/*
      A <Switch> looks through all its children <Route>
      elements and renders the first one whose path
      matches the current URL. Use a <Switch> any time
      you have multiple routes, but you want only one
      of them to render at a time
    */}
      <Switch>
        {/* <Route exact path="/">
          <Home />
        </Route> */}
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
        <Route exact path="/dashboard/budget">
          <BudgetOverview />
        </Route>
        <Route exact path="/dashboard/budget/add">
          <CreateBudget />
        </Route>
        <Route exact path="/dashboard/expenses">
          <ExpensesOverview />
        </Route>
        <Route path="/dashboard/shopping-list">
          <ShoppingListOverview />
        </Route>
      </Switch>
    </Router>
  </HouseholdContext.Provider>
  );
}

export default App;
