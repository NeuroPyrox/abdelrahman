"use strict";

import * as api from "./api.js";
import { foundBug } from "./helper.js";

const element = document.getElementById("price-table");

const priceTablePromise = api.getPrices();

initialize().catch(foundBug)

async function initialize() {
  const priceTable = await priceTablePromise;
  const rows = priceTable.map(createPriceRowElement).join("");
  element.insertAdjacentHTML('beforeend', rows)
};

function createPriceRowElement(row) {
  const strings = {
    "sweet-n-sour-chicken": "Sweet 'n Sour Chicken",
    "butter-chicken": "Butter Chicken",
    pickup: "Pickup",
    delivery: "Delivery"
  };
  return `
    <tr>
      <td>${strings[row.dish]}</td>
      <td>${row.quantity}</td>
      <td>${strings[row.pickupOrDelivery]}</td>
      <td>
        <input
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          name="${[row.dish, row.quantity, row.pickupOrDelivery].join(" ")}"
          value="${row.price === null ? "" : row.price}"
          required
        />
      </td>
    </tr>`;
};
