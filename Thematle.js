// Course: SENG 513
// Date: Oct 1, 2023
// Assignment 1
// Name: Liam Sarjeant
// UCID: 30150737 

/**
 * The final product will include animations for the cards being animated into
 * frame and having their values updated
 */

const themePack = [
    {
        topic: "Medical",
        words: [
            { word: "doctor", weight: 0.02 },
            { word: "nurse", weight: 0.04 },
            { word: "hospital", weight: 0.06 },
            { word: "medicine", weight: 0.08 },
            { word: "patient", weight: 0.1 },
            { word: "surgery", weight: 0.12 },
            { word: "diagnosis", weight: 0.14 },
            { word: "pharmacy", weight: 0.16 },
            { word: "stethoscope", weight: 0.18 },
            { word: "ambulance", weight: 0.2 },
            { word: "injection", weight: 0.22 },
            { word: "x-ray", weight: 0.24 },
            { word: "scrubs", weight: 0.26 },
            { word: "patient", weight: 0.28 },
            { word: "couch", weight: 0.3 },
            { word: "lamp", weight: 0.32 },
            { word: "book", weight: 0.34 },
            { word: "television", weight: 0.36 },
            { word: "coffee", weight: 0.38 },
            { word: "shoes", weight: 0.4 },
            { word: "pillow", weight: 0.45 },
            { word: "keyboard", weight: 0.5 },
            { word: "chair", weight: 0.55 },
            { word: "monitor", weight: 0.6 },
            { word: "bottle", weight: 0.65 },
            { word: "table", weight: 0.7 },
            { word: "clock", weight: 0.75 },
            { word: "phone", weight: 0.8 },
            { word: "laptop", weight: 0.85 },
            { word: "window", weight: 0.9 },
            { word: "door", weight: 0.95 },
            { word: "mirror", weight: 1.0 },
        ],
    },
    {
        name: "Nature",
        words: [
            { word: "tree", weight: 0.02 },
            { word: "river", weight: 0.04 },
            { word: "mountain", weight: 0.06 },
            { word: "wildlife", weight: 0.08 },
            { word: "forest", weight: 0.1 },
            { word: "bird", weight: 0.12 },
            { word: "flower", weight: 0.14 },
            { word: "lake", weight: 0.16 },
            { word: "sunset", weight: 0.18 },
            { word: "camping", weight: 0.2 },
            { word: "hiking", weight: 0.22 },
            { word: "wind", weight: 0.24 }, 
            { word: "rock", weight: 0.26 },
            { word: "ocean", weight: 0.28 },
            { word: "sky", weight: 0.3 },
            { word: "fall", weight: 0.32 }, 
            { word: "desert", weight: 0.34 },
            { word: "flower", weight: 0.36 },
            { word: "flood", weight: 0.38 }, 
            { word: "lake", weight: 0.4 },
            { word: "produce", weight: 0.42 }, 
            { word: "star", weight: 0.44 },
            { word: "snap", weight: 0.46 }, 
            { word: "sunrise", weight: 0.48 },
            { word: "moss", weight: 0.5 }, 
            { word: "space", weight: 0.52 }, 
            { word: "beach", weight: 0.54 },
            { word: "root", weight: 0.56 }, 
            { word: "oil", weight: 0.58 },
            { word: "tear", weight: 0.6 }, 
            { word: "paper", weight: 0.62 }, 
            { word: "stove", weight: 0.64 },
            { word: "shot", weight: 0.66 }, 
            { word: "shower", weight: 0.68 },
            { word: "tire", weight: 0.7 }, 
            { word: "cloth", weight: 0.72 }, 
            { word: "photo", weight: 0.74 },
            { word: "tear", weight: 0.76 }, 
            { word: "bass", weight: 0.78 }, 
            { word: "car", weight: 0.8 }, 
            { word: "pen", weight: 0.82 }, 
            { word: "radio", weight: 0.84 },
            { word: "wire", weight: 0.86 },
            { word: "tower", weight: 0.88 },
            { word: "can", weight: 0.9 }, 
            { word: "lead", weight: 0.92 }, 
            { word: "row", weight: 0.94 }, 
            { word: "stool", weight: 0.96 }, 
            { word: "sewer", weight: 0.98 },
            { word: "bass", weight: 1.0 },
        ],
    },
];



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
input.addEventListener('click', revealClue());

//Updates the card graphic
card - i.addEventListener('click', updateCard());

