// Course: SENG 513
// Date: Oct 1, 2023
// Assignment 1
// Name: Liam Sarjeant
// UCID: 30150737 

/**
 * The final product will include animations for the cards being animated into
 * frame and having their values updated
 */

const jsonURL = 'https';

fetch(jsonURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    // You can now work with the JSON data
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });


//Object representing the orange team
const team1 = {
    //decipherer
    //agent
    //score
    //wordList

    //setters and getters for each of the propterties
};

//Object representing the purple team
const team2 = {
    //decipherer
    //agent
    //score
    //wordList

    //setters and getters for each of the propterties
};

//Context will keep track of whos turn it is
const context = {
    //whoseTurn
    //clue
    //numberOfWords
    //other context dependent properties that have yet to be determined

    //setters and getters for each of the propterties
    // set context() {}
    // get context() {}
    // set clue() {}
    // get clue() {}
    // set numberOfWords() {}
    // get numberOfWords() {}
}

const card = {
    //index
    //word
    //cardType: black || neutral || team1 || team2 
}


//This will store the avatar icons that will update the icons displayed next to the score
//each time a players guesses a card
const nextAvatar = [
    // './assets/image1.png',
    // './assets/image2.png',
    // './assets/image3.png',
];

/**
 * This will store the possible words that will be display on the cards.
 * This might be implemented as an array of tuples representing words that are similar to
 * one another, but will be distributed seperately to each team
 */
const words = {
    // kitchen: [("word1", "word2")], ...
    // camping: [("word1", "word2")], ...
}

/**
 * At the start of the game randomly choose 
 */
function shuffle() {
    //Randomly assigns the words from each team to a card on the board
}

/**
 * Picks the random item based on its weight.
 * source: https://dev.to/trekhleb/weighted-random-algorithm-in-javascript-1pdc
 */
function weightedRandom(items, weights) {
    //RANDOM selection ALGORITHM to choose words randomly from
    //the topics in the words object
    //Also note that the topic will also be randomly chosen
}

/**
 * Function to update the cards contents including the image, color, and word
 * depending on the context
 */
function updateCard() {

}

/**
 * Updates the dom to show all players the clue at play
 */
function revealClue() {
    //setContext
}


//When the decipherer inputs and submits clue
// input.addEventListener('click', revealClue());

//Updates the card graphic
// card - i.addEventListener('click', updateCard());

