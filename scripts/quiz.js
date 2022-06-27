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
    new Answer("go HAM", "barbarian"),
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
];

class Quiz {
  constructor() {
    this.questions = questions;
    this.currentQuestion = 0;
    this.scores = new Scores();
    this.renderQuestion();
  }

  addAnswer(option) {
    this.scores[option]++;
  }

  nextQuestion() {
    this.addScore();
    if (this.currentQuestion === this.questions.length - 1) {
      this.submit();
    } else {
      this.currentQuestion = this.currentQuestion + 1;
      this.renderQuestion();
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
      [
        { axis: "Fighter", value: this.scores.fighter / scoreTotal },
        { axis: "Paladin", value: this.scores.paladin / scoreTotal },
        { axis: "Bard", value: this.scores.bard / scoreTotal },
        { axis: "Sorcerer", value: this.scores.sorcerer / scoreTotal },
        { axis: "Barbarian", value: this.scores.barbarian / scoreTotal },
        { axis: "Rogue", value: this.scores.rogue / scoreTotal },
        { axis: "Druid", value: this.scores.druid / scoreTotal }
      ],
    ];
    document.getElementById("quiz").innerHTML = "";
    
    RadarChart(".quiz", this.data);
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
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////View Below Code at Your Own Risk/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var margin = { top: 100, right: 100, bottom: 100, left: 100 },
  width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
  height = Math.min(
    width,
    window.innerHeight - margin.top - margin.bottom - 20
  );

var color = d3.scale.ordinal().range(["#00A0B0"]);

var options = {
  w: width,
  h: height,
  margin: margin,
  maxValue: 0.5,
  levels: 5,
  color: color,
};

function RadarChart(id, data) {
  var cfg = {
    w: 600, //Width of the circle
    h: 600, //Height of the circle
    margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
    levels: 3, //How many levels or inner circles should there be drawn
    maxValue: 0, //What is the value that the biggest circle will represent
    labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
    opacityArea: 0.35, //The opacity of the area of the blob
    dotRadius: 4, //The size of the colored circles of each blog
    opacityCircles: 0.1, //The opacity of the circles of each blob
    strokeWidth: 2, //The width of the stroke around each blob
    roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
    color: d3.scale.category10(), //Color function
  };

  //Put all of the options into a variable called cfg
  if ("undefined" !== typeof options) {
    for (var i in options) {
      if ("undefined" !== typeof options[i]) {
        cfg[i] = options[i];
      }
    } //for i
  } //if

  //If the supplied maxValue is smaller than the actual one, replace by the max in the data
  var maxValue = Math.max(
    cfg.maxValue,
    d3.max(data, function (i) {
      return d3.max(
        i.map(function (o) {
          return o.value;
        })
      );
    })
  );

  var allAxis = data[0].map(function (i, j) {
      return i.axis;
    }), //Names of each axis
    total = allAxis.length, //The number of different axes
    radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
    Format = d3.format("%"), //Percentage formatting
    angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

  //Scale for the radius
  var rScale = d3.scale.linear().range([0, radius]).domain([0, maxValue]);

  /////////////////////////////////////////////////////////
  //////////// Create the container SVG and g /////////////
  /////////////////////////////////////////////////////////

  //Remove whatever chart with the same id/class was present before
  d3.select(id).select("svg").remove();

  //Initiate the radar chart SVG
  var svg = d3
    .select(id)
    .append("svg")
    .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr("class", "radar" + id);
  //Append a g element
  var g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (cfg.w / 2 + cfg.margin.left) +
        "," +
        (cfg.h / 2 + cfg.margin.top) +
        ")"
    );

  /////////////////////////////////////////////////////////
  ////////// Glow filter for some extra pizzazz ///////////
  /////////////////////////////////////////////////////////

  //Filter for the outside glow
  var filter = g.append("defs").append("filter").attr("id", "glow"),
    feGaussianBlur = filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur"),
    feMerge = filter.append("feMerge"),
    feMergeNode_1 = feMerge.append("feMergeNode").attr("in", "coloredBlur"),
    feMergeNode_2 = feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  /////////////////////////////////////////////////////////
  /////////////// Draw the Circular grid //////////////////
  /////////////////////////////////////////////////////////

  //Wrapper for the grid & axes
  var axisGrid = g.append("g").attr("class", "axisWrapper");

  //Draw the background circles
  axisGrid
    .selectAll(".levels")
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append("circle")
    .attr("class", "gridCircle")
    .attr("r", function (d, i) {
      return (radius / cfg.levels) * d;
    })
    .style("fill", "#CDCDCD")
    .style("stroke", "#CDCDCD")
    .style("fill-opacity", cfg.opacityCircles)
    .style("filter", "url(#glow)");

  //Text indicating at what % each level is
  axisGrid
    .selectAll(".axisLabel")
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append("text")
    .attr("class", "axisLabel")
    .attr("x", 4)
    .attr("y", function (d) {
      return (-d * radius) / cfg.levels;
    })
    .attr("dy", "0.4em")
    .style("font-size", "10px")
    .attr("fill", "#737373")
    .text(function (d, i) {
      return Format((maxValue * d) / cfg.levels);
    });

  /////////////////////////////////////////////////////////
  //////////////////// Draw the axes //////////////////////
  /////////////////////////////////////////////////////////

  //Create the straight lines radiating outward from the center
  var axis = axisGrid
    .selectAll(".axis")
    .data(allAxis)
    .enter()
    .append("g")
    .attr("class", "axis");
  //Append the lines
  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", function (d, i) {
      return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("y2", function (d, i) {
      return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .attr("class", "line")
    .style("stroke", "white")
    .style("stroke-width", "2px");

  //Append the labels at each axis
  axis
    .append("text")
    .attr("class", "legend")
    .style("font-size", "11px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("x", function (d, i) {
      return (
        rScale(maxValue * cfg.labelFactor) *
        Math.cos(angleSlice * i - Math.PI / 2)
      );
    })
    .attr("y", function (d, i) {
      return (
        rScale(maxValue * cfg.labelFactor) *
        Math.sin(angleSlice * i - Math.PI / 2)
      );
    })
    .text(function (d) {
      return d;
    })
    .call(wrap, cfg.wrapWidth);

  /////////////////////////////////////////////////////////
  ///////////// Draw the radar chart blobs ////////////////
  /////////////////////////////////////////////////////////

  //The radial line function
  var radarLine = d3.svg.line
    .radial()
    .interpolate("linear-closed")
    .radius(function (d) {
      return rScale(d.value);
    })
    .angle(function (d, i) {
      return i * angleSlice;
    });

  if (cfg.roundStrokes) {
    radarLine.interpolate("cardinal-closed");
  }

  //Create a wrapper for the blobs
  var blobWrapper = g
    .selectAll(".radarWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarWrapper");

  //Append the backgrounds
  blobWrapper
    .append("path")
    .attr("class", "radarArea")
    .attr("d", function (d, i) {
      return radarLine(d);
    })
    .style("fill", function (d, i) {
      return cfg.color(i);
    })
    .style("fill-opacity", cfg.opacityArea)
    .on("mouseover", function (d, i) {
      //Dim all blobs
      d3.selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", 0.1);
      //Bring back the hovered over blob
      d3.select(this).transition().duration(200).style("fill-opacity", 0.7);
    })
    .on("mouseout", function () {
      //Bring back all blobs
      d3.selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", cfg.opacityArea);
    });

  //Create the outlines
  blobWrapper
    .append("path")
    .attr("class", "radarStroke")
    .attr("d", function (d, i) {
      return radarLine(d);
    })
    .style("stroke-width", cfg.strokeWidth + "px")
    .style("stroke", function (d, i) {
      return cfg.color(i);
    })
    .style("fill", "none")
    .style("filter", "url(#glow)");

  //Append the circles
  blobWrapper
    .selectAll(".radarCircle")
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarCircle")
    .attr("r", cfg.dotRadius)
    .attr("cx", function (d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("cy", function (d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style("fill", function (d, i, j) {
      return cfg.color(j);
    })
    .style("fill-opacity", 0.8);

  /////////////////////////////////////////////////////////
  //////// Append invisible circles for tooltip ///////////
  /////////////////////////////////////////////////////////

  //Wrapper for the invisible circles on top
  var blobCircleWrapper = g
    .selectAll(".radarCircleWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarCircleWrapper");

  //Append a set of invisible circles on top for the mouseover pop-up
  blobCircleWrapper
    .selectAll(".radarInvisibleCircle")
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarInvisibleCircle")
    .attr("r", cfg.dotRadius * 1.5)
    .attr("cx", function (d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("cy", function (d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", function (d, i) {
      newX = parseFloat(d3.select(this).attr("cx")) - 10;
      newY = parseFloat(d3.select(this).attr("cy")) - 10;

      tooltip
        .attr("x", newX)
        .attr("y", newY)
        .text(Format(d.value))
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseout", function () {
      tooltip.transition().duration(200).style("opacity", 0);
    });

  //Set up the small tooltip for when you hover over a circle
  var tooltip = g.append("text").attr("class", "tooltip").style("opacity", 0);

  /////////////////////////////////////////////////////////
  /////////////////// Helper Function /////////////////////
  /////////////////////////////////////////////////////////

  //Taken from http://bl.ocks.org/mbostock/7555321
  //Wraps SVG text
  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  } //wrap
} //RadarChart
