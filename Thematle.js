// Course: SENG 513
// Date: Oct 1, 2023
// Assignment 1
// Name: Liam Sarjeant
// UCID: 30150737 

/**
 * The final product will include animations for the cards being animated into
 * frame and having their values updated
 */

//Object representing the orange team
const orange = {
    //decipherer
    //agent
    //score

    //setters and getters for each of the propterties
};

//Object representing the purple team
const purple = {
    //decipherer
    //agent
    //score

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


//This will store the avatar icons that will update the icons displayed next to the score
//each time a players guesses a card
const nextAvatar = [
    './assets/image1.png',
    './assets/image2.png',
    './assets/image3.png',
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
    //RANDOM selection ALGORITHM to choose words randomly from
    //the words object
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
input.addEventListener('click', revealClue());

//Updates the card graphic
card - i.addEventListener('click', updateCard());

