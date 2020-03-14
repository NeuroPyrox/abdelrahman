"use strict";

const {assert} = require("./helpers.js");

const testCases = [
  [`nil`, null],
  
  [`true`, true],
  [`false`, false],
  
  [`true "not"`, false],
  [`false "not"`, true],
  
  [`true "and" true`, true],
  [`true "and" false`, false],
  [`false "and" true`, false],
  [`false "and" false`, false],
  [`true "and"`, null],
  [`false "and"`, null],
  
  [`true "or" true`, true],
  [`true "or" false`, true],
  [`false "or" true`, true],
  [`false "or" false`, false],
  [`true "or"`, null],
  [`false "or"`, null],
  
  [`0`, 0],
  [`1`, 1],
  [`2495872`, 2495872],
  [`0034500`, 34500],
  [`-789`, -789],
  [`-432.543`, -432.543]
  
  [`64 "add" 36`, 100],
  [`-3 "add" 6`, 6],
  [`-6 "add" 3`, -3],
  [`-4 "add" -7`, -11],
  [`-4.5 "add" 5`, 0.5],
  [`5.4 "add" 6.5`, 11.9],
  
  [`3 "sub" 1`, 2],
  [`3 "sub" 4`, -1],
  [`-2 "sub" 3`, -5],
  [`-2 "sub" -1`, -1],
  [`-2 "sub" -5`, 3],
  [`-0.4 "sub" -3.5`, 3.1],
  [`-5 "sub" 4.4`, -9.4],
  
  [`3 "mul" 5`, 15],
  [`-3 "mul" 5`, -15],
  [`3 "mul" -5`, -15],
  [`-3 "mul" -5`, 15],
  [`0.1 "mul" -0.1`, -0.01],
  [`4 "mul" -0.3`, -1.2],
  
  [`6 "div" 2`, 3],
  [`5 "div" 2`, 2],
  [`5.0 "div" 2`, 2.5],
  [`5 "div" 2.0`, 2.5],
  [`-5 "div" 2`, -3],
  [`1 "div" 0`, null],
  
  [`nil "is"`, null],
  [`nil "is" nil`, true],
  [`nil "is" true`, false],
  [`nil "is" false`, false],
  
  [`true "is"`, null],
  [`true "is" true`, true],
  [`true "is" false`, false],
  [`true "is" nil`, false],
  
  [`false "is"`, null]
  [`false "is" false`, true],
  [`false "is" true`, false],
  [`false "is" nil`, false],
];
