const mongoose = require('mongoose');

// Create Schema
const HouseholdSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      unique: true,
      required: true,
    },
    budgets: {
      type: Array,
      default: [
        { category: 'Groceries', amount: 0.0 },
        { category: 'Housing', amount: 0.0 },
        { category: 'Utilities', amount: 0.0 },
        { category: 'Transportation', amount: 0.0 },
        { category: 'Utilities', amount: 0.0 },
        { category: 'Loan Repayments', amount: 0.0 },
      ],
    },
    expenses: {
      type: Array,
    },
    shoppingList: {
      type: Array,
    },
    tabs: {
      type: Array,
    },
    categories: {
      type: Array,
      default: [
        'Groceries',
        'Housing',
        'Utilities',
        'Transportation',
        'Insurance',
        'Loan Repayments',
      ],
    },
  },
  { strict: false },
);

module.exports = Household = mongoose.model('household', HouseholdSchema);
