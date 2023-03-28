import { randInt } from './utils.mjs';

export class RPS {
  #gameGraph;
  #validChoices;

  constructor() {
    this.#gameGraph = new Map([
      ['rock', new Set(['scissors'])],
      ['paper', new Set(['rock'])],
      ['scissors', new Set(['paper'])],
    ]);

    this.#validChoices = Array.from(this.#gameGraph.keys());
  }

  #gameResult(playerChoice, computerChoice) {
    if (this.#gameGraph.get(playerChoice).has(computerChoice)) {
      return 'win';
    } else if (this.#gameGraph.get(computerChoice).has(playerChoice)) {
      return 'lose';
    } else {
      return 'tie';
    }
  }

  #getComputerChoice() {
    const numberOfChoices = this.#validChoices.length;
    const choice = this.#validChoices[randInt(numberOfChoices)];
    return choice;
  }

  #isValidChoice(playerChoice) {
    return this.#validChoices.includes(playerChoice);
  }

  getValidChoices() {
    return Array.from(this.#validChoices);
  }

  playRound(playerChoice) {
    const parsedPlayerChoice = playerChoice.trim().toLowerCase();
    if (!this.#isValidChoice(parsedPlayerChoice)) {
      return {};
    }

    const computerChoice = this.#getComputerChoice();
    const result = this.#gameResult(parsedPlayerChoice, computerChoice);

    return { computerChoice, result };
  }
}
