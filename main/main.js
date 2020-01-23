"use strict";

async function updatePriceOutput() {
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

function getPrice() {
  const numMeals = getNumMeals();
  const mealRate = getMealRate(numMeals);
  return numMeals * mealRate
};

function getNumMeals() {
  return getSweetNSourChickenQuantity() + getButterChickenQuantity()
}

function getSweetNSourChickenQuantity() {
  const element = document.getElementById("sweetNSourQuantity");
  if (!element.checkValidity()) {
    return 0;
  }
  return parseInt(element.value);
}

function getButterChickenQuantity() {
  const element = document.getElementById("butterChickenQuantity");
  if (!element.checkValidity()) {
    return 0;
  }
  return parseInt(element.value);
}

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

const getPickupOrDelivery = () => {
  return getRadioValue("pickupOrDelivery");
};

const mealRates = [
  {minMeals: 16, rate: 1000},
  {minMeals: 11, rate: 1200},
  {minMeals: 4, rate: 1250},
  {minMeals: 3, rate: 1266 + (2/3)},
  {minMeals: 2, rate: 1300},
  {minMeals: 0, rate: 1400}
]

function getMealRate(numMeals) {
  for (const {minMeals, rate} of mealRates) {
    if (minMeals <= numMeals) {
      return rate;
    }
  }
}

const formatPrice = price => `${price} ft`;

const setPriceOutput = price => {
  const element = document.getElementById("price");
  element.value = formatPrice(price);
};
