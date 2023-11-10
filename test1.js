console.log(
  "Welcome Player to the Game of Title/Game! \nFirst, choose your Character:"
);

const characters = {
  type: ["Elf", "Human", "Orc"],
};

//Se utiliza la función readline.createInterface()
// para crear una interfaz de lectura y escritura para la entrada y
// salida estándar. Luego, se utiliza la función rl.question() para
// hacer una pregunta al usuario y esperar su respuesta. Una vez que
// se recibe la respuesta del usuario, se compara con los elementos del
// array characters.type utilizando un bucle for. Si la respuesta del
// usuario coincide con un elemento en el array, se muestra un mensaje
// que indica que el usuario eligió ese personaje.

const readline = require("readline"); //readline en un modulo de node.js

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//readline en una funcion que le dice espera que se le pase una respuesta para continuar con el siguiente paso

askUser();

function askUser() {
  rl.question(
    `\n${characters.type[0]} \n${characters.type[1]} \n${characters.type[2]} \nType your answer here: `,
    (userCharChoose) => {
      let foundMatch = false;
      for (let i = 0; i < characters.type.length; i++) {
        if (userCharChoose.toLowerCase() === characters.type[i].toLowerCase()) {
          console.log(`You've chosen ${characters.type[i]}!`);
          console.log(
            "Now for start to play we need to move your character across the map, for that you we need to roll the dice"
          );

          foundMatch = true;
          break;
        }
      }
      if (!foundMatch) {
        //if the answer is wrong the error message shows up
        console.log("You must write in character type, please try again.");
        askUser();
      } else {
        rollDice();
      }
    }
  );
}

function rollDice() {
  rl.question("Enter '1' to roll the dice: ", (userInput) => {
    if (userInput === "1") {
      const randomNumber = Math.floor(Math.random() * 4) + 1;
      console.log(
        `You rolled a ${randomNumber}!, so move ${randomNumber} block across the map`
      );
      level1(randomNumber);
    } else {
      console.log("Invalid input. Please try again.");
    }
    rl.close();
  });
}

function level1(randomNumber) {
  let level1 = {
    block1: {
      Celda1_1: "Valor1_1",
      Celda1_2: "Valor1_2",
      Celda1_3: "Valor1_3",
      Celda1_4: "Valor1_4",
    },
  };  
    // // Crea un array con los nuevos valores
    // const newValues = [`Your ${characters.type[i]} is in Quest #1!`,`Your ${characters.type[i]} is in Quest #2!`, `Your ${characters.type[i]} is in Quest #3!`, `Your ${characters.type[i]} is in Quest #4!`];
  
    // // Actualiza el valor de la celda correspondiente
    // level1.block1[`Celda1_${randomNumber}`] = newValues[randomNumber - 1];
  
    // Muestra los datos como una tabla en la consola
    console.table(level1);
  }
