/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];
console.log(cards);

//deck that holds all the cards
const deck = document.querySelector(".deck");

//array for cards opened
let openedCards = [];

//moves variables
let moves = 0;
let counter = document.querySelector(".moves");

//variable for stars icons
const stars = document.querySelectorAll(".fa-star");

// variable for matched cards
let matchedCard = document.getElementsByClassName("match");

//stars list
let starsList = document.querySelectorAll(".stars li");

//variable for congrats pop-up
let overlay = document.getElementById("banner")

//variable for close icon
let closeicon = document.querySelector(".close");

//game timer variables
var second = 0,
  minute = 0;
var timer = document.querySelector(".timer");
var interval;

//function to toggle cards classes
let displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

//adding event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
};

//add opened cards to an array and check if the cards match

function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
};

//when cards match add class "match", disable the cards and remove the other classes
function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

//when cards don't match remove all classes and disable the cards for a bit
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}

// function to disable the cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add('disabled');
  });
}

//enable cards and disable matched cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('disabled');
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

//counter for the number of moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //start timer on first click
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  // setting stars based on the number of moves moves
  if (moves > 8 && moves < 14) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 15) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

//game timer
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

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

//function to start the Game
function startGame() {
  // shuffle deck
  cards = shuffle(cards);
  // remove all exisiting classes from each card
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  // reset the moves number
  moves = 0;
  counter.innerHTML = moves;
  // reset star rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.visibility = "visible";
  }
  //reset game timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

//function to display stats on congratulations banner
function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // show congratulations overlay
    overlay.classList.add("show");

    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on overlay
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    //closeicon on overlay
    closeoverlay();
  };
}


// exit icon on overlay
function closeoverlay() {
  closeicon.addEventListener("click", function(e) {
    overlay.classList.remove("show");
    startGame();
  });
}


//button on overlay to play the game again
function playAgain() {
  overlay.classList.remove("show");
  startGame();
}
window.onload = startGame();
