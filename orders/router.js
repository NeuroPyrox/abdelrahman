"use strict";

const router = require("express").Router({ strict: true });

router.get("/api.js", (req, res) => {
  res.sendFile(`${__dirname}/api.js`);
});

const database = require("./database.js");
const push = require("../order-subscriptions/push.js")

const isObjectEmpty = object => Object.keys(object) === 0;

const EMPTY_BODY = Error();
const validateBody = req => {
  if (isObjectEmpty(req.body)) {
    throw EMPTY_BODY;
  }
};