/*
 * Create a list that holds all of your cards
 */
// let cards = document.querySelectorAll('.card');
let cards = document.querySelector('.deck').childNodes;
let allCards = document.getElementsByClassName('card');
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
/*
 * Display the cards on the page*/
/*   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
};
//starting a new game
function newGame() {
    moves.textContent = 0;
    let shuffledCards = shuffle(cardNames);
    cardNames.map(function(card) {
        deckHTML += `<li class="card">
  <i class="fas fa-${card}"></i>
  </li>`;
        return deckHTML;
    });
    deck.innerHTML = deckHTML;
    time.textContent = 0;
} //closes newGame

newGame();
//when user clicks on the deck the game timer will start
let timer = setInterval(startTimer, 1000);
$(".deck").one("click", function() {
  //when let timer was inside here it worked but unfortunately it made my variable local scope and unable to clearInterval(timer)
});

//function will compare 2 cards to see if they are identical; if they match then the 2 matched cards are pushed into an array
function seeIfCardsMatch(evt) {
  let cardOne = cardsClickedOn["0"].innerHTML;
  let cardTwo = cardsClickedOn["1"].innerHTML;
  let checkClass = cardsClickedOn["0"].classList;
  if (cardOne === cardTwo) {
    match.push(cardsClickedOn["0"], cardsClickedOn["1"]);
    cardsClickedOn["0"].classList.add("match");
    cardsClickedOn["1"].classList.add("match");
    cardsClickedOn = [];
    document.querySelector('.moves').textContent++;
  } else {
    setTimeout(function() {
      cardsClickedOn[0].classList.remove('show', 'open');
      cardsClickedOn[1].classList.remove('show', 'open');
      cardsClickedOn = [];
    }, 1000);
    moves.textContent++;
}//close if else
}; //closes seeIfCardsMatch fx


//flips 2 cards over and calls a function to see if the cards match
function showCards() {
    for (i = 0; i < cardNames.length + 1; i++) {
      cards[i].addEventListener('click', function(evt) {
        cardsClickedOn.push(evt.target);
        if (cardsClickedOn.length <= 2 && !evt.target.classList.contains('match') && !evt.target.classList.contains('show') && !cardsClickedOn["0"].classList.contains('evt.target')) {
          evt.target.classList.add("show", "open");
          seeIfCardsMatch();
          winner();
          rating();
       } else {
         setTimeout(function() {
           cardsClickedOn[0].classList.remove('show', 'open');
           cardsClickedOn[1].classList.remove('show', 'open');
           cardsClickedOn = [];
         }, 1000);
 }//closes if else
      }); //closes event listenr
    } //closes for loop
} //closes showCards fx


showCards();

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


function winner (){
  let modal = document.querySelector('.modal');
  let modalText = document.querySelector('#modalText');
if (match.length === 16) {
  clearInterval(timer);
  modalText.textContent = `Congrats! You found all the matches in  ${time.textContent} seconds and  ${moves.textContent} moves. You scored  ${rating(text)}!`;
  modal.style = "display: block;";
  console.log('you won');

} else {

}//if else
} //winner fx
 /* set up the event listener for a card. If a card is clicked:*/
/*  - display the card's symbol (put this functionality in another function that you call from this one)*/
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
