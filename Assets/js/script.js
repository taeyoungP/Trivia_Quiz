// Questions
var question1 = {
    question: "What's my favorite drink?",
    answers: ["Coffee", "Tea", "Juice", "Water"],
    answer: "Tea"
}

var question2 = {
    question: "What's 1+1?",
    answers: ["4", "0", "3", "2"],
    answer: "2"
}

var question3 = {
    question: "What is 10-4?",
    answers: ["3", "4", "6", "0"],
    answer: "6"
}

var questionList = [question1, question2, question3];

var startButtonEl = document.querySelector("#startButton");
var scoreEl = document.querySelector("#scorebox");
var timerEl = document.querySelector("#countdown");
var playboxEl = document.querySelector("#playbox");

var countdown = 0;
var score = 0;
var timer;
var correct;
var i = 0;

var players = [];

//starting Game
function startGame() {
    startButtonEl.setAttribute("style", "display: none;");
    countdown = 60;
    startCountDown();
    play(i);
}

function startCountDown() {
    timer = setInterval(function () {

        countdown--;

        timerEl.textContent = "Time: " + countdown;
        if (countdown === 0) { // Time Over
            clearInterval(timer);
            var timeOver = document.createElement("h1");
            var endScore = document.createElement("h2");
            timeOver.textContent = "Time Over!"
            endScore.textContent = "Your total Score: " + score;
            playboxEl.textContent = "";
            playboxEl.appendChild(timeOver);
            playboxEl.appendChild(endScore);
            
            userForm();

            
        }
    }, 1000);
}

function userForm () {
    var form = document.createElement("form");
    var name = document.createElement("input");
    var submit = document.createElement("button");
 
    submit.textContent = "submit";
    submit.setAttribute("id", "submit");

    playboxEl.appendChild(form);
    form.appendChild(name);
    form.appendChild(submit);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        var nameText = name.value.trim();

        if(nameText === "") {
            alert("Please input player name.");
        } else{
            var player = {
                Name: nameText,
                Score: score
            };
            players.push(player);
            localStorage.setItem("players", JSON.stringify(players));
            form.remove();

        }
        //store name and score
        //render
        //submit.onclick = function(){
        //    playboxEl.textContent = "Thank you! Your score has been recorded!";
        //}

    })




}

function play(i) {
    if (i === questionList.length) {
        clearInterval(timer);
        var thankyou = document.createElement("h1");
        var endScore = document.createElement("h2");
        thankyou.textContent = "Thank you for playing!"
        endScore.textContent = "Your total Score: " + score;
        playboxEl.textContent = "";
        playboxEl.appendChild(thankyou);
        playboxEl.appendChild(endScore);

        userForm();
        return;
    }

    playboxEl.textContent = questionList[i].question;
    var orderedList = document.createElement("ol");
    orderedList.setAttribute("id", "optionList");
    //Create Buttons for every options
    for (var j = 0; j < questionList[i].answers.length; j++) {
        var option = document.createElement("li");
        var optionBtn = document.createElement("button");
        option.setAttribute("class", "optionBtn");
        option.setAttribute("id", "option" + j);
        optionBtn.textContent = questionList[i].answers[j];
        option.appendChild(optionBtn);
        orderedList.appendChild(option);
    }
    playboxEl.appendChild(orderedList);
    /////////////////////////////////////////////
    var optionButton1 = document.getElementById("option0");
    var optionButton2 = document.getElementById("option1");
    var optionButton3 = document.getElementById("option2");
    var optionButton4 = document.getElementById("option3");

    optionButton1.onclick = function(){
        console.log("choosed number 1");
        checkAnswer(i, optionButton1.textContent);
        continuePlay()
        
    }
    optionButton2.onclick = function(){
        console.log("choosed number 2");
        checkAnswer(i, optionButton2.textContent);
        continuePlay()

    }
    optionButton3.onclick = function(){
        console.log("choosed number 3");
        checkAnswer(i, optionButton3.textContent);
        continuePlay()

    }
    optionButton4.onclick = function(){
        console.log("choosed number 4");
        checkAnswer(i, optionButton4.textContent);
        continuePlay()
    }

}

function checkAnswer(i, optionButton){
    var msg = document.createElement("p");
        var answer = questionList[i].answer;
        console.log(optionButton);

        if (answer === optionButton) {
            msg.textContent = "Correct";
            score += 1;
            playboxEl.appendChild(msg);

        } else {
            msg.textContent = "Incorrect";
            countdown = countdown - 9; // -9 since countdown is already decrease by 1 by setInterval (-1-9 = -10)
            playboxEl.appendChild(msg);

        }
}

function continuePlay(){
    setTimeout(function() {
        i++;
        play(i);
    }, 1200);
}

// EventListener for starting game when click the startGame button
startButtonEl.addEventListener("click", startGame);


////FOR SCOREBOARD//////////////////////////////////////////////////////////////////////////////////////
scoreBoardBtn.addEventListener("click", showScoreBoard);

function showScoreBoard() {
    clearInterval(timer);
    playboxEl.textContent = "";
    startButtonEl.setAttribute("style", "display: none;");
    var scoreHeader = document.createElement("h1");
    scoreHeader.textContent = "SCORE BOARD";
    var user = JSON.parse(localStorage.getItem("players"));
    var score_ul = document.createElement("ol");
    for(var i=0; i<user.length; i++){
        var score_li = document.createElement("li");
        score_li.innerHTML = "player name: " + user[i].Name + " &emsp; score: " + user[i].Score;
        score_ul.appendChild(score_li);
    }
    playboxEl.appendChild(scoreHeader);
    playboxEl.appendChild(score_ul);
    scoreBoardBtn.disabled = true;
}