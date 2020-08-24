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
  const [selectedHousehold, setSelectedHousehold] = useState(parseInt(localStorage.getItem('selectedHousehold')) || 0);
  // console.log(JSON.parse(localStorage.getItem('households'))[0])
  
  useEffect(() => {
    localStorage.setItem('households', JSON.stringify(household));
    localStorage.setItem('selectedHousehold', selectedHousehold);
    // if (localStorage.getItem('households')) {
    //   const storage = JSON.parse(localStorage.getItem('households'))
    //   if(storage.length > 1){
    //     const {i} = storage.map((a, i) => {
    //       return {
    //         ...a, i
    //       }
    //     }).find(a => a.type !== "Personal")
    //     console.log(i)
    //     setSelectedHousehold(i);
    //   }
      
    // }
  }, [household, selectedHousehold])


  const householdValue = { household, setHousehold, selectedHousehold, setSelectedHousehold };
  return (
    <div className="app">
      <HouseholdContext.Provider value={householdValue}>
        <Router>
          <Switch>
            <Route exact path="/">
              <SignUpForm />
            </Route>
            <Route exact path="/signin">
              <SignInForm />
            </Route>
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
            <Route path="/dashboard/expenses/:taskId">
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
