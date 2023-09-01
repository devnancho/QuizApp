
let questions = [
    {
        question: 'Which world famous Art Museum is sited in Trafalgar Square?',
        answers: [
            { text: 'The Tate Britain', correct: false },
            { text: 'The National Gallery', correct: false },
            { text: 'The National Portrait Gallery', correct: true },
            { text: 'The British Museum', correct: false },
        ]
    }, {
        question: 'What is London’s tallest building?',
        answers: [
            { text: '20 Fenchurch Street', correct: false },
            { text: 'Big Ben', correct: false },
            { text: 'The Gherkin', correct: false },
            { text: 'The Shard', correct: true },
        ]
    }, {
        question: 'Which area plays host to a world famous carnival?',
        answers: [
            { text: 'Camden Town', correct: false },
            { text: 'Notting Hill', correct: true },
            { text: 'Elephant and Castle', correct: false },
            { text: 'Chelsea', correct: false },
        ]
    }, {
        question: 'Which major sporting event was held in London in 2012?',
        answers: [
            { text: 'Olympic Games', correct: true },
            { text: 'FIFA World Cup', correct: false },
            { text: 'Winter Olympic Games', correct: false },
            { text: 'London E-Prix Race 1', correct: false },
        ]
    }, {
        question: 'What colour are London buses traditionally?',
        answers: [
            { text: 'Green', correct: false },
            { text: 'Blue', correct: false },
            { text: 'Black', correct: false },
            { text: 'Red', correct: true },
        ]
    }, {
        question: 'What is the Nickname given to the London Underground, affectionately, by its users?',
        answers: [
            { text: 'Subway', correct: false },
            { text: 'Tube', correct: true },
            { text: 'Metro', correct: false },
            { text: 'Snake', correct: false },
        ]
    }
];

let questionElement = document.getElementById('question');
let answerButtons = document.getElementById('answer-buttons');
let nextButton = document.getElementById('next-btn');

// As user will get scores per answer given (right =1point/ wrong=0) we need to create variables to store the score:

let currentQuestionInd = 0; // starting on question 1, index 0
let score = 0;

function quizOn() {
    currentQuestionInd = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {

    resetState();

    //To display Questions....
    let currentQuestion = questions[currentQuestionInd];
    questionElement.innerHTML = currentQuestion.question;

    //To display the answers from each questions set...
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        //To ckeck if answer is correct we need to chech the conditions
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }


        //To change bg colour is function is right/wrong when user clicks/ I need to add a fuction name (selectAnswer)
        button.addEventListener('click', selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }
    else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

//Adding fection top the NEXT BUTTON...

nextButton.addEventListener('click', () => {
    if (currentQuestionInd < questions.length) {
        handleNextButton();
    }
    else {
        quizOn();
    }
})


// defining fuction Handle next button
function handleNextButton() {
    currentQuestionInd++;
    if (currentQuestionInd < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }

}

//SHOWSCORE()

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play again!';
    nextButton.style.display = 'block';
}


quizOn();





