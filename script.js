var success = new Audio("sounds/success.mp3")
var wrong = new Audio("sounds/wrong.mp3")
var trueA = new Audio("sounds/true.mp3")

var questionBar = document.querySelector('.question-bar')
var wordBar = document.querySelector('.word-bar')

const giveLetter = document.getElementById('gletter')
const input = document.getElementById('answer-input')
const button = document.getElementById('answer-button')

var items

var myObj
var myObj2

var questionNumber = 0

var soru
var word 
var len 
var usedLetter

//document.getElementsByTagName('meta')['viewport'].content='width= 1440px;';


init()



function init() {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onload = function () {
        myObj = JSON.parse(this.responseText)
        nextQuestion(myObj[questionNumber])
    }
    xmlhttp.open("GET", "question.json")
    xmlhttp.send()

    
    //nextQuestion()
}



function addLetter() {
    rand = Math.floor(Math.random() * len)
    let letElm = items[rand]
    let letTxt = letElm.textContent

    if (!letTxt || letTxt.length === 0) {
        letElm.textContent = word[rand]
        usedLetter++
        playSound(success)
    } else {
        if (usedLetter !== len) {
            addLetter()
        } else {
            questionNumber++
            init()
        }
    }
}

function nextQuestion(q) {
    input.value = ''
    wordBar.innerHTML = ''
    questionBar.innerHTML = ''
    soru = q.question
    questionBar.textContent = soru
    word = q.answer
    len = word.length
    usedLetter = 0
    for (let i = 0; i < len; i++) {
        createElement()
    }

    items = document.querySelectorAll('.word-bar-item')
}

function playSound(sound) {
    sound.pause()
    sound.currentTime = 0
    sound.play()
}

function createElement() {
    var element = document.createElement('div')
    element.classList.add('word-bar-item')
    wordBar.appendChild(element)
}


button.addEventListener('click', function () {
    var answer = input.value
    if (word.toLowerCase() === answer.toLowerCase()) {
        questionNumber++
        init()
        playSound(trueA)
    } else {
        playSound(wrong)
    }
})

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        button.click()
    }
});

giveLetter.addEventListener('click', addLetter)