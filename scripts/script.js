// Module object for gameBoard and displayController
const gameBoard = (() => {
  const gameboard = ['', '', '', '', '', '', '', ''];

  return {
    gameboard,
  };
})();

// Factory object for players

const player = (name, mark, place) => {
  return { name, mark, place };
};

// Object to control the flow of the game (?)
let select_buttons = document.querySelectorAll('.select-button');

select_buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (
      document.getElementById('name1').value === '' ||
      document.getElementById('name2').value === ''
    ) {
      alert('Please enter players names');
    } else {
      gamePlay(gameBoard.gameboard, e.target.innerHTML);
    }
  });
});

const gamePlay = (gameboard, mark) => {
  const squares = document.querySelectorAll('.square');

  const players = selectPlayer(mark);

  const player1 = players.player1;
  const player2 = players.player2;

  mark = player1.mark;
  console.log(player1.mark);

  ((mark) => {
    squares.forEach((square) => {
      square.addEventListener('click', (square) => {
        if (!checkWinner(gameboard)) {
          addMark(square, mark);

          if (checkWinner(gameboard).finish) {
            if (mark === player1.mark) {
              return finishGame(player1, checkWinner(gameboard).type);
            } else {
              return finishGame(player2, checkWinner(gameboard).type);
            }
          }

          if (mark === 'X') {
            mark = 'O';
          } else {
            mark = 'X';
          }
        }
      });
    });
  })(mark);

  const finishGame = (player, type) => {
    if (type === 'tie') {
      document.querySelector('.result').innerHTML =
        'It was a tie! Want to play again?';
    } else {
      document.querySelector(
        '.result'
      ).innerHTML = `${player.name} won! Want to play again?`;
    }
    document.querySelector('.result-div').style.display = 'block';
  };
};

const selectPlayer = (mark1) => {
  const name1 = document.querySelector('#name1').value;
  const name2 = document.querySelector('#name2').value;

  let mark2 = '';
  if (mark1 === 'X') {
    mark2 = 'O';
  } else {
    mark2 = 'X';
  }

  const player1 = player(name1, mark1, 1);
  const player2 = player(name2, mark2, 2);

  document.getElementById(
    'player-1'
  ).innerHTML = `${player1.name} is ${player1.mark}`;
  document.getElementById(
    'player-2'
  ).innerHTML = `${player2.name} is ${player2.mark}`;

  document.querySelector('.player-select').style.display = 'None';

  console.log(player1, player2);
  return { player1: player1, player2: player2 };
};

const addMark = (e, mark) => {
  const square = e.target;

  if (!square.innerHTML) {
    console.log(square);
    square.innerHTML = mark;
    gameBoard.gameboard[square.id] = mark;
  }
};

const checkWinner = (gameboard) => {
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
    (v0 === v1 && v1 === v2 && v0 != '') ||
    (v0 === v3 && v3 === v6 && v0 != '') ||
    (v0 === v4 && v4 === v8 && v0 != '') ||
    (v3 === v4 && v4 === v5 && v3 != '') ||
    (v1 === v4 && v4 === v7 && v1 != '') ||
    (v2 === v4 && v4 === v6 && v2 != '') ||
    (v6 === v7 && v7 === v8 && v6 != '') ||
    (v2 === v5 && v5 === v8 && v2 != '')
  ) {
    return { finish: true, type: 'win' };
  } else if (boardFull(gameboard)) {
    return { finish: true, type: 'tie' };
  } else {
    return false;
  }
};

const boardFull = (gameboard) => {
  for (var i = 0, l = gameboard.length; i < l; i++) {
    if (gameboard[i] === '') {
      return false;
    }
  }
  return true;
};
