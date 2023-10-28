// Course: SENG 513
// Date: Oct 1, 2023
// Assignment 1
// Name: Liam Sarjeant
// UCID: 30150737 

class Team {
    constructor(color, decipherer, agent, score) {
        this.color = color;
        this.decipherer = decipherer;
        this.agent = agent;
        this.words = [];
        this.win = false;
        this.score = score;
    }

    //Getter and Setters
    setWords(words) {
        this.words = words;
    }

    getWords() {
        return this.words;
    }

    //Helper functions
    appendWord(word) {
        this.words.push(word);
    }


}

class Card {
    constructor(id, type, word, state, iconPath) {
        this.id = id;
        this.type = type;
        this.word = word;
        this.guessed = state;
        this.icon = iconPath;
    }

    setCardIcon(iconPath) {
        this.icon = iconPath;
    }

    setCardWord(word) {
        this.word = word;
    }
}

class GameContext {
    constructor(team, state, clue, numberOfWords) {
        this.whoseTurn = team;
        this.gameState = state; //orange decipherer, orange agent, puprle decipherer, purple agent
        this.clue = clue;
        this.numberOfWords = numberOfWords;

    }

    setWhoseTurn(team) {
        this.whoseTurn = team;
        //maybe set property whoseTurn on the team object??
    }
}

//Global vars
let themePacks;
let wordList = [];
let weightList = [];
let team1 = new Team("Orange", "Alice", "Charlie", 9);
let team2 = new Team("Purple", "Bob", "Dale", 8);
const jsonURL = 'https://jraimuu.github.io/Thematle/themePacks.json';

// fetch(jsonURL).then(response => {
//     if (!response.ok) {
//         throw new Error('There is a problem with the network response');
//     }
//     return response.json();
// }).then(data => {
//     themePacks = data;
//     // tuple = unpackageCards("MedicalList");
//     // weights = tuple.weights;
//     // words = tuple.words;
//     // weightedRandom(words, weights);
//     // initializeGame();

// }).catch(error => {
//     console.error('Error fetching JSON:', error);
// });

async function fetchData() {
    try {
        const response = await fetch(jsonURL);
        if (!response.ok) {
            throw new Error('There is a problem with the network response');
        }
        const data = await response.json();
        themePacks = data; //initialize global variable containing json data
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}



window.addEventListener('load', async function () {
    await fetchData();
    initializeGame();
});



/**
 * TODO: After each guess a player makes:
 * update the card icon
 * decrement the score: if card.color == orange: +1 orange; if card.color == purple: +1 purple 
 * check if the score is 0, if it is then that team wins
 * 
 * #TODO: Gamestate
 * after each button press, we set the game state and whoseturn
 * 
 */



//This will store the avatar icons that will update the icons displayed next to the score
//each time a players guesses a card
const nextAvatar = [
    // './assets/image1.png',
    // './assets/image2.png',
    // './assets/image3.png',
];

function setupGameConfig() {
    //Prompt to choose a themepack
    //Prompt to choose a team
    //Prompt to set agents and decipherers with names for each team
    // team1 = Team("Orange", decipherer1, agent1, 9);
    // team2 = Team("Purple", decipherer2, agent2, 8);
    //Dismount the modal and call initializeGame
}

async function initializeGame() {

    // create cards
    // shuffle()
    unpackageThemePack("MedicalList");
    generateTeamWords();


}

function createCards() {
    //when making the card instance, include the default icon
    //Card(id, type, "word", false, "./assets/unknown-mask.png") //creates an instance of the card
}

/**
 * At the start of the game randomly choose 
 */
function shuffle() {
    //Randomly indexes the cards on the board so they arent in the same
    //place each game instance
}

/**
 * Picks the random item based on its weight.
 * source: https://dev.to/trekhleb/weighted-random-algorithm-in-javascript-1pdc
 */
function weightedRandom() {
    //RANDOM selection ALGORITHM to choose words randomly from
    //the topics in the words object
    //Also note that the topic will also be randomly chosen
    const cumulativeWeights = [];

    for (let i = 0; i < weightList.length; i += 1) {
        cumulativeWeights[i] = weightList[i] + (weightList[i - 1] || 0); //or it with zero for base case
    }

    const totalCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = totalCumulativeWeight * Math.random(); //generate a random number to compare with index

    for (let wordIndex = 0; wordIndex < wordList.length; wordIndex += 1) {
        //if the weight at index[i] >= random float
        if (cumulativeWeights[wordIndex] >= randomNumber) {
            // console.log("Generated word: ", wordList[wordIndex]);
            return wordIndex;
        }
    }
}

/**
 * Function to update the cards contents including the image, color, and word
 * depending on the context
 */
function updateCard() {
    //get the card at that index or with that id, depending on the implementation
    setCardIcon("path");
    //dismount word div and h3

}

function unpackageThemePack(theme) {

    // console.log("Themepacks ",themePacks);
    tupleArr = themePacks[theme];
    console.log(tupleArr)
    tupleArr.forEach(element => {
        wordList.push(element.word);
        weightList.push(element.weight);
    });

    // return { words: wordList, weights: weightList }
}

function generateTeamWords() {
    let counter = 0;
    let notInTeam1List;
    let notInTeam2List;

    while (counter < team1.score + team2.score) {
        wordIndex = weightedRandom();
        word = wordList[wordIndex];
        notInTeam1List = !team1.words.includes(word);
        notInTeam2List = !team2.words.includes(word);
        // console.log(wordIndex);
        if (notInTeam1List && notInTeam2List && counter < team1.score) { //append to team1 list while the counter is less than team1's score 
            team1.appendWord(word);
            counter++;
        }
        else if (notInTeam1List && notInTeam2List && counter < team2.score + team1.score) {
            team2.appendWord(word);
            counter++;
        }
        else {
            console.log("Duplicate word! generating new word");
        }
    }
    console.log("Team 1's words ", team1.getWords());
    console.log("Team 2's words ", team2.getWords());
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

