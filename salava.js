// function round(turno) {
//     console.log(`estas en el turno ${turno}`);
//     rollDice();
//   }

//   function rollDice() {
//     userFeedback(`Enter '1' to roll the dice:`, (userInput) => {
//       if (userInput === "1") {
//         const randomNumber = Math.floor(Math.random() * 4) + 1;
//         console.log(
//           `You rolled a ${randomNumber}!, so move ${randomNumber} block across the map`
//         );
//       }
//     });
//   }

//   function userFeedback(toAsk, myFunction) {
//     const readline = require("readline");
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     rl.question(toAsk, (userInput) => {
//       myFunction(userInput);
//       rl.close();
//     });
//   }

//   //********************************************** */

//   //*******EXE****//

//   Game();

let myname;
function f1(callback) {
  const readline = require("readline");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Please enter your name: ", (name) => {
    console.log(`Hello, ${name}!`);
    myname = name;
    rl.close();
    callback();
  });
}

function f0(){
  console.log(`starting;`);
}

function f2(){
  console.log(`my name: ${myname}`);
}
function f3(){
  f0();
  f1(() => {f2();}

  );
  // f2();
}

f3();