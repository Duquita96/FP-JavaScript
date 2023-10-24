const characters = {
  type: ["Elf", "Human", "Orc"],
};

function Race(input) {
  let foundMatch = false;
  for (let i = 0; i < characters.type.length; i++) {
    if (input.toLowerCase() === characters.type[i].toLowerCase()) {
      console.log(`You've chosen ${characters.type[i]}!`);
      foundMatch = true;
      break;
    }
  }
  if (!foundMatch) {
    userFeedback(
      `You must write in character type, please try again.\n${characters.type[0]} - ${characters.type[1]} - ${characters.type[2]} \n`,
      Race
    );
  }

  // let chindex = characters.type.indexOf(input.toLowerCase())
  //  if(chindex === -1){
  //     userFeedback(
  //     `You must write in character type, please try again.\n${characters.type[0]} - ${characters.type[1]} - ${characters.type[2]} \n`,
  //     Race
  //   );
  //  } else {
  //     console.log(`You've chosen ${characters.type[chindex]}!`);
  //  }
}

function startGame() {
  console.log("Welcome Player to the Game of Title/Game");
  //Race();
  userFeedback(
    `First, type your Character:\n${characters.type[0]} - ${characters.type[1]} - ${characters.type[2]} \n`,
    Race
  );
}

function round(turno) {
  console.log(`estas en el turno ${turno}`);
  userFeedback("pregunta X del turno 1");
}

function endGame() {
  console.log("You have finished");
}

function Game() {
  if (startGame()) {
    //le agrego un if porque si no se ejecuta simultaneamente las sig funciones antes que se termine la anterior
    round("1");
    //endGame();
  }
}

//***************************************** */

function userFeedback(toAsk, myFunction) {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(toAsk, (userInput) => {
    myFunction(userInput);
  });
}

//********************************************** */

//*******EXE****//

Game();
