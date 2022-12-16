// Questions
// Questions are brought from https://www.tutorialspoint.com/javascript/javascript_online_quiz.htm
var question1 = {
    question: "Q1. Which of the following is true about variable naming conventions in JavaScript?",
    answers: [
        "You should not use any of the JavaScript reserved keyword as variable name.", 
        "JavaScript variable names should not start with a numeral (0-9).", 
        "Both of the above.", 
        "None of the above."],
    answer: "Both of the above."
}

var question2 = {
    question: "Q2. How can you get the type of arguments passed to a function?",
    answers: [
        "using typeof operator", 
        "using getType function", 
        "Both of the above.", 
        "None of the above."],
    answer: "using typeof operator"
}

var question3 = {
    question: "Q3. Which built-in method combines the text of two strings and returns a new string?",
    answers: [
        "append()", 
        "concat()", 
        "attach()", 
        "None of the above."],
    answer: "concat()"
}

var questionList = [question1, question2, question3];

var startButtonEl = document.querySelector("#start");
var scoreEl = document.querySelector("#scorebox");
var timerEl = document.querySelector("#countdown");
var playboxEl = document.querySelector("#playbox");

var countdown = 0;
var score = 0;
var timer;
var correct;
var i = 0;

var players = [];

// comparing functino to sort players list by highest score
// referenced from https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function compare(p1, p2) {
    if(p1[1] > p2[1]){
        return -1;
    }
    if(p1[1] < p2[1]) {
        return 1;
    }
    return 0;
}


//starting Game
function startGame() {
    startButtonEl.setAttribute("style", "display: none;");
    countdown = 60;
    startCountDown();
    play(i);
}

//starting countdown, will display message time over if countdown hits 0.
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

//After quiz ends, page ask for user to input their player name to save the score
//Input for user name must be submitted to be recorded (alert)
function userForm () {
    var form = document.createElement("form");
    var name = document.createElement("input");
    var submit = document.createElement("button");
 
    name.setAttribute("id", "input");
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
            storePlayer(nameText);
            form.remove();
            delayTime();
            playboxEl.textContent = "Thank you! Your score has been recorded!";
            restart();
        }
    })

}

//stores player's name(nameText) to localStorage
function storePlayer(nameText) {
    var player = [nameText, score];
    var prevPlayer = JSON.parse(localStorage.getItem("players"));
    if(prevPlayer !== null){
        for(var i=0; i<prevPlayer.length; i++){
            players.push(prevPlayer[i]);
        }
    }
    players.push(player);
    ///////////
    players.sort(compare);
    localStorage.setItem("players", JSON.stringify(players));
}

//playing the quiz. If user finishes the game, game will end
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
        optionBtn.setAttribute("id", "option" + j);
        optionBtn.setAttribute("class", "optionButtons");
        optionBtn.textContent = questionList[i].answers[j];
        option.appendChild(optionBtn);
        orderedList.appendChild(option);
    }
    playboxEl.appendChild(orderedList);

    //Check clicked button and check if answer is correct or not//
    var optionButton1 = document.getElementById("option0");
    var optionButton2 = document.getElementById("option1");
    var optionButton3 = document.getElementById("option2");
    var optionButton4 = document.getElementById("option3");

    optionButton1.onclick = function(){
        console.log("choosed number 1");
        checkAnswer(i, optionButton1.textContent);
        disableBtn(optionButton1, optionButton2, optionButton3, optionButton4);
        continuePlay();
        
    }
    optionButton2.onclick = function(){
        console.log("choosed number 2");
        checkAnswer(i, optionButton2.textContent);
        disableBtn(optionButton1, optionButton2, optionButton3, optionButton4);
        continuePlay();

    }
    optionButton3.onclick = function(){
        console.log("choosed number 3");
        checkAnswer(i, optionButton3.textContent);
        disableBtn(optionButton1, optionButton2, optionButton3, optionButton4);
        continuePlay();

    }
    optionButton4.onclick = function(){
        console.log("choosed number 4");
        checkAnswer(i, optionButton4.textContent);
        disableBtn(optionButton1, optionButton2, optionButton3, optionButton4);
        continuePlay();
    }

}

function disableBtn(btn1, btn2, btn3, btn4) {
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;
}

//check if the selected answer(button) is correct or not and print out the message
function checkAnswer(i, optionButton){

    var msg = document.createElement("p");
        var answer = questionList[i].answer;
        console.log(optionButton);

        if (answer === optionButton) {
            msg.setAttribute("style", "color: green;");
            msg.textContent = "Correct";
            score += 1;
            playboxEl.appendChild(msg);

        } else {
            msg.setAttribute("style", "color: red;");
            msg.textContent = "Incorrect";
            countdown = countdown - 9; // -9 since countdown is already decrease by 1 by setInterval (-1-9 = -10)
            playboxEl.appendChild(msg);

        }
}

// Will continue to play and move to next question after delaying the time 
function continuePlay(){
    setTimeout(function() {
        i++;
        play(i);
    }, 1200);

}

function delayTime() {
    setTimeout(function() {

    }, 1000);
}

// EventListener for starting game when click the startGame button
startButtonEl.addEventListener("click", startGame);


////FOR SCOREBOARD//////////////////////////////////////////////////////////////////////////////////////
// EventListener for showing scoreboard when score board button is clicked
scoreBoardBtn.addEventListener("click", showScoreBoard);

// Show score board of players.
// Get stored player's data from localstorage and list them out.
// When score board button is clicked, even if it's in the middle of the game,
// timer will stop
function showScoreBoard() {
    clearInterval(timer);
    playboxEl.textContent = "";
    startButtonEl.setAttribute("style", "display: none;");
    var scoreHeader = document.createElement("h1");
    scoreHeader.textContent = "SCORE BOARD";
    var user = JSON.parse(localStorage.getItem("players"));
    var score_ul = document.createElement("ol");
    console.log(user.length);
    for(var i=0; i<user.length; i++){
        console.log("index: " + i);
        var score_li = document.createElement("li");
        score_li.innerHTML = user[i][0] + " &emsp;| score: " + user[i][1];
        score_ul.appendChild(score_li);
    }
    playboxEl.appendChild(scoreHeader);
    playboxEl.appendChild(score_ul);
    scoreBoardBtn.disabled = true;

    restart();

}

function restart(){
    var goBack = document.createElement("button");
    goBack.setAttribute("id", "restart")
    goBack.textContent = "Restart Quiz";
    playboxEl.appendChild(goBack);

    goBack.onclick = function(){
        location.reload();
        
    }
}