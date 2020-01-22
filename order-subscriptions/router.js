"use strict";

const router = require("express").Router({ strict: true });

router.get("/api.js", (req, res) => {
  res.sendFile(`${__dirname}/api.js`);
});

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const database = require("../database.js");

const isObjectEmpty = object => Object.keys(object) === 0;

const EMPTY_BODY = Error();
const validateBody = req => {
  if (isObjectEmpty(req.body)) {
    throw EMPTY_BODY;
  }
};

const getSubscriptionFromRequest = req => {
  validateBody(req);
  return {
    endpoint: req.query.endpoint,
    keys: req.body
  };
};

router.post("/", async (req, res, next) => {
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

router.head("/", async (req, res, next) => {
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

router.delete("/", async (req, res, next) => {
  try {
    const endpoint = req.query.endpoint;
    await database.removeSubscription(endpoint);
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
