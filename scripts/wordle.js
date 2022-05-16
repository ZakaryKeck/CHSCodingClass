window.addEventListener("load", function () {
  let game = new Game();

  addEvent(document, "keydown", function (e) {
    e = e || window.event;
    console.log(e);
    if (game.active) {
      game.handleKeyPress(e.key);
    }
  });

  function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + eventName, callback);
    } else {
      element["on" + eventName] = callback;
    }
  }
});

class Game {
  constructor() {
    this.word = "mango";
    this.active = true;
    this.board = document.getElementById("board");
    this.rows = board.children;
    this.activeRowNum = 0;
    this.activeRow = board.children[0];
  }

  handleKeyPress(key) {
    if (this.keyIsLetter(key)) {
      let firstEmptyTile = this.getFirstEmptyTile();
      if (firstEmptyTile) {
        firstEmptyTile.innerHTML = key;
      }
    } else if (key === "Backspace") {
      let lastFullTile = this.getLastFullTile();
      if (lastFullTile) {
        lastFullTile.innerHTML = "";
      }
    } else if (key === "Enter") {
      if (this.getFirstEmptyTile()) {
        alert("Need 5 letters");
      } else {
        this.handleAddRow();
      }
    }
  }

  handleAddRow() {
    this.checkWord();

    let enteredWord = this.getEnteredWord();
    if (enteredWord === this.word) {
      setTimeout(function () {
        alert("Congratulations!");
      }, 10);
      this.active = false;
    } else if (!this.activeRow.nextElementSibling) {
      setTimeout(function () {
        alert(this.word);
      }, 10);
      this.active = false;
    }

    this.setNextActiveRow();
  }

  checkWord() {
    [...this.activeRow.children].forEach((x, index) => {
      let currentLetter = x.innerHTML;
      x.classList.remove("empty");
      if (currentLetter === this.word[index]) {
        x.classList.add("correct");
      } else if (this.word.includes(currentLetter)) {
        x.classList.add("present");
      } else {
        x.classList.add("absent");
      }
    });
  }

  getEnteredWord() {
    return [...this.activeRow.children].reduce(function (
      previousValue,
      currentValue
    ) {
      return previousValue + currentValue.innerHTML;
    },
    "");
  }

  setNextActiveRow() {
    this.activeRow = this.activeRow.nextElementSibling;
  }

  getLastFullTile() {
    return [...this.activeRow.children].reverse().find(function (x) {
      return x.innerHTML !== "";
    });
  }

  getFirstEmptyTile() {
    return [...this.activeRow.children].find(function (x) {
      return x.innerHTML === "";
    });
  }

  keyIsLetter(key) {
    var letters = /^[A-Za-z]$/;
    return key.match(letters);
  }
}
