var startBtn = $('#startBtn');
var currQuestion = $('.currentQuestion');
var prefWrap = $('.prefContainer');
var drinkWrap = $('.drinkContainer');
var preflist = $('.preferList ul');
var moreBtn = $('#moreBtn');

// Bartender Prototype //
var Bartender = function(questions) {
    this.questions = questions;
}
var questionArray = [
    'Do you prefer your drinks strong?',
    'Do you like it with a salty taste?',
    'Would you like it bitter as well?',
    'How about adding some sweetness?',
    'Top it off with a fruity finish?'
];

// Pantry Prototype //
var Pantry = function(ingredients) {
    this.ingredients = ingredients;
}
var ingredientArray = [
    ['Strong', 'Douse of Rum', 'Splash of Gin', 'Shot of Whiskey'],
    ['Salty', 'Olive on a Stick', 'Salt-Dusted Rim', 'Whisper of Saline'],
    ['Bitter', 'Shake of bitters', 'Dose of Tonic', 'Twist of Lemon Peel'],
    ['Sweet', 'Sugar Cube', 'Spoonful of Honey', 'Half-pint of Cola'],
    ['Fruity', 'Slice of Orange', 'Creme de Cassis', 'Cherry on Top']
];

// Self-invoking function that begins program
$(function() {
    startQuestions();
});

// Question Section //
function startQuestions() {
    startBtn.click(function() {
        startBtn.addClass('hideItem');
        $('.inputBtnWrap').css('display', 'inline-block');
        prefWrap.css('display', 'block');
        createDrink();
    });
}

// Evaluates Yes or No Answers and outputs a drink's ingredients
function createDrink() {
    var drinkQuestions = new Bartender(questionArray);
    var ingredItems = new Pantry(ingredientArray);
    var counter = 0;
    currQuestion.html(drinkQuestions.questions[counter]); // Load first question

    $('input').on('click', function() {
        if (this.id === 'yesBtn' && counter < questionArray.length) {
            var rndmIdx = Math.floor((Math.random() * 3) + 1);
            preflist.append('<li>' + ingredItems.ingredients[counter][0] + '</li>'); // Add user's drink preference to UI list
            $('.drinkIngreds ul').append('<li>' + ingredItems.ingredients[counter][rndmIdx] + '</li>'); // Add ingredients to UI drink list
        } else if (this.id === "noBtn" && counter < questionArray.length) {
            preflist.append('<li>Not ' + ingredItems.ingredients[counter][0] + '</li>'); // Add user's drink preference to UI list
        }
        counter++;
        currQuestion.html(drinkQuestions.questions[counter]);
        if (counter == 5) {
            drinkWrap.css('display', 'block'); // Shows drink container and more button upon last question
            moreBtn.css('display', 'block');
            moreBtn.on('click', function() {
                counter = 0; // Reset variables
                currQuestion.html(drinkQuestions.questions[counter]);
                anotherDrink();
                drinkWrap.css('display', 'none');
                moreBtn.css('display', 'none');
            });
        }
    });
}
// Pour Another Drink
function anotherDrink() {
    var listItems = document.querySelectorAll('li'); //Select all li elements
    for (var i = 0; i < listItems.length; i++) {
        listItems[i].remove(); // Remove all li elements
    }
    startQuestions(); // Restart app
}
