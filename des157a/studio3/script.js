(function () {
  "use strict";
  console.log("reading js");

  let startGame = document.getElementById("startgame");
  let gameControl = document.getElementById("gamecontrol");
  let game = document.getElementById("game");
  let score = document.getElementById("score");
  let actionArea = document.getElementById("actions");

  let gameData = {
    dice: [
      "./images/1die.jpg",
      "./images/2die.jpg",
      "./images/3die.jpg",
      "./images/4die.jpg",
      "./images/5die.jpg",
      "./images/6die.jpg",
    ],
    players: ["player 1", "player 2"],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 29,
  };

  startGame.addEventListener("click", function (e) {
    gameControl.innerHTML = "<h2>The Game Has Started</h2>";
    gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

    document.getElementById("quit").addEventListener("click", function (e) {
      location.reload();
    });

    setUpTurn();
  });

  function setUpTurn() {
    game.innerHTML = `<p>Roll the dice for the ${
      gameData.players[gameData.index]
    }</p>`;
    actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';

    document.getElementById("roll").addEventListener("click", function (e) {
      throwDice();
    });
  }

  function throwDice() {
    actionArea.innerHTML = "";
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
      actionArea.innerHTML =
        '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

      document
        .getElementById("rollagain")
        .addEventListener("click", function (e) {
          setUpTurn();
        });

      document.getElementById("pass").addEventListener("click", function (e) {
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        setUpTurn();
      });

      checkWinningCondition();
    }
  }

  function checkWinningCondition() {
    if (gameData.score[gameData.index] > gameData.gameEnd) {
      score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${
        gameData.score[gameData.index]
      } points!`;
      actionArea.innerHTML = "";
      document.getElementById("quit").innerHTML = "Start a New Game?";
    } else {
      showCurrentScore();
    }
  }

  function showCurrentScore() {
    score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
  }
})();
