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

const characters = {
  type: ["Elf", "Human", "Orc"],
  elf: {
    enemies: ["Human", "Orc"],
    weapon: "arch",
  },
  human: {
    enemies: ["Elf", "Orc"],
    weapon: "sword",
  },
  orc: {
    enemies: ["Elf", "Human"],
    weapon: "axe",
  },
};

function randomEnemy(prisioner) {
  if (prisioner.race === "Elf") {
    const enemySelection = Math.floor(
      Math.random() * characters.elf.enemies.length
    );
    const enemy = characters.elf.enemies[enemySelection];
    return enemy;
  } else if (prisioner.race === "Human") {
    const enemySelection = Math.floor(
      Math.random() * characters.human.enemies.length
    );
    const enemy = characters.human.enemies[enemySelection];
    return enemy;
  } else {
    const enemySelection = Math.floor(
      Math.random() * characters.orc.enemies.length
    );
    const enemy = characters.orc.enemies[enemySelection];
    return enemy;
  }
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
  let answers = [];
  let cellNm = 2;

  let fibonacci = [1, 1];
  for (let i = 2; i <= 8; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
  }

  let randomIndex = Math.floor(Math.random() * 8); // Genera un número aleatorio menor o igual a 8
  task(
    `\nWrite the missing number:\n${fibonacci.slice(
      randomIndex,
      randomIndex + 4,
    )}, ? . \n`,
    0,
    answers,
    function () {
      task(
        `\nYou heard a conversation between two ${randomEnemy(
          prisioner
        )}s guards:
        \n-...Yeah!, just yesterday we caught an ${
          prisioner.race
        } armed with a ${
          prisioner.weapons
        }, we locked him in cell number ${cellNm}...-. 
          \nTry to entering your cell number:`,
        1, //2
        answers,
        function () {
          task(
            `\nYou only need one more number!.\nHint: this is one digit number that you haven't written before, is even, less than 8 and it is also a multiple of 3.\n`,
            2,
            answers,
            function () {
              lockCode(answers, fibonacci, randomIndex);
            },
            function (input) {
              // Number conditions (6?)
              return (
                input.length === 1 &&
                !isNaN(input) &&
                input >= 0 &&
                input <= 9 &&
                input !== fibonacci[randomIndex + 4] &&
                !answers.includes(parseInt(input)) &&
                input % 2 === 0 &&
                input % 3 === 0
              );
            }
          );
        }
      );
    }
  );

  function lockCode(answers, fibonacci, randomIndex) {
    userFeedback(
      `\nLet's put all the answer together! 
Lock Code: ${answers[0]}-${answers[1]}-${answers[2]} = \n`,
      function (input) {
        if (input ===`${fibonacci[randomIndex + 4]}26`) {
          console.log(
            "\nIt's open!!! \n-------------- (^ ﾟДﾟ)^ --------------\nNow Run!!!!"
          );
        } else {
          console.log(`Some of your answer are incorrect.\n\n(╬ ಠ益ಠ) \n`);
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
      const race = characters.type[i];
      console.log(`You've chosen ${characters.type[i]}!\n`);
      console.log(`You are an ${race} who has been captured bay the enemy and you want to escape. 
            \n                         (ง'̀-'́)ง. 
            \nIn order to achieve that, you must complete the following exercises to unlock the door.`);
      const prisioner = new WarriorInPrision(race, characters[race.toLowerCase()].weapon);
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
