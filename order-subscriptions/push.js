"use strict";

const webPush = require("web-push");
const database = require("../database.js");

const VAPID_KEYS = {
  PUBLIC:
    "BIUOQOf-H_fb4IjS4enikFwikqqYb3q40dDAnoDyvQXolRi3BBXGdfSCGG6X25ulzXLaUhrcDU_Ce6HExwPm6yM",
  PRIVATE: "wotDHRrCXqm11JCXAkM8ien-ElgJPZLe0TDxC5I6eus"
};

webPush.setVapidDetails(
  "mailto:NeuroPyrox@Gmail.com",
  VAPID_KEYS.PUBLIC,
  VAPID_KEYS.PRIVATE
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

exports.PUBLIC_KEY = VAPID_KEYS.PUBLIC;

exports.sendAll = async order => {
  const notification = [
    `Contact: ${order.contact}`,
    `Dish: ${order.dish}`,
    `Quantity: ${order.quantity}`,
    `Pickup Or Delivery: ${order.pickupOrDelivery}`
  ].join("\n");
  const subscriptions = await database.getSubscriptions();
  const pushPromises = subscriptions.map(subscription =>
    send(subscription, notification)
  );
  return Promise.all(pushPromises);
};
