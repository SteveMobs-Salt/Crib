const mongoose = require('mongoose');

// Create Schema
const HouseholdSchema = new mongoose.Schema(
  {
    owners: {
      type: Array,
      required: true,
    },
    budgets: {
      type: Array,
      default: [
        { category: 'Groceries', amount: 0.0 },
        { category: 'Housing', amount: 0.0 },
        { category: 'Utilities', amount: 0.0 },
        { category: 'Transportation', amount: 0.0 },
        { category: 'Insurance', amount: 0.0 },
        { category: 'Loan Repayments', amount: 0.0 },
        { category: 'Entertainment', amount: 0.0 },
        { category: 'Clothing', amount: 0.0 },
        { category: 'Fitness', amount: 0.0 },
        { category: 'Dining', amount: 0.0 },
        { category: 'Other', amount: 0.0 },
      ],
    },
    type: {
      type: String,
      default: 'Personal',
    },
    name: {
      type: String,
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
    referral_code: {
      type: String,
      default: function () {
        let hash = 0;
        for (let i = 0; i < this.id.length; i++) {
          hash = this.id.charCodeAt(i) + ((hash << 5) - hash);
        }
        let res = (hash & 0x00ffffff).toString(16).toUpperCase();
        return '00000'.substring(0, 6 - res.length) + res;
      },
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
        'Entertainment',
        'Clothing',
        'Fitness',
        'Dining',
        'Other',
      ],
    },
  },
  { strict: false },
);

module.exports = Household = mongoose.model('household', HouseholdSchema);
