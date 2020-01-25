"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
const Menu = require("./Menu.jsx");

module.exports = class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numMeals: 0 };
    this.handleNumMeals = this.handleNumMeals.bind(this);
  }

  render() {
    return (
      <form action="/orders" method="post" target="_blank">
        <Menu onNumMeals={this.handleNumMeals} />
        <ButterChickenSpiceLevel />
        <PickupOrDelivery />
        <ContactInfo />
        {formatPrice(getPrice(this.state.numMeals))}
        <Submit />
      </form>
    );
  }

  handleNumMeals(numMeals) {
    this.setState({ numMeals: numMeals });
  }
};

function ButterChickenSpiceLevel() {
  return (
    <div>
      Butter Chicken Spice Level:
      <input type="radio" name="butterChickenSpiceLevel" value="notSpicy" />
      Not Spicy
      <input type="radio" name="butterChickenSpiceLevel" value="mild" />
      Mild
      <input type="radio" name="butterChickenSpiceLevel" value="notSpicy" />
      Hot
    </div>
  );
}

// TODO add min orders requirement
function PickupOrDelivery() {
  return (
    <div>
      Pickup or delivery:
      <input type="radio" name="pickupOrDelivery" value="pickup" required />
      Pickup
      <input type="radio" name="pickupOrDelivery" value="delivery" required />
      Delivery
    </div>
  );
}

function ContactInfo() {
  return (
    <div>
      Contact info:
      <br />
      <input type="text" name="contactInfo" required />
    </div>
  );
}

function Submit() {
  return <input type="submit" value="Submit" />;
}

function getPrice(numMeals) {
  return numMeals * getMealRate(numMeals);
}

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
