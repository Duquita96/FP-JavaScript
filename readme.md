# README.md

## Escape Game

This is an interactive escape game where the player assumes the role of a fantasy character who has been captured by the enemy. The goal of the game is to solve a series of exercises to unlock the door and escape.

### How to Play

The game begins by asking the player to choose a character type. The options are:

- Elf
- Human
- Orc

Each character has its own characteristics and enemies.

Once the player has selected a character, they are presented with a series of exercises that they must solve to unlock the door. The exercises include:

- Completing a Fibonacci sequence.
- Listening to a conversation between two enemy guards and remembering a key number.
- Choosing a number that has not been used before, is even, and is a multiple of 3.

If the player correctly solves all the exercises, the door opens and the character escapes!

### Code

The game is written in JavaScript and uses the `readline` library for console input and output. The game logic is found in several functions, including `userFeedback`, `randomEnemy`, `endGame`, `playAgain`, `task`, `WarriorInPrision`, `round`, `wrongRace`, `Race`, and `lockCode`.

### How to Run the Game

To run the game, you will need to have Node.js installed on your machine. Then, you can run the game with the following command:

```
node escape_game.js
```

Have fun playing!