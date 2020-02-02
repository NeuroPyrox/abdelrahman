"use strict";

const ReactDOM = require("react-dom");
// Idk why webpack makes me require React here, but I get "Error: React is not defined" otherwise
const React = require("react");
const Form = require("./Form.jsx");
const QuantityInput = require("./QuantityInput.jsx");
const Dish = require("./Dish.jsx")

ReactDOM.render(
  <div>
    <div className="menu">
      <Dish
        image={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sweetsourchickensoaked.jpg/220px-Sweetsourchickensoaked.jpg"
        }
        name="Sweet 'n Sour Chicken"
      />
      <Dish
        image={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/220px-Chicken_makhani.jpg"
        }
        name="Butter Chicken"
      />
    </div>
    <h1>Abdelrahman's Food</h1>
    <Form />
  </div>,
  document.getElementById("main")
);
