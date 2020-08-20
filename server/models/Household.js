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
        default: [{category: "Groceries", amount: 0.00},{category: "Housing", amount: 0.00}, {category: "Utilities", amount: 0.00}, {category: "Transportation", amount: 0.00}, {category: "Utilities", amount: 0.00}, {category: "Loan Repayments", amount: 0.00}, {category: "Entertainment", amount: 0.00}, {category: "Clothing", amount: 0.00}, {category: "Fitness", amount: 0.00}, {category: "Dining", amount: 0.00}, {category: "Other", amount: 0.00}]
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
      default: ["Groceries", "Housing", "Utilities", "Transportation", "Insurance", "Loan Repayments", "Entertainment", "Clothing", "Fitness", "Dining", "Other"]
    }
  },
  { strict: false }
);


module.exports = Household = mongoose.model("household", HouseholdSchema);