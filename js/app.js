let cards = document.querySelector('.deck').childNodes;
let cardNames = [
    "gem",
    "barcode",
    "kiss-wink-heart",
    "rocket",
    "user-ninja",
    "leaf",
    "meh-rolling-eyes",
    "battery-full",
    "gem",
    "barcode",
    "kiss-wink-heart",
    "rocket",
    "user-ninja",
    "leaf",
    "meh-rolling-eyes",
    "battery-full"
];
let deck = document.querySelector('.deck');
let cardsClickedOn = [];
let match = [];
let deckHTML = " ";
let time = document.querySelector('.timer');
let moves = document.querySelector('.moves');
let stars = document.getElementsByClassName('fa-star');
let restart = document.querySelector('.restart');
let modal = document.querySelector('.modal');
let modalText = document.querySelector('#modalText');
let timer;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//function displays time
function startTimer() {
    time.textContent++;
    timer = setTimeout(startTimer, 1000);
};

$(".deck").one("click", function() {
  timer = setTimeout(startTimer, 1000);
});
//shuffles the cards and inserts HTML into deck
function shuffledCards() {
    shuffle(cardNames);
    cardNames.map(function(card) {
        deckHTML += `<li class="card">
<i class="fas fa-${card}"></i>
</li>`;
        return deckHTML;
    });
    deck.innerHTML = deckHTML;
}


//starting a new game
function newGame() {
    moves.textContent = 0;
    time.textContent = 0;
    match = [];
    cardsClickedOn = [];
    shuffledCards();
    showCards();
} //closes newGame

newGame();


//function will compare 2 cards to see if they are identical; if they match then the 2 matched cards are pushed into an array
function seeIfCardsMatch(evt) {
    let cardOne = cardsClickedOn["0"];
    let cardTwo = cardsClickedOn["1"];
    if (cardOne.innerHTML === cardTwo.innerHTML) {
        match.push(cardOne, cardTwo);
        cardOne.classList.add("match");
        cardTwo.classList.add("match");
        cardsClickedOn = [];
        moves.textContent++;
    } else {
        setTimeout(function() {
            cardOne.classList.remove('show', 'open');
            cardTwo.classList.remove('show', 'open');
            cardsClickedOn = [];
        }, 1000);
        moves.textContent++;
    } //close if else
}; //closes seeIfCardsMatch fx


//flips 2 cards over and calls a function to see if the cards match
function showCards() {
    let cardOne = cardsClickedOn["0"];
    let cardTwo = cardsClickedOn["1"];
    for (i = 0; i < cardNames.length + 1; i++) {
        cards[i].addEventListener('click', function(evt) {
            cardsClickedOn.push(evt.target);
            if (cardsClickedOn.length <= 2 && !evt.target.classList.contains('match') && !evt.target.classList.contains('show')) {
                evt.target.classList.add("show", "open");
                seeIfCardsMatch();
                winner();
                rating();
            } else {
                setTimeout(function() {
                    cardOne.classList.remove('show', 'open');
                    cardTwo.classList.remove('show', 'open');
                    cardsClickedOn = [];
                }, 1000);
            } //closes if else
        }); //closes event listenr
    } //closes for loop
} //closes showCards fx

//1-5 star rating system
function rating() {
    if (moves.textContent > 25) {
        stars[1].classList.remove("fa");
        stars[2].classList.remove("fa");
        stars[3].classList.remove("fa");
        stars[4].classList.remove("fa");
        stars[1].classList.add("far");
        stars[2].classList.add("far");
        stars[3].classList.add("far");
        stars[4].classList.add("far");
        text = "1 star";
        return text;
    } else if (moves.textContent > 18 && moves.textContent <= 25) {
        stars[2].classList.remove("fa");
        stars[3].classList.remove("fa");
        stars[4].classList.remove("fa");
        stars[2].classList.add("far");
        stars[3].classList.add("far");
        stars[4].classList.add("far");
        text = "2 stars";
        return text;
    } else if (moves.textContent > 12 && moves.textContent <= 18) {
        stars[3].classList.remove("fa");
        stars[4].classList.remove("fa");
        stars[3].classList.add("far");
        stars[4].classList.add("far");
        text = "3 stars";
        return text;
    } else if (moves.textContent > 10 && moves.textContent <= 12) {
        stars[4].classList.remove("fa");
        stars[4].classList.add("far");
        text = "4 stars";
        return text;
    } else {
        text = "5 stars";
        return text;
    } //ends if else
} //closes rating function

//what happens when the user wins the game
function winner() {
    if (match.length === 16) {
        clearTimeout(timer);
        modalText.textContent = `Congrats! You found all the matches in  ${time.textContent} seconds and  ${moves.textContent} moves. You scored  ${rating(text)}!`;
        modal.style = "display: block;";
    } else {

    } //if else
} //winner fx

//resets the game aka start over
function startOver() {
  clearTimeout(timer);
  $(".deck").one("click", function() {
    console.log('startOver happened on click');
    timer = setTimeout(startTimer, 1000);
  });
    modal.style = "display: none;";
    $('.fa-star').addClass('fa');
    moves.textContent = 0;
    time.textContent = 0;
    match = [];
    cardsClickedOn = [];
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    };
    deckHTML = "";
    shuffledCards();
    showCards();
}; //closes startOver fx

// when the user does not want to play again
function noPlay() {
    modal.style = "display: none;";
}
