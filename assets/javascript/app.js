const myQuestions = [
    {
        question: "Adele performed the theme song to which James Bond film?",
        answers: {
            a: "SkyFall",
            b: "Quantum of Solace",
            c: "Casino Royals",
            d: "From Russia with love"
        },
        imageUrl: "assets/images/skyfall.jpg",
        correctAnswer: "a"
    },
    {
        question: "What was the first successful vaccine developed in history?",
        answers: {
            a: "Rabies",
            b: "Scarlete Fever",
            c: "Chorela",
            d: "Smallpox"
        },
        imageUrl: "assets/images/smallpox.jpg",
        correctAnswer: "d"
    },
    {
        question: "What is the largest country, by area, that has only one time zone?",
        answers: {
            a: "Australia",
            b: "Turkey",
            c: "China",
            d: "Russia"
        },
        imageUrl: "assets/images/china.jpg",
        correctAnswer: "c"
    }
];

let number = 20;
let timeInterval;
let i = 0;
let correctAnswersNumber = 0;
let incorrectAnswwersNumber = 0;
let unAnsweredNumber = 0;

let answers = [];

const questionAndAnswer = function(i){
    questionDisplay(i);
    answersDisplay(i);
}

const answersDisplay = function (i) {
    answers = [];
    for (const letter in myQuestions[i].answers) {
        let answersHtml = '';
        answersHtml += `<div class="answer"  data-correctanswer="${myQuestions[i].correctAnswer}">
        <input type="radio" class="answerRadioBtn" name="answerRadioBtn" value="${letter}" id="radio${letter}" data-imageurl="${myQuestions[i].imageUrl}">
        <label for="radio${letter}">${myQuestions[i].answers[letter]}</label></div>`;
        answers.push(answersHtml);
    }
   $('#questions').append(answers.join(""));

}

const questionDisplay = function (i) {
    let questionHtml = `<div class="question">${myQuestions[i].question}</div>`;
    console.log(questionHtml);
    $('#questions').html(questionHtml);
}

const updateCorrectAnswer = function(selectedVal, correctAnswer, imageUrl){
    clearInterval(timeInterval);
    let correctAnsswerHtml = `<div><p id="yesNo"></p>
    <p class="images"><img src="${imageUrl}"></p></div>`;
    $('#correctAnswers').html(correctAnsswerHtml);
    $("#questions").fadeOut(300, function(){
        $('#correctAnswers').fadeIn();
    });
    if(selectedVal === correctAnswer){
        $('#yesNo').text('Yes');
        correctAnswersNumber ++;
    }else if(selectedVal !== correctAnswer){
        $('#yesNo').html('<p>Nope</p><p>The Correct Answer is</p>');
        incorrectAnswwersNumber++;
    }
    setTimeout(nextQuesion, 3000);
}
const nextQuesion = function(){
    resetInterval();
    if(!$("input[name='answerRadioBtn']:checked").val()){
        unAnsweredNumber++;
    };
    $('#correctAnswers').fadeOut(500, function(){
        if(i<2){
            i++;
            $("#questions").fadeIn();
        }else{
            updateHtmlDisplay();
        }
        console.log(i);
        questionAndAnswer(i);
    });
    
}

const countdown = function () {
    number--;
    $('#timeDisplay').text("Time Remaining " + number + " Seconds!");
    if(number === 0){
        nextQuesion();
    }
}

const updateHtmlDisplay = function () {
    clearInterval(timeInterval);
    $('#correctAnswersNum').text(correctAnswersNumber);
    $('#incorrectAnswersNum').text(incorrectAnswwersNumber);
    $('#unansweredNum').text(unAnsweredNumber);
    $("#questions").fadeOut();
    $('#allDone').fadeIn();
}

const resetInterval = function(){
    number = 20;
    clearInterval(timeInterval);
    timeInterval = setInterval(countdown, 1000);
}

$(document).on('click','#startOverBtn', function(){
    $('#allDone').fadeOut(5, function(){
        $("#questions, #timeDisplay").fadeIn();
    });
    resetInterval();
    correctAnswersNumber = 0;
    incorrectAnswwersNumber = 0;
    unAnsweredNumber = 0;
    i=0;
    questionAndAnswer(i);
});

$(document).on('change',"input[name='answerRadioBtn']:radio" ,function(){
    let correctAnswer = $(this).closest('div').data("correctanswer");
    let imageUrl = $(this).data('imageurl');
    updateCorrectAnswer(this.value, correctAnswer, imageUrl);
});

$('#startBtn').on('click', function () {
    $(this).fadeOut(5, function(){
        $("#questions, #timeDisplay").fadeIn();
    });
    resetInterval();
    questionAndAnswer(i);
});