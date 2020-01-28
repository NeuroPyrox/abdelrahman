"use strict";

const webPush = require("web-push");
const database = require("./database.js");

// TODO set as Abdelrahman's email
webPush.setVapidDetails(
  "mailto:NeuroPyrox@Gmail.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const send = async (subscription, notification) => {
  if (subscription.endpoint === null) {
    return database.removeSubscription(null);
  }
  try {
    await webPush.sendNotification(subscription, notification);
  } catch (err) {
    if (err.statusCode === 404 || err.statusCode === 410) {
      return database.removeSubscription(subscription.endpoint);
    }
    throw err;
  }
};

exports.sendAll = async order => {
  const notification = stringifyOrder(order);
  const subscriptions = await database.getSubscriptions();
  const pushPromises = subscriptions.map(subscription =>
    send(subscription, notification)
  );
  return Promise.all(pushPromises);
};

function stringifyOrder(order) {
  return [
    `Contact Info: ${order.contactInfo}`,
    `Total Meals: ${getNumMeals(order)}`,
    `Price: ${getPrice(order)}`,
    stringifyDelivery(order.delivery)
  ].join("\n");
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

function stringifyDelivery(delivery) {
  return delivery ? "Delivery" : "Pickup";
}
