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

async function showOrders(orders) {
  const rows = await createRows(orders);
  element.insertAdjacentHTML('beforeend', rows)
}

async function createRows(orders) {
  const separated = await Promise.all(orders.map(createRow));
  return separated.join("");
}

async function createRow(order) {
  const { timestamp, contact, dish, quantity, pickupOrDelivery } = order;
  const price = await getPrice(order);
  return `
    <tr>
      <td>${stringifyTimestamp(timestamp)}</td>
      <td>${contact}</td>
      <td>${dish}</td>
      <td>${quantity}</td>
      <td>${pickupOrDelivery}</td>
      <td>${price}</td>
    </tr>`;
}

const priceTablePromise = api.getPrices();

async function getPrice(order) {
  const prices = await priceTablePromise;
  const pricing = prices.find(pricing => doPriceParamsMatch(order, pricing));
  return pricing.price;
}

function doPriceParamsMatch(order, pricing) {
  if (order.dish !== pricing.dish) {
    return false;
  }
  if (order.quantity !== pricing.quantity) {
    return false;
  }
  if (order.pickupOrDelivery !== pricing.pickupOrDelivery) {
    return false;
  }
  return true;
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
};
