// let questionContainer = document.createElement("div")
// let questionText = document.createElement("h2")
// questionText.innerText = "What year was javascript invented?"

// questionContainer.appendChild(questionText)

// document.body.appendChild(questionContainer)
let points = 0;

//Defined set of questions
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
        answer: "floor"
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
        choices: ["<script>", "<js>", "scripts", "scripting"],
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



//(insert dom element for next button of quiz).addEventListener("click", function (event) {
//     console.log(event.target.innerText)
//     //this is where all the stuff happens
//     questionTextArea.innerText = questions[currentQuestion].question
// })

document.querySelector("#questionTextArea").addEventListener("click", function (event) {
    if (event.target.innerText === questions[currentQuestion].answer) {
        points++
    }
})

const startQuiz = function (event) {

}


document.querySelector("#submitScore").addEventListener("click", function (event) {
    let name = prompt("what is your name?");
    let player = { name: name, score: points }
    let playerList = JSON.parse(localStorage.getItem("highscores")) || [];
    playerList.append(player);
    //for loop over the playerList, using the notation at the top of this document to dynamically create a table with score and name columns
    localStorage.setItem("highscores", JSON.stringify(playerList))
})
