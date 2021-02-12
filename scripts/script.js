// Module object for gameBoard and displayController
const gameBoard = (() => {
  const gameboard = ['', '', 'X', 'O', 'O', 'X', 'X', 'O', 'O'];

  return {
    gameboard,
  };
})();

// Factory object for players

const player = (name, mark, place) => {
  return { name, mark, place };
};

// Object to control the flow of the game (?)

const gamePlay = () => {};

// ===============================================
function fillBoard() {
  for (let i = 0; i < gameBoard.gameboard.length; i++) {
    document.getElementById(`${i}`).innerHTML = gameBoard.gameboard[i];
  }
}

let select_buttons = document.querySelectorAll('.select-button');

select_buttons.forEach((button) => {
  button.addEventListener('click', (e) => selectPlayer(e.target.innerHTML));
})
function selectPlayer(mark1) {
    const name1 = document.querySelector('#name1').value
    const name2 = document.querySelector('#name2').value
  let mark2 = '';
  if (mark1 === 'X') {
    mark2 = 'O';
  } else {
    mark2 = 'X';
  }

  const player1 = player(name1, mark1, 1)
  const player2 = player(name2, mark2, 2)

  document.getElementById('player1').innerHTML = `${player1.name} is ${player1.mark}`
  document.getElementById('player2').innerHTML = `${player2.name} is ${player2.mark}`

  document.querySelector('.player-select').style.display = 'None';

  console.log(player1, player2)
}

const squares = document.querySelectorAll('.square');

squares.forEach((square) => {
  square.addEventListener('click', (square) => addMark(square));
});

function addMark(e) {
  const mark = e.target;

  if (!mark.innerHTML) {
    console.log(mark);
  }
}

function checkWinner(gameboard) {
  const v0 = gameboard[0];
  const v1 = gameboard[1];
  const v2 = gameboard[2];
  const v3 = gameboard[3];
  const v4 = gameboard[4];
  const v5 = gameboard[5];
  const v6 = gameboard[6];
  const v7 = gameboard[7];
  const v8 = gameboard[8];

  if (
    (v0 === v1 && v1 === v2) ||
    (v0 === v3 && v3 === v6) ||
    (v0 === v4 && v4 === v8) ||
    (v3 === v4 && v4 === v5) ||
    (v1 === v4 && v4 === v7) ||
    (v2 === v4 && v4 === v6) ||
    (v6 === v7 && v7 === v8) ||
    (v2 === v5 && v5 === v8)
  ) {
    console.log('winner');
  }
}

fillBoard();
checkWinner(gameBoard.gameboard);
