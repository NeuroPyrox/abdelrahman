"use strict";

const ReactDOM = require("react-dom");
// Idk why webpack makes me require React here, but I get "Error: React is not defined" otherwise
const React = require("react");
const QuantityInput = require("./QuantityInput.jsx");
const XButton = require("../components/xButton.jsx");
const Menu = require("./menu.jsx");

ReactDOM.render(
  <div>
    <Menu />
    <div>
      <XButton />
      <h4>10x Sweet 'n Sour Chicken</h4>
      <div className="spiceRadio">
        <input type="radio" name="snsSpice" value="notSpicy" id="snsNotSpicy" />
        <label htmlFor="snsNotSpicy">Not Spicy</label>
        <input type="radio" name="snsSpice" value="mild" id="snsMild" />
        <label htmlFor="snsMild">Mild</label>
        <input type="radio" name="snsSpice" value="hot" id="snsHot" />
        <label htmlFor="snsHot">Hot</label>
      </div>
      <h4>4x Butter Chicken</h4>
      <div className="spiceRadio">
        <input type="radio" name="bcSpice" value="notSpicy" id="bcNotSpicy" />
        <label htmlFor="bcNotSpicy">Not Spicy</label>
        <input type="radio" name="bcSpice" value="mild" id="bcMild" />
        <label htmlFor="bcMild">Mild</label>
        <input type="radio" name="bcSpice" value="hot" id="bcHot" />
        <label htmlFor="bcHot">Hot</label>
      </div>
    </div>
  </div>,
  document.getElementById("main")
);
