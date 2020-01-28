"use strict";

// We need to keep this one function in its whole separate module
// because then we only have to change it in one place
module.exports = function foundBug(err) {
  console.error(err);
  alert("You just found a bug! Go to your browser's console for more info.");
};
