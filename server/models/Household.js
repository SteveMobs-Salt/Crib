const mongoose = require("mongoose");

// Create Schema
const HouseholdSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      unique: true,
      required: true
    },
    budgets: {
        type: Array,
        default: [{"Groceries": 0.00},{"Housing": 0.00}, {"Utilities": 0.00}, {"Transportation": 0.00}, {"Insurance": 0.00}, {"Loan Repaymnets": 0.00}]
      },
    expenses: {
      type: Array
    },
    shoppingList: {
      type: Array
    },
    tabs: {
      type: Array
    },
    categories: {
      type: Array,
      default: ["Groceries", "Housing", "Utilities", "Transportation", "Insurance", "Loan Repayments"]
    }
  },
  { strict: false }
);


module.exports = Household = mongoose.model("household", HouseholdSchema);