/*
 * Create a list that holds all of your cards
 */
// let cards = document.querySelectorAll('.card');
let cards = document.querySelector('.deck').childNodes;
let allCards = document.getElementsByClassName('card');
let cardNames = [
    "diamond",
    "paper-plane-o",
    "anchor",
    "bolt",
    "cube",
    "leaf",
    "bicycle",
    "bomb",
    "diamond",
    "paper-plane-o",
    "anchor",
    "bolt",
    "cube",
    "leaf",
    "bicycle",
    "bomb"
];
let deck = document.querySelector('.deck');
let cardsClickedOn = [];
let match = [];
let deckHTML = " ";
// let moves = document.querySelector('.moves').textContent;
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
//starting a new game
function newGame() {
    document.querySelector('.moves').textContent = 0;
    let shuffledCards = shuffle(cardNames);
    cardNames.map(function(card) {
        deckHTML += `<li class="card">
  <i class="fa fa-${card}"></i>
  </li>`;
        return deckHTML;
    });
    deck.innerHTML = deckHTML;
} //closes newGame

newGame();

function showCards() {
    for (i = 0; i < cardNames.length; i++) {
        cards[i].addEventListener('click', function(evt) {
          cardsClickedOn.push(evt.target);
          function seeIfCardsMatch(evt) {
            let cardOne = cardsClickedOn["0"].innerHTML;
            let cardTwo = cardsClickedOn["1"].innerHTML;
            if (cardOne === cardTwo) {
              match.push(cardsClickedOn["0"], cardsClickedOn["1"]);
              cardsClickedOn["0"].classList.add("match");
              cardsClickedOn["1"].classList.add("match");
              console.log('we found a match');
            } else {
              setTimeout(function() {
                cardsClickedOn[0].classList.remove('show', 'open');
                cardsClickedOn[1].classList.remove('show', 'open');
              }), 5000;}
              console.log('sorry no matches');
          }; //closes seeIfCardsMatch fx

            if (cardsClickedOn.length < 3) {
              evt.target.classList.add("show", "open");
            } else if (cardsClickedOn.length = 2) {
              evt.target.classList.add("show", "open");
              seeIfCardsMatch();
            } else {

            } //closes if else
        }); //closes event listenr
    } //closes for loop
} //closes showCards fx

showCards();

 /* set up the event listener for a card. If a card is clicked:*/
/*  - display the card's symbol (put this functionality in another function that you call from this one)*/
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
