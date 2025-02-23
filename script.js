const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const message1 = document.getElementById('message1');
const message2 = document.getElementById(`message2`);
const message3 = document.getElementById(`message3`);
const attemptsDisplay = document.getElementById('attempts');
const resetGameButton = document.getElementById('resetGame');


let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let paperInterval;



function checkGuess() {
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    message1.textContent = 'Please enter a valid number between 1 and 100.';
    return;
  }

  message2.textContent = `Last Guess: ${userGuess}`

  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (userGuess === randomNumber) {
    message1.textContent = ``;
    message2.textContent = ``;
    attemptsDisplay.textContent = `The number is ${randomNumber}`;
    message3.textContent = `Congratulations!🥳🎉You guessed the number in ${attempts} attempts`;
    Win();
    endGame();
  } else if (attempts === 5 ) {
    message2.textContent =``;
    attemptsDisplay.textContent = ``;
    message1.textContent = `You Lose 😥 The number is "${randomNumber}"`;
    endGame()
  } else if (userGuess < randomNumber) {
    message1.textContent = 'Higher! Try again.';
  } else {
    message1.textContent = 'Lower! Try again.';
  }

  guessInput.value = '';
}

function endGame() {
  guessInput.disabled = true;
  submitGuess.disabled = true;
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessInput.value = '';
  guessInput.disabled = false;
  submitGuess.disabled = false;
  message1.textContent = '';
  message3.textContent = '';
  message2.textContent = '';
  attemptsDisplay.textContent = '';
  stopPaper()
}

function stopPaper() {
  clearInterval(paperInterval);
  const papers = document.querySelectorAll(".paper");
  papers.forEach(paper => paper.remove());
}

function paperWin() {
  const paper = document.createElement("div");
  paper.classList.add("paper");
  const shape = ['circle', 'triangle', 'diamond', 'rectangle'];
  const randomShape = shape[Math.floor(Math.random() * shape.length)];
  paper.classList.add(randomShape);
  const randomSize = Math.floor(Math.random() * 30 + 10);
  paper.style.width = `${randomSize}px`
  paper.style.height = `${randomSize}px`
  const randomX = Math.random() * window.innerWidth;
  const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  const randomDuration = Math.random() * 3+2;
  paper.style.left = `${randomX}px`;
  paper.style.backgroundColor = randomColor;
  paper.style.animationDuration = `${randomDuration}s`;
  document.getElementById("paper-container").appendChild(paper);
  paper.addEventListener("animationend",() => {
    paper.remove();
  });
}

function startPaper() {
  paperInterval = setInterval(paperWin, 100);
  setTimeout(() => {
    stopPaper();
  }, 20000);
}
function Win() {
  startPaper();
}

submitGuess.addEventListener('click', checkGuess);
resetGameButton.addEventListener('click', resetGame);