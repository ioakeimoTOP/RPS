import { RPS } from './src/modules/rps.mjs';
import { elementBuilder } from './src/modules/utils.mjs';

// Initialization
const rps = new RPS();
let playerChoices = rps.getValidChoices();
const rpsIcons = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️',
};

const display = document.querySelector('.game__versus');
const playerControls = document.querySelector('.game__player');
generatePlayerControls(playerControls, playerChoices, rpsIcons);

const score = {
  player: 0,
  opponent: 0,
};

function generatePlayerControls(parent, playerChoices, rpsIcons) {
  for (const playerChoice of playerChoices) {
    let element = elementBuilder('button', [
      'game__icon',
      'game__choice',
      `game__choice-${playerChoice}`,
    ]);
    element.innerText = `${rpsIcons[playerChoice]}`;
    parent.appendChild(element);
  }
}

function parsePlayerChoice(classList) {
  const choiceClassPrefix = 'game__choice-';
  const choiceClass = [...classList].filter((cls) =>
    cls.startsWith(choiceClassPrefix)
  );
  const playerChoice = choiceClass[0]?.replace(choiceClassPrefix, '');
  return playerChoice;
}

function updateScore(score, roundResult) {
  if (roundResult === 'win') {
    score.player++;
  } else if (roundResult === 'loss') {
    score.opponent++;
  }
}

function setDisplay(display, playerChoice, computerChoice, score, rpsIcons) {
  display.querySelector('.game__score-player').innerText = score.player;
  display.querySelector('.game__round-player').innerText =
    rpsIcons[playerChoice];

  display.querySelector('.game__score-opponent').innerText = score.opponent;
  display.querySelector('.game__round-opponent').innerText =
    rpsIcons[computerChoice];
}

function handlePlayerAction(event) {
  const playerChoice = parsePlayerChoice(event.target.classList);
  if (!playerChoice) return;

  const round = rps.playRound(playerChoice);
  updateScore(score, round.result);
  setDisplay(display, playerChoice, round.computerChoice, score, rpsIcons);
}

playerControls.addEventListener('click', handlePlayerAction);
