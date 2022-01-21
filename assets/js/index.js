const clock = document.getElementById("clock");
const gameCell = document.getElementsByClassName("cell");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let scorePlayer1 = 0;
let scorePlayer2 = 0;
player2.innerHTML = scorePlayer2;
player1.innerHTML = scorePlayer1;
let timerGame = setInterval(countTimer, 1000);
let totalSeconds = 180;
let currentPlayer = 1;

let gameState = resetGameState();
function countTimer() {
  totalSeconds--;
  var hour = Math.floor(totalSeconds / 3600);
  var minute = Math.floor((totalSeconds - hour * 3600) / 60);
  var seconds = totalSeconds - (hour * 3600 + minute * 60);
  clock.innerHTML = minute + ":" + seconds;
}

function clickOnCell() {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(i);

    cell.onclick = function () {
      let coordinateXY = cell.getAttribute("data-coordinates");
      coordinateXY = coordinateXY.split(",");

      if (currentPlayer === 1) {
        let img = document.createElement("img");
        img.src = "../assets/img/rond.png";
        cell.appendChild(img);
        //file gamestate to check victory

        gameState[Number(coordinateXY[0])][Number(coordinateXY[1])] = [1];

        checkVictory();
        currentPlayer = 2;
      } else {
        let img2 = document.createElement("img");
        img2.src = "../assets/img/croix.png";
        cell.appendChild(img2);
        //file gamestate to check victory
        gameState[Number(coordinateXY[0])][Number(coordinateXY[1])] = [2];
        checkVictory();
        currentPlayer = 1;
      }
    };
  }
}
clickOnCell();
function checkVictory() {
  //check for victory on x axis
  for (let i = 0; i <= 2; i++) {
    const line = gameState[i].flat();
    const uniqueValues = Array.from(new Set(line));
    if (uniqueValues.length === 1 && !line.includes(0)) {
      if (uniqueValues[0] === 1) {
        scorePlayer1 += 1;
        player1.innerHTML = scorePlayer1;
        gameState = resetGameState();
        resetBoard();
      } else {
        scorePlayer2 += 1;
        player2.innerHTML = scorePlayer2;
        gameState = resetGameState();
        resetBoard();
      }
    }
  }
  //check for victory on y axis
  let coordinatesY = [];
  for (let i = 0; i <= 2; i++) {
    const line = gameState[i].flat();
    coordinatesY[i] = line[0];
  }
  //check for victory on diagonals
}
function resetGameState() {
  let gameState = [
    [[0], [0], [0]],
    [[0], [0], [0]],
    [[0], [0], [0]],
  ];
  return gameState;
}
function resetBoard() {
  var images = [].slice.call(document.getElementsByTagName("img"), 0); // get the images as array like object, and turn it into an array using slice

  images.forEach(function (img) {
    img.parentNode.removeChild(img);
  });
}
