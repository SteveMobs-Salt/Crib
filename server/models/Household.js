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
            type: new mongoose.Schema({
              amount: Number,
              categories: new mongoose.Schema({
                name: String,
                amount: Number
              })
            }),
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