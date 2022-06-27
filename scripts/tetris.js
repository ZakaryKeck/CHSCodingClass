let tetrisGame;
let squares;

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;

const lTetromino = [
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
  [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
];

const zTetromino = [
  [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
  [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
];

const tTetromino = [
  [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
  [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
  [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
];

const oTetromino = [
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
];

const iTetromino = [
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
];

// const letterZTetromino = [
//   [
//     0,
//     1,
//     2,
//     3,
//     GRID_WIDTH + 2,
//     GRID_WIDTH * 2 + 1,
//     GRID_WIDTH * 3,
//     GRID_WIDTH * 3 + 1,
//     GRID_WIDTH * 3 + 2,
//     GRID_WIDTH * 3 + 3,
//   ],
// ];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

const colors = ["darkblue", "darkred", "darkviolet", "green", "khaki"];

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

document.addEventListener("DOMContentLoaded", () => {
  tetrisGame = new TetrisGame();
  document.addEventListener("keydown", (e) => {
    if(tetrisGame.active){
      tetrisGame.handleKeyPress(e);
    }
  });

  tetrisGame.gameBoard = document.getElementById("tetris-grid");
  for (let i = 0; i < GRID_SIZE; i++) {
    let gridElement = document.createElement("div");
    gridElement.classList.add("square");
    tetrisGame.gameBoard.appendChild(gridElement);
  }

  // set base of grid
  for (let i = 0; i < GRID_WIDTH; i++) {
    let gridElement = document.createElement("div");
    gridElement.setAttribute("class", "base");
    tetrisGame.gameBoard.appendChild(gridElement);
  }

  tetrisGame.squares = Array.from(tetrisGame.gameBoard.querySelectorAll("div"));
});

class TetrisGame {
  constructor() {
    this.index = Math.floor(Math.random() * theTetrominoes.length);
    this.currentRotation = 0;
    this.currentPiece = theTetrominoes[this.index][this.currentRotation];
    this.currentPosition = 4;
    this.speed = 800;
    this.score = 0;
    this.lines = 0;
    this.timerId = 0;
    this.active = false;
  }

  start() {
    if (!this.active) {
      this.active = true;
      this.timerId = setInterval(() => {
        this.moveDown();
      }, this.speed);
    }
  }

  handleKeyPress(e) {
    if (e.key === "ArrowRight") {
      this.moveRight();
    } else if (e.key === "ArrowUp") {
      this.rotate();
    } else if (e.key === "ArrowLeft") {
      this.moveLeft();
    } else if (e.key === "ArrowDown") {
      this.moveDown();
    }
  }

  draw() {
    this.currentPiece.forEach((index) => {
      this.squares[this.currentPosition + index].classList.add("block");
      this.squares[this.currentPosition + index].style.backgroundColor =
        colors[this.index];
    });
  }

  undraw() {
    this.currentPiece.forEach((index) => {
      this.squares[this.currentPosition + index].classList.remove("block");
      this.squares[this.currentPosition + index].style.backgroundColor = "";
    });
  }

  rotate() {
    this.undraw();
    this.currentRotation = (this.currentRotation + 1) % 4;
    this.currentPiece = theTetrominoes[this.index][this.currentRotation];
    this.draw();
  }

  moveDown() {
    this.undraw();
    this.currentPosition += GRID_WIDTH;
    this.draw();

    this.checkBlocksAtBase();
    this.checkScore();
    this.checkGameOver();
  }

  moveLeft() {
    const isAtLeftEdge = this.currentPiece.some(
      (index) => (this.currentPosition + index) % GRID_WIDTH === 0
    );

    const isAtBlockEdge = this.currentPiece.some((index) =>
      this.squares[this.currentPosition + index - 1].classList.contains(
        "frozen-block"
      )
    );

    if (!isAtLeftEdge && !isAtBlockEdge) {
      this.undraw();
      this.currentPosition -= 1;
      this.draw();
    }
  }

  moveRight() {
    const isAtRightEdge = this.currentPiece.some(
      (index) => (this.currentPosition + index) % GRID_WIDTH === GRID_WIDTH - 1
    );

    const isAtBlockEdge = this.currentPiece.some((index) =>
      this.squares[this.currentPosition + index + 1].classList.contains(
        "frozen-block"
      )
    );

    if (!isAtRightEdge && !isAtBlockEdge) {
      this.undraw();
      this.currentPosition += 1;
      this.draw();
    }
  }

  checkBlocksAtBase() {
    if (
      this.currentPiece.some(
        (index) =>
          this.squares[
            this.currentPosition + index + GRID_WIDTH
          ].classList.contains("base") ||
          this.squares[
            this.currentPosition + index + GRID_WIDTH
          ].classList.contains("frozen-block")
      )
    ) {
      // make it frozen-block
      this.currentPiece.forEach((index) =>
        this.squares[index + this.currentPosition].classList.add("frozen-block")
      );
      // start a new tetromino falling
      this.index = Math.floor(Math.random() * theTetrominoes.length);
      this.currentPiece = theTetrominoes[this.index][this.currentRotation];
      this.currentPosition = 4;
      this.draw();
    }
  }

  checkScore() {
    for (
      let currentIndex = 0;
      currentIndex < GRID_SIZE;
      currentIndex += GRID_WIDTH
    ) {
      const row = [
        currentIndex,
        currentIndex + 1,
        currentIndex + 2,
        currentIndex + 3,
        currentIndex + 4,
        currentIndex + 5,
        currentIndex + 6,
        currentIndex + 7,
        currentIndex + 8,
        currentIndex + 9,
      ];
      if (
        row.every((index) =>
          this.squares[index].classList.contains("frozen-block")
        )
      ) {
        this.score += 10;
        this.lines += 1;
        this.speed -= 10;
        document.getElementById("score-display").innerHTML = this.score;
        document.getElementById("lines-score").innerHTML = this.lines;
        row.forEach((index) => {
          this.squares[index].style.backgroundColor = "";
          this.squares[index].classList.remove("frozen-block");
          this.squares[index].classList.remove("block");
        });
        //splice array
        let grid = document.getElementById("tetris-grid");
        const squaresRemoved = this.squares.splice(currentIndex, GRID_WIDTH);
        this.squares = squaresRemoved.concat(this.squares);
        this.squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  checkGameOver() {
    if (
      this.currentPiece.some((index) =>
        this.squares[this.currentPosition + index].classList.contains(
          "frozen-block"
        )
      )
    ) {
      this.active = false;
      clearInterval(this.timerId);
    }
  }
}
