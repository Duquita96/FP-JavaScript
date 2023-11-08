const characters = {
  type: ["Elf", "Human", "Orc"],
};

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//se saca ^esto^ porque estaba creando demasiadas instancias dentro de userFeedback y creaba oyentes(los oyentes son llamadas
//inesesarias a una funcion que no dan ningun resultado y cargan la memoria* por revizar)

function userFeedback(toAsk, myFunction, followUp) {
  rl.question(toAsk, (userInput) => {
    myFunction(userInput);
    followUp(userInput);
  });
}
function endGame() {
  console.log("\nSee ya!\n(> ˘ ³˘)>♥");
}

function playAgain() {
  userFeedback(
    `\nDo you wanna play again? 
    \nYes: y or No: n \n`,
    function (input) {
      if (input.toLowerCase() === "y") {
        return startGame(function () {});
      } else {
        console.log("Game Over");
        endGame();
      }
    },
    function () {}
  );
}

function task(question, index, answers, nextTask) {
  userFeedback(
    question,
    function (input) {
      answers[index] = input;
      nextTask();
    },
    function () {}
  );
}

class WarriorInPrision {
  constructor(race, weapons) {
    this.race = race;
    this.weapons = weapons;
  }
}

function round(prisioner) {
  console.log("Let's calculate:");
  let answers = [144, 2, null];
  let cellNm = [2, 40, 120];

  let fibonacci = [1, 1];
  for (let i = 2; i <= 15; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]; //se suma los dos numeros anteriores(index posicion -1 y posicion -2)
  }
  task(
    `\nWrite the missing number:\n${fibonacci.slice(7, 11)}, ? . \n`, //21,34,55,89, ? = 144
    0,
    answers,
    function () {
      task(
        `\nYou heard a conversation between guards:
        \n-...Yeah!, just yesterday we caught an ${prisioner.race} armed with a ${prisioner.weapons}, we locked him in cell number ${cellNm[0]}...-. 
          \nTry to entering your cell number:`,
        1, //2
        answers,
        function () {
          task(
            `\nYou only need one more number!.\nHint: this is one digit number that you haven't written before and is even.\n`,
            2,
            answers,
            function () {
              lockCode(answers);
            },
            function(input) {
                // Number conditions (6? 8?)
                return input.length === 1 
                && !isNaN(input) 
                && input >= 0 
                && input <= 9 
                && !answers.includes(parseInt(input))
                && input % 2 === 0;
              }
            );
          }
        );
      }
    )

  function lockCode(answers) {
    userFeedback(
      `\nLet's put all the answer together! 
Lock Code: ${answers[0]}-${answers[1]}-${answers[2]} = \n`,
      function (input) {
        if (input === "14426" || input === "14428") {
          console.log(
            "\nIt's open!!! \n-------------- (^ ﾟДﾟ)^ --------------\nNow Run!!!!"
          );
        } else {
          console.log("Some of your answer are incorrect.\n\n(╬ ಠ益ಠ) \n");
          playAgain();
        }
      },
      function () {}
    );
  }
}

function wrongRace(callback) {
  userFeedback(
    `You must write in character type, please try again.\n${characters.type[0]} - ${characters.type[1]} - ${characters.type[2]} \n`,
    Race,
    callback
  );
}

function Race(input) {
  let foundMatch = false;
  for (let i = 0; i < characters.type.length; i++) {
    if (input.toLowerCase() === characters.type[i].toLowerCase()) {
      console.log(`You've chosen ${characters.type[i]}!\n`);
      console.log(
        `You are an ${characters.type[i]} who has been captured bay the enemy and you want to escape. 
            \n                         (ง'̀-'́)ง. 
            \nIn order to achieve that, you must complete the following exercises to unlock the door.`
      );
      const prisioner = new WarriorInPrision(characters.type[i], "sword");
      round(prisioner);
      break;
    } else {
      foundMatch = true;
    }
  }
  if (foundMatch) {
    wrongRace(function () {});
  }
}

function startGame(callback) {
  console.log("Welcome Player to the Game of Logic and Dungeons!");
  userFeedback(
    `First, type your Character:\n${characters.type[0]} - ${characters.type[1]} - ${characters.type[2]} \n`,
    Race,
    callback
  );
}

function Game() {
  startGame(() => {
    round(); //(" este es el valor de turno dentro de funcion Game(): turno#")
  }, endGame);
}

//*******EXE****//

Game();
