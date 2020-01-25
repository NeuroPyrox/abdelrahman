"use strict";

module.exports = {
  foundBug: function foundBug(err) {
    console.error(err);
    alert("You just found a bug! Go to your browser's console for more info.");
  }
};
