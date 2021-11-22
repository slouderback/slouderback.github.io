(function () {
  "use strict";
  console.log("reading js");

  let startGame = document.getElementById("startgame");
  let gameControl = document.getElementById("gamecontrol");
  let gameContainer = document.getElementById("gamecontainer");
  let game = document.getElementById("game");
  let score = document.getElementById("score");
  let rollButton = document.getElementById("roll");
  let passButton = document.getElementById("pass");
  const player1Sound = new Audio("sounds/Player1.mp3");
  const player2Sound = new Audio("sounds/Player2.mp3");

  let gameData = {
    dice: [
      "./images/1die.png",
      "./images/2die.png",
      "./images/3die.png",
      "./images/4die.png",
      "./images/5die.png",
      "./images/6die.png",
    ],
    players: ["player 1", "player 2"],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 29,
  };

  function showGameBoard() {
    gameContainer.style.visibility = "visible";
    score.style.visibility = "visible";
  }

  startGame.addEventListener("click", function (e) {
    showGameBoard();
    gameControl.innerHTML = "<h2>The Game Has Started</h2>";
    gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

    document.getElementById("quit").addEventListener("click", function (e) {
      location.reload();
    });

    passButton.addEventListener("click", function (e) {
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      setUpTurn();
    });

    rollButton.addEventListener("click", function (e) {
      throwDice();
    });

    setUpTurn();
    showCurrentScore();
  });

  function showControls() {
    rollButton.style.visibility = "visible";
    passButton.style.visibility = "visible";
  }

  function hideControls() {
    rollButton.style.visibility = "hidden";
    passButton.style.visibility = "hidden";
  }

  function setUpTurn() {
    game.innerHTML = `<p>Roll the dice for the ${
      gameData.players[gameData.index]
    }</p>`;
    if (gameData.index == 0) {
      player1Sound.play();
    } else {
      player2Sound.play();
    }
    showCurrentScore();
    showControls();
  }

  function throwDice() {
    hideControls();
    gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    gameData.roll2 = Math.floor(Math.random() * 6) + 1;
    game.innerHTML = `<p>Roll the dice for the ${
      gameData.players[gameData.index]
    }</p>`;
    game.innerHTML += `<img src="${
      gameData.dice[gameData.roll1 - 1]
    }"><img src="${gameData.dice[gameData.roll2 - 1]}">`;

    gameData.rollSum = gameData.roll1 + gameData.roll2;

    if (gameData.rollSum == 2) {
      game.innerHTML += "<p>Oh snap! Snake Eyes!</p>";
      gameData.score[gameData.index] = 0;
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      showCurrentScore();
      setTimeout(setUpTurn, 2000);
    } else if (gameData.roll1 == 1 || gameData.roll2 == 1) {
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${
        gameData.players[gameData.index]
      }</p>`;
      showCurrentScore();
      setTimeout(setUpTurn, 2000);
    } else {
      gameData.score[gameData.index] =
        gameData.score[gameData.index] + gameData.rollSum;
      showControls();

      checkWinningCondition();
    }
  }

  function checkWinningCondition() {
    if (gameData.score[gameData.index] > gameData.gameEnd) {
      game.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${
        gameData.score[gameData.index]
      } points!`;
      hideControls();
      score.style.visibility = "hidden";
      score.innerHTML = "";
      document.getElementById("quit").innerHTML = "Start a New Game?";
    } else {
      showCurrentScore();
    }
  }

  function showCurrentScore() {
    score.innerHTML = `<strong class="${gameData.index ? "" : "active"}">${
      gameData.players[0]
    }: ${gameData.score[0]}</strong> <strong class="${
      gameData.index ? "active" : ""
    }">${gameData.players[1]}: ${gameData.score[1]}</strong>`;
  }
})();
