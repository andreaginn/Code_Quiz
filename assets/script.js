const mainDescriptionEl = document.querySelector("#main-description");
const startQuizEl = document.querySelector("#start-quiz");
const quizEl = document.querySelector("#quiz");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answer-options");
const addScoreEl = document.querySelector("#addScore");
const initialsEl = document.querySelector("#initials");
const submitInitialsButtonEl = document.querySelector("#submitInitials");
const finalScoreEl = document.querySelector("#score");
const highScoresEl = document.querySelector("#highScores");
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
        choices: ["if i = 10", "if i == 10 then", "if (i == 10", "none of the above"],
        answer: "if (i == 10"
    },
]
var score = 0;
var currentQuestion = 0;
var highScores = [];
var interval;
var timeAllowed = 100;
var secondsElapsed = 0;

//for timer
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
