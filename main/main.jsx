"use strict";

const orderForm = document.getElementById("orderForm");
orderForm.addEventListener("change", () => updatePriceOutput().catch(foundBug));

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
}

function getPrice() {
  const numMeals = getNumMeals();
  const mealRate = getMealRate(numMeals);
  return numMeals * mealRate;
}

function getNumMeals() {
  return getSweetNSourChickenQuantity() + getButterChickenQuantity();
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
  { minMeals: 16, rate: 1000 },
  { minMeals: 11, rate: 1200 },
  { minMeals: 4, rate: 1250 },
  { minMeals: 3, rate: 1266 + 2 / 3 },
  { minMeals: 2, rate: 1300 },
  { minMeals: 0, rate: 1400 }
];

function getMealRate(numMeals) {
  for (const { minMeals, rate } of mealRates) {
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

function foundBug(err) {
  console.error(err);
  alert("You just found a bug! Go to your browser's console for more info.");
}

const React = require("react");
const ReactDOM = require("react-dom");

function MenuOption({ name, text, image }) {
  return (
    <div style={{flexDirection: "column"}}>
      <img src={image} />
      {text}
      <input type="number" min="0" name={name} id={name} required />
    </div>
  );
}

function Menu() {
  return (
    <div>
      <MenuOption
        name="sweetNSourQuantity"
        text="Sweet 'n Sour Chicken"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sweetsourchickensoaked.jpg/220px-Sweetsourchickensoaked.jpg"
      />
      <MenuOption
        name="butterChickenQuantity"
        text="Butter Chicken"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/220px-Chicken_makhani.jpg"
      />
    </div>
  );
}

ReactDOM.render(<Menu />, document.getElementById("menu"));
