const fs = require("fs");
const readline = require("readline");
const lineReader = require("line-reader");
var diffMatchPatch = require("diff-match-patch-node");

console.log("First mode :");
let arrLinePatterns = [];
let arrLineInputs = [];
lineReader.eachLine("patterns.txt", function (line, last) {
  arrLinePatterns.push(line);
  if (last) checkPattern();
});

const checkPattern = () => {
  lineReader.eachLine("input.txt", function (line, last) {
    arrLineInputs.push(line);
    for (const value of arrLinePatterns) {
      if (line.includes(value)) {
        console.log("-----------------------------------------");
        console.log(line);
      }
    }
    if (last) secondCheck();
  });
};

const secondCheck = () => {
  console.log("<---------------->");
  console.log("Second mode: ");
  lineReader.eachLine("input.txt", function (line, last) {
    for (const value of arrLinePatterns) {
      if (line === value) {
        console.log("-----------------------------------------");
        console.log(line);
      }
    }
    if (last) checkThird();
  });
};

const checkThird = () => {
  console.log("<----------------->");
  console.log("Third mode: ");

  console.log(result);
  for (let value1 of arrLineInputs) {
    var len = value1.length - 1;
    for (let value2 of arrLinePatterns) {
      var result = diffMatchPatch().diff_main(value1, value2);
      if (result.length < 3) console.log(value1);
    }
  }
};

