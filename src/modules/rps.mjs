import { getRandomIndex } from './utils.mjs';

export class RPS {
  #gameGraph;
  #validChoices;
  #numChoices;

  constructor() {
    this.#gameGraph = new Map([
      [
        'rock',
        {
          beats: new Set(['scissors']),
          loses: new Set(['paper']),
        },
      ],
      [
        'paper',
        {
          beats: new Set(['rock']),
          loses: new Set(['scissors']),
        },
      ],
      [
        'scissors',
        {
          beats: new Set(['paper']),
          loses: new Set(['rock']),
        },
      ],
    ]);

    this.#validChoices = Array.from(this.#gameGraph.keys());
    this.#numChoices = this.#validChoices.length;
  }

  #getComputerChoice() {
    const randomChoice = this.#validChoices[getRandomIndex(this.#numChoices)];
    return randomChoice;
  }

  #isValidChoice(playerChoice) {
    return this.#gameGraph.has(playerChoice);
  }

  getValidChoices() {
    return Array.from(this.#validChoices);
  }

  getGraphFor(playerChoice) {
    if (!this.#isValidChoice(playerChoice)) return null;

    return {
      beats: Array.from(this.#gameGraph.get(playerChoice).beats),
      loses: Array.from(this.#gameGraph.get(playerChoice).loses),
    };
  }

  playRound(playerChoice) {
    if (!this.#isValidChoice(playerChoice)) return null;

    const computerChoice = this.#getComputerChoice();
    let result = 'tie';
    if (this.#gameGraph.get(playerChoice).beats.has(computerChoice)) {
      result = 'win';
    } else if (this.#gameGraph.get(playerChoice).loses.has(computerChoice)) {
      result = 'loss';
    }

    return { computerChoice, result };
  }
}
