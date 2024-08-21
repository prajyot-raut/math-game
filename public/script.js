const numberDisplay = document.getElementById("numberDisplay");
let divId = 0;
const input = document.getElementById("inputDisplay");
const enterBtn = document.getElementById("enter");
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const backgroundMusic = document.getElementById("backgroundMusic");
const questionDivs = [];
let score = 0;
let currentLevel = "NormalMode";
let questionTimerID;
const operators = [
  {
    sign: "+",
    method: (a, b) => a + b,
  },
  {
    sign: "-",
    method: (a, b) => a - b,
  },
  {
    sign: "*",
    method: (a, b) => a * b,
  },
  {
    sign: "/",
    method: (a, b) => a / b,
  },
];

numberDisplay.style.height =
  innerHeight -
  document.getElementById("buttonContainerWrapper").clientHeight +
  "px";

function showExpression() {
  const operator = operators[0];
  const { firstNumber, secondNumber } = getNumbers(operator.sign);

  const questionDiv = questionContainer(
    firstNumber,
    operator.sign,
    secondNumber
  );

  numberDisplay.appendChild(questionDiv);
  questionDivs.push({
    element: questionDiv,
    numbers: {
      firstNumber,
      operator,
      secondNumber,
    }
  });
  setTimeout(() => {
    const divTop = numberDisplay.clientHeight - questionDiv.clientHeight;
    const divLeft = randomNumber(innerWidth - questionDiv.clientWidth);

    questionDiv.style.left = divLeft + "px";
    questionDiv.style.transform = "translateY(" + divTop + "px)";

    questionDiv.addEventListener("transitionend", () => {
      gameOver();
    });
  }, 0);

  divId++;
}

function getNumbers(sign) {
  let firstNumber = randomNumber(100);
  let secondNumber = randomNumber(10) + 1;

  switch (sign) {
    case "/":
      firstNumber = firstNumber - (firstNumber % secondNumber);
      break;
    case "-":
      while (firstNumber - secondNumber < 0) {
        firstNumber = randomNumber(100);
        secondNumber = randomNumber(100);
      }
      break;
  }

  return {
    firstNumber,
    secondNumber,
  };
}

function questionContainer(first, operator, second) {
  const containerChildren = `
    <span class="first">${first}</span>
    <br>
    <span class="oprator">${operator}</span>
    <span class="second">${second}</span>
  `;

  const container = document.createElement("div");
  container.className = `questionContainer ${currentLevel}`;
  container.innerHTML = containerChildren;

  return container;
}

function checkAnswer() {
  const userInput = input.value;

  questionDivs.forEach((q, i) => {
    const { firstNumber, secondNumber, operator } = q.numbers;
    const operatorMethod = operator.method
    const answer = operatorMethod(firstNumber, secondNumber).toString();

    if (answer === input.value) {
      q.element.style.opacity = "0";
      document.getElementById("correctMusic").play();
      setTimeout(() => numberDisplay.removeChild(q.element), 500);
      questionDivs.splice(i, 1);
      score += 100;
    }
  });
  input.value = "";
}

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function gameOver() {
  let greet;
  clearInterval(questionTimerID);

  if (score < 500) greet = "Please try harder";
  else if (score < 2000) greet = "Welldone";
  else greet = "Excellent";

  scoreDisplay.innerHTML = greet + "<br> You Scored : " + score + " points";
  endScreen.style.height = "100vh";
}

function startGame() {
  score = 0;
  questionTimerID = setInterval(showExpression, 7000);
  backgroundMusic.play();

  numberDisplay.innerHTML = "";
  startScreen.style.height = "0vh";
  endScreen.style.height = "0vh";
  showExpression();
  input.focus()
}

//adding listeners to the number button
document.querySelectorAll(".numberBtnContainer button").forEach((button) => {
  if (button === enterBtn) return;
  button.addEventListener("click", () => (input.value += button.innerHTML));
});

//adding listener for backspace function
document
  .querySelector("#inputContainer button")
  .addEventListener("click", () => {
    const value = input.value.substr(0, input.value.length - 1);
    input.value = value;
  });

//to check whether user press the enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkAnswer();
});
enterBtn.addEventListener("click", checkAnswer);

// to start the game
document
  .querySelector("#startScreen button")
  .addEventListener("click", startGame);

document
  .querySelector("#endScreen button")
  .addEventListener("click", startGame);
  
// to show the about page
document.querySelectorAll(".infoBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("infoScreen").style.height = "100vh";
  });
});

//to go back to the home page or retry page
document.querySelectorAll(".backBtn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.parentElement.style.height = "0vh";
  });
});

//to go to the settings page
document.querySelectorAll(".settingsBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("settingsScreen").style.height = "100vh";
  });
});

//to switch the game mode
document.querySelectorAll(".modeBtnContainer button").forEach((button) => {
  button.addEventListener("click", (e) => {
    currentLevel = button.textContent + "Mode";
    document.getElementById("modeDisplay").textContent = button.textContent;
    document
      .querySelectorAll(".modeBtnContainer button")
      .forEach((b) => b.classList.remove("activeModeBtn"));
    button.classList.add("activeModeBtn");
  });
});

// to toggle the background music
document.getElementById("musicDisplay").addEventListener("click", (e) => {
  const playIcon = '<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#FFF"><path fill-rule="evenodd" d="M7.563 2.069A.75.75 0 018 2.75v10.5a.75.75 0 01-1.238.57L3.472 11H1.75A1.75 1.75 0 010 9.25v-2.5C0 5.784.784 5 1.75 5h1.723l3.289-2.82a.75.75 0 01.801-.111zM6.5 4.38L4.238 6.319a.75.75 0 01-.488.181h-2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2a.75.75 0 01.488.18L6.5 11.62V4.38zm6.096-2.038a.75.75 0 011.06 0 8 8 0 010 11.314.75.75 0 01-1.06-1.06 6.5 6.5 0 000-9.193.75.75 0 010-1.06v-.001zm-1.06 2.121a.75.75 0 10-1.061 1.061 3.5 3.5 0 010 4.95.75.75 0 101.06 1.06 5 5 0 000-7.07l.001-.001z"></path></svg>'
  const muteIcon = '<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="#FFF"><path fill-rule="evenodd" d="M8 2.75a.75.75 0 00-1.238-.57L3.472 5H1.75A1.75 1.75 0 000 6.75v2.5C0 10.216.784 11 1.75 11h1.723l3.289 2.82A.75.75 0 008 13.25V2.75zM4.238 6.32L6.5 4.38v7.24L4.238 9.68a.75.75 0 00-.488-.18h-2a.25.25 0 01-.25-.25v-2.5a.25.25 0 01.25-.25h2a.75.75 0 00.488-.18zm7.042-1.1a.75.75 0 10-1.06 1.06L11.94 8l-1.72 1.72a.75.75 0 101.06 1.06L13 9.06l1.72 1.72a.75.75 0 101.06-1.06L14.06 8l1.72-1.72a.75.75 0 00-1.06-1.06L13 6.94l-1.72-1.72z"></path></svg>';
  const musicButton = e.currentTarget;

  if(musicButton.innerHTML === playIcon) {
    musicButton.innerHTML = muteIcon;
    backgroundMusic.pause();
  } else {
    musicButton.innerHTML = playIcon;
    backgroundMusic.play();
  }
});