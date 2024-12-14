let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#Reset-Game");
let new_btn = document.querySelector("#New-Game");
let msg = document.querySelector(".winner");

let turnO = true; //PlayerX, PlayerO
let count = 0; //it is used to check draw condition

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (turnO) {
      turnO = false;
      box.innerText = "O";
    } else {
      turnO = true;
      box.innerText = "X";
    }
    box.disabled = true;
    checkWinner();

    let isWinner = checkWinner(); //we get true if there is a winner because we return true in checkwinner();

    if (count === 9 && !isWinner) {
      draw();
    }
  });
});

const boxdisable = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const boxenable = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  boxenable();
  msg.innerText = "";
  count = 0;
};

const showWinner = (evt) => {
  if (evt === "O") {
    msg.innerText = `"Congratulations, Winner is ${`Player 1 - "O"`}`;
  } else {
    msg.innerText = `"Congratulations, Winner is ${`Player 2 - "X"`}`;
  }
  boxdisable();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        return true;
      }
    }
  }
};

const draw = () => {
  msg.innerText = "Draw, No one Wins....";
};

new_btn.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);
