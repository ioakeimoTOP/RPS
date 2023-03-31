import { RPS } from './src/modules/rps.mjs';

const rps = new RPS();

for (let i = 0; i < 3; i++) {
  let playerChoice = prompt('Rock / Paper / Scissors ?');
  if (playerChoice) {
    let parsedPlayerChoice = playerChoice.trim().toLowerCase();
    let round = rps.playRound(parsedPlayerChoice);
    if (round) {
      // Input is valid choice
      console.log(
        `Computer chose ${round.computerChoice}. You ${round.result}!`
      );
    }
  } else {
  }
}
