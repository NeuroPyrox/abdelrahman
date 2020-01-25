const React = require("react");
const ReactDOM = require("react-dom");
const api = require("./api.jsx");
const { foundBug } = require("./helper.jsx");

module.exports = class OrderTable extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
    api
      .getOrders()
      .then(orders => this.setState({ orders: orders.reverse() }))
      .catch(foundBug);
  }

  render() {
    return (
      <table>
        <Header />
        <tbody>
          {this.state.orders.map(function(order) {
            return <Row order={order} key={order.timestamp} />;
          })}
        </tbody>
      </table>
    );
  }
};

function Header() {
  return (
    <thead>
      <tr>
        <th>Order Time</th>
        <th>Butter Chicken</th>
        <th>Butter Chicken Spice Level</th>
        <th>Sweet 'n Sour</th>
        <th>Price</th>
        <th>Delivery</th>
        <th>Pickup</th>
        <th>Contact Info</th>
      </tr>
    </thead>
  );
}

function Row({ order }) {
  return (
    <tr>
      <td>{stringifyTimestamp(order.timestamp)}</td>
      <td>{order.butterChickenQuantity}</td>
      <td>{stringifySpiceLevel(order.butterChickenSpiceLevel)}</td>
      <td>{order.sweetNSourQuantity}</td>
      <td>{getPrice(order)}</td>
      <td>{stringifyBool(order.delivery)}</td>
      <td>{stringifyBool(!order.delivery)}</td>
      <td>{order.contactInfo}</td>
    </tr>
  );
}

function getPrice(order) {
  const numMeals = getNumMeals(order);
  const mealRate = getMealRate(numMeals);
  return numMeals * mealRate;
}

function getNumMeals(order) {
  return order.butterChickenQuantity + order.sweetNSourQuantity;
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

function stringifyTimestamp(timestamp) {
  const date = new Date(timestamp);
  return [
    date.getFullYear(),
    "-",
    date.getMonth() + 1,
    "-",
    date.getDate(),
    " ",
    date.getHours(),
    ":",
    date.getMinutes(),
    ":",
    date.getSeconds()
  ].join("");
}

function stringifySpiceLevel(spiceLevel) {
  if (spiceLevel === "notSpicy") {
    return "not spicy";
  }
  return spiceLevel;
}

function stringifyBool(bool) {
  return bool ? "yes" : "no";
}
