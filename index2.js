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

function playAgain() {
  userFeedback(
    `\nDo you wanna play again? 
  \nYes: y or No: n \n`,
    function (input) {
      if (input.toLowerCase() === "y") {
        return startGame(function () {});
      } else {
        console.log("Game Over");
      }
    },
    function () {}
  );
}

function endGame() {
  console.log("\nSee ya!\n(> ˘ ³˘)>♥");
}

function round(callback) {
  console.log("Let's calculate:");
  let exe1Answer = 2;

  function firstask(callback) {
    userFeedback(
      `\nWrite your answer.\n${exe1Answer} + ${exe1Answer}= ?\n`,
      function (input) {
        exe1Answer = input;
        secondTask(callback);
      },
      function () {}
    );
  }
  firstask(function () {});

  let exe2Answer = 40;
  function secondTask(callback) {
    userFeedback(
      `\nWrite your answer.\n${exe2Answer} + ${exe2Answer}= ?\n`,
      function (input) {
        exe2Answer = input;
        thirdTask(callback);
      },
      function () {}
    );
  }

  let exe3Answer = 120;
  function thirdTask(callback) {
    userFeedback(
      `\nWrite your answer.\n${exe3Answer} + ${exe3Answer}= ?\n`,
      function (input) {
        exe3Answer = input;
        lockCode(callback);
      },
      function () {}
    );
  }

  function lockCode(callback) {
    userFeedback(
      `\nLet's put all the answer together! 
  \nLock Code: ${exe1Answer}-${exe2Answer}-${exe3Answer} = \n`,
      function (input) {
        if (input === "480240") {
          console.log(
            "\nIt's open!!! \n-------------- (^ ﾟДﾟ)^ --------------\nNow Run!!!! "
          );
          endGame();
        } else {
          console.log("Some of your answer are incorrect.\n\n(╬ ಠ益ಠ) \n");
          playAgain();
        }
        callback();
      },
      function () {}
    );
  }
  callback;
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
        \nFor that you must complete the following exercises to unlock the door.\n`
      );
      round();
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
