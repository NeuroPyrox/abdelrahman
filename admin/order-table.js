"use strict";

import * as api from "./api.js";
import { foundBug } from "./helper.js";

const element = document.getElementById("order-table");

initialize().catch(foundBug);

async function initialize() {
  const orders = await api.getOrders();
  // Reverse so that the most recent orders appear first
  showOrders(orders.reverse());
}

function showOrders(orders) {
  const rows = createRows(orders);
  element.insertAdjacentHTML("beforeend", rows);
}

function createRows(orders) {
  return orders.map(createRow).join("");
}

function createRow(order) {
  const tdElements = [
    stringifyTimestamp(order.timestamp),
    order.butterChickenQuantity,
    stringifySpiceLevel(order.butterChickenSpiceLevel),
    order.sweetNSourQuantity,
    getPrice(order),
    stringifyBool(order.delivery),
    stringifyBool(!order.delivery),
    order.contactInfo
  ]
    .map(cell => `<td>${cell}</td>`)
    .join("");
  return `<tr>${tdElements}</tr>`;
}

function getPrice(order) {
  const numMeals = getNumMeals(order);
  const mealRate = getMealRate(numMeals);
  return numMeals * mealRate;
}

function getNumMeals(order) {
  return order.butterChickenQuantity + order.sweetNSourQuantity;
}

const mealRates = [
  { minMeals: 16, rate: 1000 },
  { minMeals: 11, rate: 1200 },
  { minMeals: 4, rate: 1250 },
  { minMeals: 3, rate: 1266 + 2 / 3 },
  { minMeals: 2, rate: 1300 },
  { minMeals: 0, rate: 1400 }
];

function getMealRate(numMeals) {
  for (const { minMeals, rate } of mealRates) {
    if (minMeals <= numMeals) {
      return rate;
    }
  }
}

function stringifyTimestamp(timestamp) {
  const date = new Date(timestamp);
  return [
    date.getFullYear(),
    "-",
    date.getMonth() + 1,
    "-",
    date.getDate(),
    " ",
    date.getHours(),
    ":",
    date.getMinutes(),
    ":",
    date.getSeconds()
  ].join("");
}

function stringifySpiceLevel(spiceLevel) {
  if (spiceLevel === "notSpicy") {
    return "not spicy";
  }
  return spiceLevel;
}

function stringifyBool(bool) {
  return bool ? "yes" : "no";
}
