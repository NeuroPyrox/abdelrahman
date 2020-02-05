"use strict";

const jsonHttp = require("./jsonHttp.jsx")

async function assertResponseIsOk(res) {
  if (!res.ok) {
    const text = await res.text();
    throw Error(`${res.status} ${res.statusText}: ${text}`);
  }
}


async function getPublicKey() {
  const body = await jsonHttp.get("/public-key");
  return body.key;
};

async function addSubscription(subscription) {
  const encodedEndpoint = encodeURIComponent(subscription.endpoint);
  const url = `/order-subscriptions?endpoint=${encodedEndpoint}`;

  const asObject = JSON.parse(JSON.stringify(subscription));
  const body = JSON.stringify(asObject.keys);
  
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    });
    await assertResponseIsOk(res);
};

const removeSubscription = async endpoint => {
  const url = `/order-subscriptions?endpoint=${encodeURIComponent(endpoint)}`;
  const res = await fetch(url, {
    method: "delete"
  });
  await assertResponseIsOk(res);
};

const hasSubscription = async endpoint => {
  const url = `/order-subscriptions?endpoint=${encodeURIComponent(endpoint)}`;
  const res = await fetch(url, {
    method: "head"
  });
  if (res.status === 404) {
    return false;
  }
  await assertResponseIsOk(res);
  return true;
};

const getOrders = async () => {
  const res = await fetch("/orders", {
    method: "get"
  });
  await assertResponseIsOk(res);
  return res.json();
};

const saveMenu = async menu => {
  const res = await fetch("/menu", {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": "insecurePassword" },
    body: JSON.stringify(menu)
  });
  await assertResponseIsOk(res);
};

module.exports = {
  getPublicKey: getPublicKey,
  addSubscription: addSubscription,
  removeSubscription: removeSubscription,
  hasSubscription: hasSubscription,
  getOrders: getOrders,
  saveMenu: saveMenu
}
