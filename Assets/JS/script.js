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

var score = 0;
var questionIndex = 0;
var choices = document.querySelector(".choices");
var title = document.querySelector(".title");

function runQuiz () {
    // creat a loop to iterate through your array of objects
    
    title.textContent = questions[questionIndex].title;
    
    for (var i = 0; i < questions[questionIndex].choices.length; i++){
        var button = document.createElement("button");
        button.textContent = questions[questionIndex].choices[i];
        choices.appendChild(button);
    }
    function nextIndex () {
        questionIndex ++;
        runQuiz();
    }
    button.addEventListener("click", nextIndex);
    // timer that counts down from 60
    function countDown() {
        var timerEl = document.getElementById("seconds"); 
        var timeLeft = 75;
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
    }
    countDown();   
}

var startBtn = document.getElementById("start-button").addEventListener("click", runQuiz); 

