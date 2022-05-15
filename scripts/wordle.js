word = "toddy";
active = true;

addEvent(document, "keydown", function (e) {
  e = e || window.event;
  if (active) {
    handleKeyPress(e.key);
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

function handleKeyPress(key) {
  let activeRow = document.getElementsByClassName("active-row")[0];
  let children = [...activeRow.children];
  if (key === "Backspace") {
    if (
      children.find(function (x) {
        return x.innerHTML !== "";
      })
    ) {
      children[
        children
          .map(function (x) {
            return x.innerHTML !== "";
          })
          .lastIndexOf(true)
      ].innerHTML = "";
    }
  } else if (
    children.find(function (x) {
      return x.innerHTML === "";
    })
  ) {
    if (key === "Enter") {
      alert("Need 5 letters");
    } else {
      children.find((x) => x.innerHTML === "").innerHTML = key;
    }
  } else {
    if (key === "Enter") {
      handleAddRow(activeRow);
      activeRow.classList.remove("active-row");
    }
  }
}

function handleAddRow(activeRow) {
  checkWord(activeRow);
  setNextActiveRow(activeRow);
}

function checkWord(activeRow) {
  [...activeRow.children].forEach(function (x, index) {
    let currentLetter = x.innerHTML;
    x.classList.remove("empty");
    if (currentLetter === word[index]) {
      x.classList.add("correct");
    } else if (word.includes(currentLetter)) {
      x.classList.add("present");
    } else {
      x.classList.add("absent");
    }
  });

  console.log(getEnteredWord(activeRow));
  if (getEnteredWord(activeRow) === word) {
    setTimeout(function () {
      alert("Congratulations!");
    }, 10);
    active = false;
  }
}

function getEnteredWord(activeRow) {
  return [...activeRow.children].reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.innerHTML;
  }, "");
}

function setNextActiveRow(activeRow) {
  if (activeRow.nextElementSibling) {
    activeRow.nextElementSibling.classList.add("active-row");
  } else {
    setTimeout(function () {
      alert("Better luck next time!");
    }, 10);
  }
}

function handleBackspace(activeRow) {}

function handleButtonPress(letter) {
  if (active) {
    handleKeyPress(letter);
  }
}
