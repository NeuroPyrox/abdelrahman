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

app.use("/prices", bodyParser.urlencoded({ extended: false }));

app.get("/prices", async (req, res, next) => {
  try {
    const prices = await database.getPrices();
    res.send({ prices: prices });
  } catch (err) {
    next(err);
  }
});

const convertEntryToPriceRow = ([key, value]) => {
  const [dish, quantityString, pickupOrDelivery] = key.split(" ");
  return {
    dish: dish,
    quantity: parseFloat(quantityString),
    pickupOrDelivery: pickupOrDelivery,
    price: parseFloat(value)
  };
}

const getPricesFromRequest = req => {
  return Object.entries(req.body).map(convertEntryToPriceRow);
};

app.post("/prices", async (req, res, next) => {
  try {
    const prices = getPricesFromRequest(req);
    await database.setPrices(prices);
    res.send("Saved!");
  } catch (err) {
    next(err);
  }
});

const push = require("./order-subscriptions/push.js");

app.get("/public-key", (req, res) => {
  res.send({ key: push.PUBLIC_KEY });
});

app.use("/order-subscriptions", require("./order-subscriptions/router.js"));

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
    await database.addOrder(req.body);
    await push.sendAll(req.body);
    res.send("Submitted!");
  } catch (err) {
    next(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});
