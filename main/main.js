"use strict";

const getRadioValue = name => {
  const selector = `input[name=${name}]:checked`;
  const element = document.querySelector(selector);
  if (element === null) {
    return null;
  }
  return element.value;
};

const getDish = () => {
  return getRadioValue("dish");
};

const getQuantity = () => {
  const element = document.getElementById("quantity");
  if (!element.checkValidity()) {
    return null;
  }
  return parseInt(element.value);
};

const getPickupOrDelivery = () => {
  return getRadioValue("pickupOrDelivery");
};

const getPriceParams = () => {
  return {
    dish: getDish(),
    quantity: getQuantity(),
    pickupOrDelivery: getPickupOrDelivery()
  };
};

const arePriceParamsComplete = priceParams => {
  if (priceParams.dish === null) {
    return false;
  }
  if (priceParams.quantity === null) {
    return false;
  }
  if (priceParams.pickupOrDelivery === null) {
    return false;
  }
  return true;
};

const getPriceTable = async () => {
  const res = await fetch("/prices");
  const body = await res.json();
  return body.prices;
};

const priceTablePromise = getPriceTable();

const doPriceParamsMatch = (priceParams, pricing) => {
  if (priceParams.dish !== pricing.dish) {
    return false;
  }
  if (priceParams.quantity !== pricing.quantity) {
    return false;
  }
  if (priceParams.pickupOrDelivery !== pricing.pickupOrDelivery) {
    return false;
  }
  return true;
};

const queryPriceTable = async priceParams => {
  const priceTable = await priceTablePromise;
  const pricing = priceTable.find(pricing =>
    doPriceParamsMatch(priceParams, pricing)
  );
  return pricing.price;
};

const getPrice = async () => {
  const priceParams = getPriceParams();
  if (!arePriceParamsComplete(priceParams)) {
    return 0;
  }
  const price = await queryPriceTable(priceParams);
  return price;
};

const formatPrice = price => `\$${price.toFixed(2)}`;

const setPriceOutput = price => {
  const element = document.getElementById("price");
  element.value = formatPrice(price);
};

const updatePriceOutput = async () => {
  try {
    const price = await getPrice();
    setPriceOutput(price);
  } catch (err) {
    console.error(err);
    alert(
      "You just found a bug! Go to your browser's console for more details"
    );
  }
};
