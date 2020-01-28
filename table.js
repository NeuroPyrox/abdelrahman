"use strict";

const express = require("express");
const database = require("./database");

module.exports = function table(options) {
  //database.ensureTableExists(options.name, options.columns);
  const router = express.Router({strict: true});
  
  for (const action of actions.customer) {
    declareCustomerAction(router, action)
  }
  for(const action of actions.admin) {
    declareAdminAction()
  }
};
