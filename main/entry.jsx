"use strict";

const ReactDOM = require("react-dom");
// Idk why webpack makes me require React here, but I get "Error: React is not defined" otherwise
const React = require("react");
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
        selected={true}
      />
      <Dish
        image={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/220px-Chicken_makhani.jpg"
        }
        name="Butter Chicken"
        selected={false}
      />
    </div>
    <div>
      <h4>Sweet 'n Sour Chicken</h4>
      <div className="spiceRadio">
        <input type="radio" name="snsSpice" value="notSpicy" id="snsNotSpicy" />
        <label for="snsNotSpicy">Not Spicy</label>
        <input type="radio" name="snsSpice" value="mild" id="snsMild" />
        <label for="snsMild">Mild</label>
        <input type="radio" name="snsSpice" value="hot" id="snsHot" />
        <label for="snsHot">Hot</label>
      </div>
      <h4>Butter Chicken</h4>
      <div className="spiceRadio">
        <input type="radio" name="bcSpice" value="notSpicy" id="bcNotSpicy" />
        <label for="bcNotSpicy">Not Spicy</label>
        <input type="radio" name="bcSpice" value="mild" id="bcMild" />
        <label for="bcMild">Mild</label>
        <input type="radio" name="bcSpice" value="hot" id="bcHot" />
        <label for="bcHot">Hot</label>
      </div>
    </div>
  </div>,
  document.getElementById("main")
);
