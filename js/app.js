/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];

//array for cards opened
let openedCards = [];

//deck that holds all the cards
const deck = document.getElementsByClassName(".deck");

//function to toggle cards classes
let displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

//adding event listeners to each card
for (let i=0; i< cards. length ; i++){
  cards[i].addEventListener("click", displayCard);
};



//function to start the Game

function startGame(){
  let shuffledCards = shuffle(cards);
  for(let i=0 ; i < shuffledCards.length; i++){
    [].forEach.call(shuffledCards, function(item){
      deck.appendChild(item);
    });
  }
};

//matching the shuffledCards

//add opened cards to an array and check if the cards match

function cardOpen(){
  openedCards.push(this);
  let len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if(openedCards[0].type === openedCards[1].type){
      matched();
    } else {
      unmatched();
    }
  }
};

//when cards match
function matched(){
  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  openedCards = [];
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.body.onload = startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
