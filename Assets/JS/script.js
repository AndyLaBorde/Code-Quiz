// declare global variables
var score = 0;
var questionIndex = 0;
var penalty = 10;

var header = document.getElementById("header")
var timerEl = document.getElementById("seconds");
var container = document.getElementById("container")
var questionDiv = document.getElementById("questionDiv");
var startBtn = document.getElementById("start-button");
// created new element
var olCreate = document.createElement("ol");

// var holdInterval = 0;
// questions array of objects
var questions = [
  {
    title: "Commonly used data types Do not include.",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statment is encolsed with __.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "curly brackets",
  },
  {
    title:
      "String values must be enclosed with _ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
];


var timeLeft = 75;

startBtn.addEventListener("click", function(){
    // timer that counts down from 75
    var timer = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = "Timer: " + timeLeft + " seconds remaining";
            timeLeft--;
            
        } else if (timeLeft === 1) {
            timerEl.textContent = "Timer: " + timeLeft + "second remaining";
            timeLeft--;
        } else {
            timerEl.textContent = "Out of time!"
            // Use clearInterval() to stop the timer
            clearInterval(timer);
        }
    }, 1000);
    renderQuestion(questionIndex); //question index = 0
});

function renderQuestion(questionIndex) {
    questionDiv.textContent = "";
    olCreate.textContent = "";
    // for loop to iterate through the questions array and set variables for question and choices
    for (var i = 0; i < questions.length; i++){
        var liveQuestion = questions[questionIndex].title;
        var liveChoices = questions[questionIndex].choices;
        // render question to page 
        questionDiv.textContent = liveQuestion;

    }
    // for each of question choices create li and append element in choices
    liveChoices.forEach(function (newItem){ 
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionDiv.appendChild(olCreate);
        olCreate.appendChild(listItem);
        listItem.addEventListener("click", compare);
    })
}

function compare(event) {

    var element = event.target;
    if (element.matches("li")) {
        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("id", "answerDiv");

        // if correct
        if (element.textContent ===questions[questionIndex].answer) {
            score ++;
            answerDiv.textContent = "Correct!! the answer is: " + questions[questionIndex].answer;
            // if incorrect
        } else {
            timeLeft = timeLeft - penalty;
            answerDiv.textContent = "Wrong!! The correct answer is: " + questions[questionIndex].answer + "\nYou have been docked " + penalty + " seconds..";
        }
    }
    questionIndex ++;

    if (questionIndex >= questions.length){
        answerDiv.textContent = "End of Quiz!";
        finish();
        
    } else {
        renderQuestion(questionIndex);
    }
    questionDiv.appendChild(answerDiv);
}

// will append last page
function finish () {
    questionDiv.textContent = "";
    timerEl.textContent = "";
    
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "You finished!!";

    questionDiv.appendChild(createH1);
    
    var createP = document.createElement("p");
    createP.setAttribute("p", "createP");
    createP.textContent = "You got " + score + "/" + questions.length + " correct!!"   

    questionDiv.appendChild(createP);

    if (timeLeft >= 0){

    }
}

