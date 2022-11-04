// declare global variables
var score = 0;
var questionIndex = 0;
var penalty = 10;
var scores = []
var header = document.getElementById("header");
var highScoreEl = document.getElementById("highScore")
var timerEl = document.getElementById("seconds");
var container = document.getElementById("container")
var questionDiv = document.getElementById("questionDiv");
var highScores = document.getElementById("highScores");

var startBtn = document.getElementById("start-button");
// created new element
var olCreate = document.createElement("ol");
var resetBtn = document.getElementById("resetBtn");
var resetEl = document.getElementById("resetBox");
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

    // timer that counts down from 75
function startQuiz() {
    
    var timer = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = "Timer: " + timeLeft + " seconds remaining";
            timeLeft--;
            
        } else if (timeLeft === 1) {
            timerEl.textContent = "Timer: " + timeLeft + "second remaining";
            timeLeft--;
            // clearing interval if time runs out
        } else {
            timerEl.textContent = "Out of time!"
            // Use clearInterval() to stop the timer
            clearInterval(timer);
        }
        // clearing intervasl if user answers all the questions
        if (questionIndex >= questions.length) {
            timerEl.textContent = "Finished with time to spare!";
            clearInterval(timer);
        }    
        // Use clearInterval() to stop the timer
        
    }, 1000);
    renderQuestion(questionIndex); //question index = 0
}

startBtn.addEventListener("click", startQuiz)

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
        listItem.setAttribute("type", "A");
        listItem.style.backgroundColor = 'grey';
        listItem.style.borderRadius = '5px';
        listItem.style.padding = '10px';
        listItem.style.margin = '10px';
        questionDiv.appendChild(olCreate);
        olCreate.appendChild(listItem);
        listItem.addEventListener("click", compare);
    })
}

// compares user selection to "answer" in questions array of objects
// cuts off timer if you finish all questions
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
        answerDiv.textContent = "";
        finish();
        
    } else {
        renderQuestion(questionIndex);
    }
    questionDiv.appendChild(answerDiv);
}

// will append last page
// add a restart button that refreshes the page last page
function finish () {
    questionDiv.textContent = "";
    timerEl.textContent = "";
    
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "You finished!!";
    
    questionDiv.appendChild(createH1);
    
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    createP.textContent = "You got " + score + "/" + questions.length + " correct!!"   
    
    questionDiv.appendChild(createP); 

    createForm();
}

function createForm(){
        
        // creates form element to hold input and submit button
        var createForm = document.createElement("form");
        createForm.setAttribute("id", "createForm");
        // create input element and provide attributes and styling
        var createInput = document.createElement("input");
        createInput.setAttribute("id", "createInput");
        createInput.setAttribute("name", "userName");
        createInput.setAttribute("placeholder", "Enter your initials...")
        // submit button for form
        var createBtn = document.createElement("button");
        createBtn.setAttribute("id", "createBtn");
        createBtn.setAttribute("type", "submit");
        createBtn.textContent = "Save your score!";
        
        // appending created elements to page
        createForm.appendChild(createInput);
        createForm.appendChild(createBtn);
        questionDiv.append(createForm);

        var submitBtn = document.getElementById("createBtn");
        submitBtn.addEventListener("click", function(event){
            event.preventDefault();
            saveHighScore();
        });
}

function saveHighScore() {
    //set value of final score
    var finalScore = score / questions.length + timeLeft;
    var userName = document.getElementById("createInput").value;
    console.log("Username:" + userName);
    console.log("Score" + finalScore);
    var highScoreObject = {
        initals: userName,
        score: finalScore,
    };
    scores.push(highScoreObject);
    localStorage.setItem("highScores", JSON.stringify(scores));
    viewHighScore();
}
// Is this variable needed or how do i reference this data when view high scores is selected on the website.
// var viewHighScore = document.getElementById("viewHighScore")
function viewHighScore() {
    // highScores.innerHTML= "";
    var localScoresStorage = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(localScoresStorage);
    for (var i = 0; i < localScoresStorage.length; i++) {
    var scoresDiv = document.createElement("div");
    scoresDiv.textContent = `${localScoresStorage[i].initals}: ${localScoresStorage[i].score}`;
    
    questionDiv.appendChild(scoresDiv);
    }
    // create a reset button 
    var createResetBtn = document.createElement('button');
    createResetBtn.setAttribute("id", "resetBtn");
    questionDiv.append(createResetBtn);
    createResetBtn.textContent = "Retry Quiz"
    // adds function to buitton click
    createResetBtn.addEventListener("click",function(){
        score = 0;
        questionIndex = 0;
        timeLeft = 75; 
        startQuiz();
    });
}
// shows high score onm main page when clicked
highScoreEl.addEventListener("click", function(){
    viewHighScore();
})
