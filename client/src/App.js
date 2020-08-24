import React, { useState, createContext, useEffect } from 'react';
import './App.scss';
import SignUpForm from './components/SignUp';
import SignInForm from './components/SignIn';
import Dashboard from './components/Dashboard';
import HouseholdContext from './contexts/HouseholdContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BudgetOverview from './components/dashboard/BudgetOverview';
import ExpensesOverview from './components/dashboard/ExpensesOverview';
import ShoppingListOverview from './components/dashboard/ShoppingListOverview';
import CreateBudget from './components/CreateBudget';
import CategoryBudgetOverview from './components/CategoryBudgetOverview';
import ExpenseOverview from './components/ExpenseOverview';
import CreateExpense from './components/CreateExpense';
import CreateGroup from './components/CreateGroup';
import JoinGroup from './components/JoinGroup';

function App() {
  const [household, setHousehold] = useState(JSON.parse(localStorage.getItem('households')) || '');
  const [selectedHousehold, setSelectedHousehold] = useState(0);
  // console.log(JSON.parse(localStorage.getItem('households'))[0])
  // if (localStorage.getItem('households')) {
  //   const storage = JSON.parse(localStorage.getItem('households'))
  //   setHousehold(storage[0])
  // }
  useEffect(() => {
    localStorage.setItem('households', JSON.stringify(household));
    return () => {
    }
  }, [household])

  const householdValue = { household, setHousehold, selectedHousehold, setSelectedHousehold };
  return (
    <div className="app">
      <HouseholdContext.Provider value={householdValue}>
        <Router>
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
            <Route path="/dashboard/budget/add">
              <CreateBudget />
            </Route>
            <Route path="/dashboard/budget/:category">
              <CategoryBudgetOverview />
            </Route>
            <Route exact path="/dashboard/expenses">
              <ExpensesOverview />
            </Route>
            <Route path="/dashboard/expenses/add">
              <CreateExpense />
            </Route>
            <Route path="/dashboard/expenses/:id">
              <ExpenseOverview />
            </Route>
            <Route path="/dashboard/shopping-list">
              <ShoppingListOverview />
            </Route>
            <Route exact path="/create-group">
              <CreateGroup />
            </Route>
            <Route exact path="/join-group">
              <JoinGroup />
            </Route>
          </Switch>
        </Router>
      </HouseholdContext.Provider>
    </div>
  );
}

export default App;
