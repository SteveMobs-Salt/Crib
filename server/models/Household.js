const mongoose = require("mongoose");

// Create Schema
const HouseholdSchema = new mongoose.Schema(
    {
        owner: {
            type: String,
            unique: true,
            required: true
        },
        budget: {
            amount: {
              type: Number,
              default: 0  
            },
            categories: {
              type: Array,
              default: ["Groceries", "Housing", "Basic Utilities", "Transportation", "Insurance", "Loan Repayments"]
            }
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
    },
    { strict: false }
);


module.exports = Household = mongoose.model("household", HouseholdSchema);