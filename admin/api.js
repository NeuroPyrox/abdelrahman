"use strict";

const assertResponseIsOk = async res => {
  if (!res.ok) {
    const text = await res.text();
    throw Error(`${res.status} ${res.statusText}: ${text}`);
  }
};

const getPublicKey = async () => {
  const res = await fetch("/public-key");
  await assertResponseIsOk(res);
  const body = await res.json();
  return body.key;
};

const addSubscription = async subscription => {
  const encodedEndpoint = encodeURIComponent(subscription.endpoint);
  const url = `/order-subscriptions?endpoint=${encodedEndpoint}`;

  const asObject = JSON.parse(JSON.stringify(subscription));
  const body = JSON.stringify(asObject.keys);

  const res = await fetch(url, {
    method: "post",
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

export {
  getPublicKey,
  addSubscription,
  removeSubscription,
  hasSubscription,
  getOrders
};
