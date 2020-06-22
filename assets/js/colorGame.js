let numSquares = 6;
let colors = generateColors(numSquares);
let pickedColor = pickColor();
let squares = document.querySelectorAll(".square");
const rgbHeader = document.getElementById("rgbHeader");
let messageDisplay = document.querySelector("#messageDisplay");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let easyButton = document.querySelector("#easy");
let hardButton = document.querySelector("#hard");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  //event listeners for mode buttons (easy/hard)
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("difficultySelected");
      modeButtons[1].classList.remove("difficultySelected");
      this.classList.add("difficultySelected");

      //ternary operator
      this.textContent === "EASY" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
}
function setUpSquares() {
  //setting up event listeners for all squares
  for (let i = 0; i < squares.length; i++) {
    //add click listeners to squares
    squares[i].addEventListener("click", function () {
      //grab the clicked square's color
      let clickedColor = this.style.backgroundColor;

      //compare it with pickedColor
      if (pickedColor === clickedColor) {
        messageDisplay.textContent = "Correct";
        h1.style.backgroundColor = clickedColor;
        changeColors(clickedColor);
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "black";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  colors = generateColors(numSquares);
  //pick a color from them
  pickedColor = pickColor();
  rgbHeader.textContent = "RGB" + pickedColor.slice(3);
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  //change header color to match picked color
  rgbHeader.textContent = "RGB" + pickedColor.slice(3);
  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function () {
  reset();
});

function changeColors(color) {
  //loop thru all squares
  for (let i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateColors(size) {
  let arr = [];
  for (let j = 0; j < size; j++) {
    arr[j] = randomColor();
  }
  return arr;
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
