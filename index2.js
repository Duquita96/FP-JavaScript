const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.setMaxListeners(50); // Aumenta el límite a 50

const characters = {
  type: ["Elf", "Human", "Orc"],
};


function playAgain(callback) {
  userFeedback(
    `\nJugar de nuevo? 
  \ny or n \n`,
    function (input) {
      if (input === "y") {
        console.log("ejecutar start game");
      } else {
        console.log(
          "game over"
        );
      }
      callback();
    },
    function () {}
  );
}


function userFeedback(toAsk, myFunction, followUp) {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(toAsk, (userInput) => {
    myFunction(userInput);
    followUp(userInput);
  });
}
function endGame() {
  console.log("You have finished");
}

function round(callback) {
  console.log("Calcula:");
  let level1 = 2;
  let saveTextResult = "Save result for the end";

  function firstask(callback) {
    userFeedback(
      `\nWrite your answer.\n${level1} + ${level1}\n`,
      function (input) {
        console.log(saveTextResult);
        level1 = input;
        secondTask(callback);
      },
      function () {}
    );
  }
  firstask(function () {});

  let level2 = 40;
  function secondTask(callback) {
    userFeedback(
      `\nWrite your answer.\n${level2} + ${level2}\n`,
      function (input) {
        console.log(saveTextResult);
        level2 = input;
        thirdTask(callback);
        callback();
      },
      function () {}
    );
  }

  let level3 = 120;
  function thirdTask(callback) {
    userFeedback(
      `\nWrite your answer.\n${level3} + ${level3}\n`,
      function (input) {
        console.log(saveTextResult);
        level3 = input;
        lockCode(callback);

        callback();
      },
      function () {}
    );
  }

  function lockCode(callback) {
    userFeedback(
      `\nVamos a poner todos los resultados juntos en la cerradura! 
  \nLock Code: ${level1}-${level2}-${level3}\n`,
      function (input) {
        if (input === "480240") {
          console.log("Está abierta!!!");
        } else {
          console.log(
            "Tus resultados incorrectos rompieron el candado y no puedes salir."
          );
          playAgain();
        }
        callback();
      },
      function () {}
    );
  }
  callback;
}

function Race(input) {
  let foundMatch = false;
  for (let i = 0; i < characters.type.length; i++) {
    if (input.toLowerCase() === characters.type[i].toLowerCase()) {
      console.log(`You've chosen ${characters.type[i]}!\n`);
      console.log(
        `La historia es la siguiente. Eres un ${characters.type[i]} atrapado en una celda y para escapar. Para eso necesitas completar varias ejercicios\n`
      );
      round();
      break;
    } else {
      foundMatch = true;
      function wrongRace(callback) {
        userFeedback(
          `You must write in character type, please try again.\n${characters.type[0]} - ${characters.type[1]} - ${characters.type[2]} \n`,
          Race,
          callback
        );
      }
      wrongRace();
    }
  }
}

function startGame(callback) {
  console.log("Welcome Player to the Game of Title/Game");
  userFeedback(
    `First, type your Character:\n${characters.type[0]} - ${characters.type[1]} - ${characters.type[2]} \n`,
    Race,
    callback
  );
}

function Game() {
  startGame(() => {
    round(); //(" este es el valor de turno dentro de funcion Game(): turno#")
  });
}

//*******EXE****//

Game();
