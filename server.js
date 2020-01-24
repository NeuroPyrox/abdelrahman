"use strict";

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/main/main.html`);
});

app.get("/admin", (req, res) => {
  res.sendFile(`${__dirname}/admin/admin.html`);
});

app.use("/admin", express.static("admin"));
app.use("/main", express.static("main"));

const database = require("./database.js");
const bodyParser = require("body-parser");
const push = require("./push.js");

app.get("/public-key", (req, res) => {
  res.send({ key: push.PUBLIC_KEY });
});

app.use("/orders", bodyParser.urlencoded({ extended: false }));

app.get("/orders", async (req, res, next) => {
  try {
    const orders = await database.getOrders();
    res.send(orders);
  } catch (err) {
    next(err);
  }
})

app.post("/orders", async (req, res, next) => {
  try {
    preprocessOrderBody(req.body)
    await database.addOrder(req.body);
    await push.sendAll(req.body);
    res.send("Submitted!");
  } catch (err) {
    next(err);
  }
});

function preprocessOrderBody(order) {
  if (order.pickupOrDelivery === "pickup") {
    order.delivery = false;
  } else if (order.pickupOrDelivery === "delivery") {
    order.delivery = true;
  }
  delete order.pickupOrDelivery
  order.butterChickenQuantity = parseInt(order.butterChickenQuantity)
  order.sweetNSourQuantity = parseInt(order.sweetNSourQuantity)
}

app.use("/order-subscriptions", bodyParser.urlencoded({ extended: false }));
app.use("/order-subscriptions", bodyParser.json());

app.post("/order-subscriptions", async (req, res, next) => {
  try {
    const subscription = getSubscriptionFromRequest(req);
    await database.addSubscription(subscription);
    res.end();
  } catch (err) {
    if (err === EMPTY_BODY) {
      res.status(400);
    }
    next(err);
  }
});

app.head("/order-subscriptions", async (req, res, next) => {
  try {
    const endpoint = req.query.endpoint;
    const exists = await database.hasSubscription(endpoint);
    if (!exists) {
      res.status(404);
    }
    res.end();
  } catch (err) {
    next(err);
  }
});

app.delete("/order-subscriptions", async (req, res, next) => {
  try {
    const endpoint = req.query.endpoint;
    await database.removeSubscription(endpoint);
    res.end();
  } catch (err) {
    next(err);
  }
});

function getSubscriptionFromRequest(req) {
  validateNonEmptyBody(req);
  return {
    endpoint: req.query.endpoint,
    keys: req.body
  };
};

const isObjectEmpty = object => Object.keys(object) === 0;

const EMPTY_BODY = Error();
function validateNonEmptyBody(req) {
  if (isObjectEmpty(req.body)) {
    throw EMPTY_BODY;
  }
};

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});
