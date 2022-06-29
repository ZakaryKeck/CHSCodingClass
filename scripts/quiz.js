class Question {
  constructor(question, answers) {
    this.question = question;
    this.answers = answers;
  }
}

class Answer {
  constructor(answer, score) {
    this.answer = answer;
    this.score = score;
  }
}

class Scores {
  constructor() {
    this.barbarian = 0;
    this.bard = 0;
    this.druid = 0;
    this.fighter = 0;
    this.paladin = 0;
    this.rogue = 0;
    this.sorcerer = 0;
  }
}

let questions = [
  new Question("How strong are you?", [
    new Answer("Dummy strong", "barbarian"),
    new Answer("Very strong", "fighter"),
    new Answer("Old and frail", "sorcerer"),
    new Answer("The lord is my strength", "paladin"),
  ]),
  new Question("What is the best way to improve yourself?", [
    new Answer("Hardworking study", "sorcerer"),
    new Answer("Physical training", "fighter"),
    new Answer("Spend time in nature", "druid"),
    new Answer("Spend time being spiritual", "paladin"),
  ]),
  new Question("What is the most important?", [
    new Answer("Love", "bard"),
    new Answer("Honor", "paladin"),
    new Answer("Wisdom", "sorcerer"),
    new Answer("Wealth", "rogue"),
  ]),
  new Question("In a fight it is better to:", [
    new Answer("Go HAM", "barbarian"),
    new Answer("Use the terrain to your advantage", "druid"),
    new Answer("Resolve the conflict with charisma", "bard"),
    new Answer("Resolve the conflict with deception", "rogue"),
  ]),
  new Question("Choose the most true:", [
    new Answer("Man is stronger than nature", "barbarian"),
    new Answer("Nature is stronger than man", "fighter"),
    new Answer("Technology is stronger than nature", "sorcerer"),
    new Answer("Nature is stronger than technology", "druid"),
  ]),
  new Question("The best reason to work out is:", [
    new Answer("To look better", "bard"),
    new Answer("To be healthier", "fighter"),
    new Answer("Keep the mind healthy", "sorcerer"),
    new Answer("To experience nature", "druid"),
  ]),
  new Question("Which of these pranks is funniest?", [
    new Answer("Tackling someone into a pool", "barbarian"),
    new Answer("Devious licks", "rogue"),
    new Answer("Fake shocking gum", "sorcerer"),
    new Answer("Fill someone's locker with plants", "druid"),
  ]),
  new Question("I can't come up with anymore questions, so pick one", [
    new Answer("bard", "bard"),
    new Answer("druid", "druid"),
    new Answer("rogue", "rogue"),
    new Answer("paladin", "paladin"),
  ]),
  new Question("I can't come up with anymore questions, so pick one", [
    new Answer("barbarian", "barbarian"),
    new Answer("fighter", "fighter"),
    new Answer("sorcerer", "sorcerer"),
    new Answer("druid", "druid"),
  ]),
];

class Quiz {
  constructor() {
    this.questions = questions;
    this.currentQuestion = 0;
    this.scores = new Scores();
  }

  addAnswer(option) {
    this.scores[option]++;
  }

  nextQuestion() {
    this.addScore();
    if (this.currentQuestion === this.questions.length - 1) {
      this.submit();
    } else {
      this.currentQuestion++;
      this.renderQuestion();
      if(this.currentQuestion === this.questions.length - 1){
        document.getElementById("nextButton").innerHTML = "Submit";
      }
    }
  }

  renderQuestion() {
    let nextQuestion = this.questions[this.currentQuestion];
    let questionElement = document.getElementById("question");

    let answer0Element = document.getElementById("answer0");
    let answer1Element = document.getElementById("answer1");
    let answer2Element = document.getElementById("answer2");
    let answer3Element = document.getElementById("answer3");

    questionElement.innerHTML = nextQuestion.question;
    answer0Element.children[1].innerHTML = nextQuestion.answers[0].answer;
    answer1Element.children[1].innerHTML = nextQuestion.answers[1].answer;
    answer2Element.children[1].innerHTML = nextQuestion.answers[2].answer;
    answer3Element.children[1].innerHTML = nextQuestion.answers[3].answer;
  }

  submit() {
    var scoreTotal = Object.entries(quiz.scores).reduce(
      (prev, curr) => prev + curr[1],
      0
    );
    
    this.data = [
        { name: "Fighter", value: this.scores.fighter || 0, color: "#ffe135"},
        { name: "Paladin", value: this.scores.paladin || 0, color: "#ffe135"},
        { name: "Bard", value: this.scores.bard || 0, color: "#ffe135"},
        { name: "Sorcerer", value: this.scores.sorcerer || 0, color: "#ffe135"},
        { name: "Barbarian", value: this.scores.barbarian || 0, color: "#ffe135"},
        { name: "Rogue", value: this.scores.rogue || 0, color: "#ffe135"},
        { name: "Druid", value: this.scores.druid || 0, color: "#ffe135"}
    ];

    document.getElementById("quiz").innerHTML = "";
    
    BuildChart(this.data);
  }

  addScore() {
    let answer0Radio = document.getElementById("answer0").children[0];
    let answer1Radio = document.getElementById("answer1").children[0];
    let answer2Radio = document.getElementById("answer2").children[0];
    let answer3Radio = document.getElementById("answer3").children[0];

    let currentQuestion = this.questions[this.currentQuestion];
    if (answer0Radio.checked) {
      this.addAnswer(currentQuestion.answers[0].score);
    }
    if (answer1Radio.checked) {
      this.addAnswer(currentQuestion.answers[1].score);
    }
    if (answer2Radio.checked) {
      this.addAnswer(currentQuestion.answers[2].score);
    }
    if (answer3Radio.checked) {
      this.addAnswer(currentQuestion.answers[3].score);
    }

    answer0Radio.checked = false;
    answer1Radio.checked = false;
    answer2Radio.checked = false;
    answer3Radio.checked = false;
  }
}

let quiz;
window.addEventListener("load", function () {
  quiz = new Quiz();
  quiz.renderQuestion();
});


function BuildChart(data){
  const margin = { top: 36, right: 1, bottom: 30, left: 100 };
  const width = 600 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleBand().rangeRound([height, 0], 0);

  var xAxis = d3.axisBottom().scale(x).ticks(5);
  x.domain([0, 10]);

  var yAxis = d3.axisLeft().scale(y).tickSize(0);
  y.domain(
    data.map(function (d) {
      return d.name;
    })
  );

  var svg = d3
    .select("#quiz")
    .append("svg:svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .selectAll("bar")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "bar-group")
    .append("rect")
    .style("fill", "#2e4a62")
    .attr("y", (d) => y(d.name) + margin.top/2)
    .attr("height", 30)
    .attr("x", (d) => x(0))
    .attr("width", (d) => x(d.value));

  svg
    .selectAll(".bar-group")
    .append("text")
    .text((d) => d.value)
    .attr("fill", "black")
    .attr("x", (d) => x(d.value) + 12)
    .attr("y", (d) => y(d.name) + margin.top )
    .style("font", "16px sans-serif");

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-0.5em")
    .style("font", "16px sans-serif");

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dy", "1em")
    .style("font", "16px sans-serif");
}
