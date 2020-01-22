"use strict";

// TODO listen for subscription changes outside of the button

import * as push from "./push.js";
import { foundBug } from "./helper.js";

const element = document.getElementById("notification-button");
let state;

initialize().catch(foundBug);

async function initialize() {
  updateState("loading");
  const subscribed = await push.isSubscribed();
  if (subscribed) {
    updateState("subscribed");
  } else {
    updateState("unsubscribed");
  }
};

element.addEventListener("click", () => click().catch(foundBug));

async function click() {
  switch (state) {
    case "unsubscribed":
      await clickSubscribe();
      break;
    case "subscribed":
      await clickUnsubscribe();
      break;
    case "loading":
      break;
  }
};

async function clickSubscribe() {
  updateState("loading");
  await push.subscribe();
  updateState("subscribed");
};

async function clickUnsubscribe() {
  updateState("loading");
  await push.unsubscribe();
  updateState("unsubscribed");
};

function updateState(newState) {
  state = newState;
  showState();
};

function showState() {
  const text = {
    loading: "Loading...",
    unsubscribed: "Turn on notifications",
    subscribed: "Turn off notifications"
  }[state];
  element.innerHTML = text;
};
