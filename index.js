
//selecting the game board buttons & reset button.
const squares = Array.from(document.querySelectorAll('.square'));
const resetButton = document.querySelector('#reset-button');
//setting the first turn of every game to 'X'
let xIsNext = true;

//adding what should happen when a button is clicked
squares.forEach(square => square.addEventListener('click', handleClick));
resetButton.addEventListener('click', handleReset);

//function to add player mark and removes the event listener so it cannot be used more than once.
function placeMark(square, currentClass) {
  square.classList.add(currentClass);
  square.removeEventListener('click', handleClick);
  square.innerHTML = currentClass.toUpperCase();
  if (checkWin(currentClass)) {
    showWinAlert(currentClass);
  }
}
//grabs clicked element and then compares the xIsNext variable to switch player turns
function handleClick(event) {
  const square = event.target;
  const player = xIsNext ? 'x' : 'o';
  placeMark(square, player);

  // Check if the current player has won the game
  if (checkWin(player)) {
    // If the player has won, show the win alert 
    showWinAlert(player);
    return;
  }

  // Check if the game is a draw
  if (checkDraw()) {
    // If the game is a draw, show the win alert
    showWinAlert();
  }

  xIsNext = !xIsNext;
  updateTurnHeader();
}



//removing x and o from buttons on reset 
function handleReset() {
  squares.forEach(square => {
    square.classList.remove('x');
    square.classList.remove('o');
  });
//reseting the inner html to be blank, adding the event listener back, and setting the init turn back to 'X'
  squares.forEach(square => {
    square.innerHTML = '';
    square.addEventListener('click', handleClick);
  });
  xIsNext = true;
  updateTurnHeader();
  winAlert.innerHTML = ``
}



//creating the turn header vairable and writing the method to change it and then calling it
const turnHeader = document.querySelector('#turn-header');

function updateTurnHeader() {
  turnHeader.innerHTML = `Player ${xIsNext ? 'X' : 'O'}'s turn`;
}

updateTurnHeader();

//checking win conditions!
function checkWin(currentClass) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a].classList.contains(currentClass) && squares[b].classList.contains(currentClass) && squares[c].classList.contains(currentClass)) {
      return true;
    }
  }
  return false;
}


function checkDraw() {
  // Check if all squares on the board have been clicked
  if (squares.every(square => square.innerHTML !== '')) {
    // If all squares have been clicked, check if there is a winner
    if (checkWin('x') || checkWin('o')) {
      // If there is a winner, return false
      return false;
    } else {
      // If there is no winner, set the winAlert inner HTML to "It's a draw"
      winAlert.innerHTML = "It's a draw!";
    }
  } 
}

//declaring winner or draw
const winAlert = document.querySelector('#win-alert');

function showWinAlert(winner) {
  if (squares.every(square => square.classList.contains('x') || square.classList.contains('o')))  {
    winAlert.innerHTML = 'It\'s a draw!';
  } else {
    winAlert.innerHTML = `Player ${winner.toUpperCase()} wins!`;
  }
}


