"use strict";

const api = require("./api.jsx");

module.exports = {
  subscribe: async function subscribe() {
    const subscription = await createSubscription();
    await api.addSubscription(subscription);
  },

  unsubscribe: async function unsubscribe() {
    const subscription = await createSubscription();
    await api.removeSubscription(subscription.endpoint);
  },

  isSubscribed: async function isSubscribed() {
    const subscription = await getExistingSubscription();
    if (subscription === null) {
      return false;
    }
    return api.hasSubscription(subscription.endpoint);
  }
};

// Always check if the output is null
const getExistingSubscription = async () => {
  const pushManager = await createPushManager();
  return pushManager.getSubscription();
};

const createSubscription = async () => {
  const [pushManager, publicKey] = await Promise.all([
    createPushManager(),
    api.getPublicKey(),
    askPushPermission()
  ]);
  return pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  });
};

const createPushManager = async () => {
  assert(
    "serviceWorker" in navigator && "PushManager" in window,
    "Push notifications aren't supported on this browser!"
  );
  const registration = await navigator.serviceWorker.register(
    "service-worker.js"
  );
  return registration.pushManager;
};

const askPushPermission = async () => {
  // We don't know whether requestPermission will return a promise or take a callback, so we handle both cases
  const result = await new Promise((resolve, reject) => {
    const promise = Notification.requestPermission(result => resolve(result));
    if (promise) {
      promise.then(resolve, reject);
    }
  });
  assert(result === "granted", "Push Permission denied!");
};

const assert = (condition, message) => {
  if (!condition) {
    throw Error(message);
  }
};

// I don't really understand why we need this function, but it's what the tutorials did
const urlBase64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const charCodes = rawData.split("").map(char => char.charCodeAt(0));
  return Uint8Array.from(charCodes);
};
