const mainDescriptionEl = document.querySelector("#main-description");
const startQuizEl = document.querySelector("#start-quiz");
const quizEl = document.querySelector("#quiz");
const questionEl = document.querySelector("#question");
const answerOptionsEl = document.querySelector("#answer-options");
const addScoreEl = document.querySelector("#add-score");
const initialsEl = document.querySelector("#initials");
const submitInitialsButtonEl = document.querySelector("#submit-initials");
const finalScoreEl = document.querySelector("#score");
const highScoresEl = document.querySelector("#high-scores");
const scoresEl = document.querySelector("#individual-scores");
const restartQuizButtonEl = document.querySelector("#restart");
const viewHighScoresButtonEl = document.querySelector("#view-high-scores");
const timerEl = document.querySelector("#timer");
const questions = [
    {
        question: "What do you use to create a multi-line comment?",
        choices: ["/**/", "//", "{}", "**"],
        answer: "/**/"
    },
    {
        question: "When was JavaScript invented?",
        choices: ["1974", "1988", "1995", "200 B.C."],
        answer: "1995"
    },
    {
        question: "What will console.log(5) print?",
        choices: ["Five", "1 2 3 4 5", "false", "5"],
        answer: "5"
    },
    {
        question: "How would you round down a random number generator from a decimal result?",
        choices: [".random", ".ceil", ".rounddown", ".floor"],
        answer: ".floor"
    },
    {
        question: "Which is not an acceptable variable declaration?",
        choices: ["var", "num", "const", "let"],
        answer: "num"
    },
    {
        question: "What would console.log('Hello'.length) print?",
        choices: ["5", "Hello 1", "Helloooo", "Five"],
        answer: "5"
    },
    {
        question: "What tag is used to link Javascript to HTML?",
        choices: ["<script>", "<js>", "scripts", "javascript"],
        answer: "<script>"
    },
    {
        question: "If const example = true, what would console.log(typeof example) log?",
        choices: ["string", "number", "boolean", "none of the above"],
        answer: "boolean"
    },
    {
        question: "How would you create a function?",
        choices: ["function = example()", "function example()", "function = example()", "example()"],
        answer: "function example()"
    },
    {
        question: "How do you write an if statement?",
        choices: ["if i = 10", "if i == 10 then", "if (i == 10)", "none of the above"],
        answer: "if (i == 10)"
    },
]
var score = 0;
var currentQuestion = 0;
var highScores = [];
var interval;
var timeAllowed = 100;
var secondsElapsed = 0;

hide(addScoreEl)
hide(highScoresEl)


function startTimer() {
    timerEl.textContent = timeAllowed;
    interval = setInterval(function () {
        secondsElapsed++;
        timerEl.textContent = timeAllowed - secondsElapsed;
        if (secondsElapsed >= timeAllowed) {
            currentQuestion = questions.length;
            nextQuestion();
        }
    }, 1000);
}

function endTime() {
    clearInterval(interval);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        endTime();
        if ((timeAllowed - secondsElapsed) > 0)
            score += (timeAllowed - secondsElapsed);
        finalScoreEl.textContent = score;
        hide(quizEl);
        show(addScoreEl);
        timerEl.textContent = 0;
    }
}

function verifyAnswer(answer) {
    if (questions[currentQuestion].answer == questions[currentQuestion].choices[answer.id]) {
        score += 1;
        displayMessage("Correct");
    } else {
        secondsElapsed += 10;
        displayMessage("Incorrect");
    }
}

function displayMessage(m) {
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    messageEl.textContent = m;
    document.querySelector(".main-container").appendChild(messageHr);
    document.querySelector(".main-container").appendChild(messageEl);
    setTimeout(function () {
        messageHr.remove();
        messageEl.remove();
    }, 2000);
}

function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "block";
}

function reset() {
    score = 0;
    currentQuestion = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;
}

function renderQuestion() {
    show(quizEl);
    console.log("render question function", quizEl);
    questionEl.textContent = questions[currentQuestion].question;
    console.log(questions[currentQuestion].question);
    for (let i = 0; i < answerOptionsEl.children.length; i++) {
        answerOptionsEl.children[i].children[0].textContent = `${questions[currentQuestion].choices[i]}`;
    }
}

function renderHighScores() {
    scoresEl.innerHTML = "";
    show(highScoresEl);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreItem = document.createElement("div");
        scoreItem.className += "row mb-3 p-2";
        console.log(scoreItem)
        scoreItem.setAttribute("style", "background-color:red;");
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].finalScore}`;
        scoresEl.appendChild(scoreItem);
    }
}

viewHighScoresButtonEl.addEventListener("click", function () {
    hide(mainDescriptionEl);
    hide(quizEl);
    hide(addScoreEl);
    renderHighScores();
    endTime();
    reset();
});

startQuizEl.addEventListener("click", function () {
    hide(mainDescriptionEl);
    startTimer();
    renderQuestion();
    show(quizEl);
});

answerOptionsEl.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        verifyAnswer(e.target);
        nextQuestion();
    }
});

submitInitialsButtonEl.addEventListener("click", function () {
    let initValue = initialsEl.value.trim();
    if (initValue) {
        let finalScore = { username: initValue, finalScore: score };
        initialsEl.value = '';
        highScores.push(finalScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(addScoreEl);
        renderHighScores();
        reset();
    }
});

restartQuizButtonEl.addEventListener("click", function () {
    hide(highScoresEl);
    show(mainDescriptionEl);
});