const fs = require("fs");
const readline = require("readline");
const lineReader = require("line-reader");
var diffMatchPatch = require("diff-match-patch-node");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let arrLinePatterns = [];
let arrLineInputs = [];
lineReader.eachLine("patterns.txt", function (line, last) {
  arrLinePatterns.push(line);
  if (last) getInputFile();

});
const getInputFile=()=>{
  lineReader.eachLine("input.txt", function (line, last) {
    arrLineInputs.push(line);
  
    if (last) getIputConsole();
  
  });
}


const getIputConsole = () => {
  rl.question(
    "Which mode to choose ? /n 1. First mode /n 2.Last mode /n 3.Third mode ",
    (mode) => {
      switch (mode) {
        case '1':
          checkPattern();
          break;
        case '2':
          secondCheck();
          break;
        case '3':
          checkThird()
          break;
      }
    }
  );
};

const checkPattern = () => {
  console.log("First mode :");
  lineReader.eachLine("input.txt", function (line, last) {
    arrLineInputs.push(line);
    for (const value of arrLinePatterns) {
      if (line.includes(value)) {
        console.log("-----------------------------------------");
        console.log(line);
      }
    }
    if (last) getIputConsole();

  });
};

const secondCheck = () => {
  console.log("<---------------->");
  console.log("Second mode: ");
  lineReader.eachLine("input.txt", function (line, last) {
    arrLinePatterns.forEach((item,index)=>{
      let err=0;
      for(let i=0;i<item.length;i++){
        if(line[i]!==item[i]){
          err++;
        }
      }
      if(err==0){
        console.log("-----------------------------------------");
        console.log(line)
      }
    })
    if (last) getIputConsole();
  });
};

const checkThird = () => {
  console.log("<----------------->");
  console.log("Third mode: ");

  
  for (let value1 of arrLineInputs) {
    for (let value2 of arrLinePatterns) {
      let result = diffMatchPatch().diff_main(value1, value2);
      if (result.length < 3) console.log(value1);
    }
  }

  getIputConsole()
};
