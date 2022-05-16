let game;
window.addEventListener("load", function () {
  game = new Game();

  addEvent(document, "keydown", function (e) {
    e = e || window.event;

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
    this.word = "vibey";
    this.active = true;
    this.activeRow = document.getElementById("board").children[0];
  }

  handleKeyPress(key) {
    if (this.isLetter(key)) {
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
        this.addRow();
      }
    }
  }

  addRow() {
    this.checkWord();
    this.setNextActiveRow();
  }

  checkWord() {
    let guess = this.getEnteredWord();
    let copy = this.word;

    [...guess].forEach((currentLetter, index) => {
      if (currentLetter === copy[index]) {
        this.activeRow.children[index].classList.remove("empty");
        this.activeRow.children[index].classList.add("correct");
        guess = guess.substring(0, index) + "-" + guess.substring(index + 1);
        copy = copy.substring(0, index) + "-" + copy.substring(index + 1);
      }
    });

    [...guess].forEach((currentLetter, index) => {
      this.activeRow.children[index].classList.remove("empty");

      if (currentLetter === "-") {
        this.activeRow.children[index].classList.add("absent");
      } else if (copy.includes(currentLetter)) {
        this.activeRow.children[index].classList.add("present");
        guess = guess.substring(0, index) + "-" + guess.substring(index + 1);
        copy = copy.replace(currentLetter, "-");
      } else {
        this.activeRow.children[index].classList.add("absent");
      }
    });

    if (this.getEnteredWord() === this.word) {
      setTimeout(function () {
        alert("Congratulations!");
      }, 10);

      this.active = false;
    }
  }

  /*checkWord() {
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

    let enteredWord = this.getEnteredWord();

    if (enteredWord === this.word) {
      setTimeout(function () {
        alert("Congratulations!");
      }, 10);

      this.active = false;
    }
  }*/

  isPresent(currentLetter, index) {}

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
    if (!this.activeRow.nextElementSibling) {
      setTimeout(() => {
        alert(this.word);
      }, 10);

      this.active = false;
    } else {
      this.activeRow = this.activeRow.nextElementSibling;
    }
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

  isLetter(key) {
    var letterRegex = /^[A-Za-z]$/;
    return key.match(letterRegex);
  }
}
