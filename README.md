# Crib


## Contents

 - [About](https://github.com/SteveMobs-Salt/SteveMobsProject#about)
 - [Features](https://github.com/SteveMobs-Salt/SteveMobsProject#features)
 - [Requirements](https://github.com/ISteveMobs-Salt/SteveMobsProject#requirements)
 - [Tech](https://github.com/SteveMobs-Salt/SteveMobsProject#tech)
    - [Client-side](https://github.com/SteveMobs-Salt/SteveMobsProject#client-side)
    - [Server-side](https://github.com/SteveMobs-Salt/SteveMobsProject#server-side)
 - [Features to come](https://github.com/SteveMobs-Salt/SteveMobsProject#featuresToCome)
 
 ## About
 
Have you ever wished you had one app that could organise your household? 

Crib sets out to simplify the way you budget, record and keep track of your expenses, and add items to your shopping list on the go. 

Many of us are sharing a household or are often making plans with friends and family, and want a way to make it simple to plan together. With Crib you can make as many groups as you like in which members share budgets, expenses, and lists. If you happen to be the one that picks up the tab on your night out or does the group's shopping, you can simply split the expense between group members who will be notified about how much they need to pay you. 

## Features

Each user has access to a personal version of the features below as well as a shared version in the groups that they belong to. 

### Shopping list

Add and remove items on the go.

### Budget

Set up a budget for your household that creates an overview of the latest balance.
When an item is purchased or a service paid for, and it is added to the expenses feature under the budget category, it will be automatically deducted from that part of the budget.

### Split expenses

If a member of a household purchases an item they can add the expense and select whom in the group will be sharing the expense. Those members will be able to see how much they owe that member on the expense. 

__Note__: This app was built as part of a two-week project and it's a work in progress.
Additional features will be added.

![ShoppingList](https://github.com/SteveMobs-Salt/SteveMobsProject/blob/master/readmeGifs/shoppingList2.gif) ![Budget](https://github.com/SteveMobs-Salt/SteveMobsProject/blob/master/readmeGifs/budgets3.gif) ![Expenses](https://github.com/SteveMobs-Salt/SteveMobsProject/blob/master/readmeGifs/addExpense2.gif) 

## Requirements

- Time period: two weeks.
- Implement a client-side.
- Implement a server-side.
- Utilise a database.
- Deploy.

## Tech

![MERN ](https://user-images.githubusercontent.com/46241840/91302318-91819f00-e7a6-11ea-9818-f267873ede8a.png)

### Client-side

- [React](https://reactjs.org/)
- [NODE-SASS](https://github.com/sass/node-sass)

### Server-side

- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Passport](http://www.passportjs.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Features to come: 

__Split expenses__: 
- Notifications are sent to members when an expense is split with them with details of the transaction.
- Tabs to keep track of how much members owe each other and an option to settle up the tab.
- Reminder notifications can be sent to remind members to settle their tabs with you.

__Shopping list__: 
- Receive a notification when someone adds an item to the shopping list. 
- Set a reminder for the things that need to be bought on the shopping list that is sent to you or other members.
