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

    setScore(score) {
        this.score = score;
    }

    getScore() {
        return this.score;
    }


    //Helper functions
    appendWord(word) {
        this.words.push(word);
    }

    decrementScore() {
        this.score--;
    }


}

class Card {
    constructor(id, type, word, state, iconPath) {
        this.cardID = id;
        this.cardType = type;
        this.cardWord = word;
        this.cardGuessed = state;
        this.cardIcon = iconPath;
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

    getWhoseTurn() {
        return this.whoseTurn;
    }

    setgameState(state) {
        this.gameState = state;
    }

    getgameState() {
        return this.gameState;
    }

    setClue(word) {
        this.clue = word;
    }

    getClue() {
        return this.clue;
    }

    setNumberOfWords(degree) {
        this.numberOfWords = degree;
    }

    getNumberOfWords() {
        return this.numberOfWords;
    }
}

//Global vars
let themePacks;
let wordList = [];
let weightList = [];
let cardInstancesArr = [];
let wildCardList = [];
let team1 = new Team("Orange", "Alice", "Charlie", 9);
let team2 = new Team("Purple", "Bob", "Dale", 8);
let gameContext = new GameContext("team1", "decipherer", undefined, undefined);
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
 * If game state == ex.agent && turn == orange
 * them change the classname for each type to show orange, by selecting cards with type: "orange" 
 * 
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

    //setgame state
    unpackageThemePack("NatureList");
    generateTeamWords();
    createCards();
    displayScores();
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

function createCards() {
    let uniqueID = 0;
    //when making the card instance, include the default icon
    //Card(id, type, "word", false, "./assets/unknown-mask.png") //creates an instance of the card

    const cardType = [
        { name: "team1", words: team1.words, count: 9 },
        { name: "team2", words: team2.words, count: 8 },
        { name: "neutral", words: wildCardList, count: 8 }
    ];

    //make a new card for each of the types in the cardType array
    for (const type of cardType) {
        for (let i = 0; i < type.count; i++) {
            cardInstancesArr.push(new Card(uniqueID++, type.name, type.words[i], false, "./assets/unknown-mask.png"));
        }
    }


    const cardGrid = document.getElementById("card-grid")

    cardInstancesArr.sort(() => Math.random() - 0.5); // create a randomized order to display the cards
    cardInstancesArr.forEach(cardProperty => {

        const cardButton = document.createElement("button");
        cardButton.id = cardProperty.cardID;
        cardButton.className = "unknown-card card-shadow h-align-card";
        // cardElement.className = card.type

        const cardImage = document.createElement("img");
        cardImage.className = "cover";
        cardImage.src = cardProperty.cardIcon;

        const cardContent = document.createElement("div");
        cardContent.className = "bg-wild-card-word inset-shadow";

        const h3 = document.createElement("h3");
        h3.textContent = cardProperty.cardWord;

        cardContent.appendChild(h3);
        cardButton.appendChild(cardImage);
        cardButton.appendChild(cardContent);
        cardGrid.appendChild(cardButton);

    })

}

/**
 * Picks the random item based on its weight. Lower weights correspond to words of greater association to the topic
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

function generateTeamWords() {
    // TODO: after generating the word, add the weight to a running total that for team1 and team2
    // Take the difference between total weight of team1 and team2 to calculate the deviation; generate a new word if the deviation is too high
    // (i.e. team1 might have more words that are of lesser weight to team2, giving them an unfair advantage)

    let counter = 0;
    let notInTeam1List;
    let notInTeam2List;
    let notInWildcardList;

    while (counter < 25) {
        wordIndex = weightedRandom(); // call weightedRandom algorithm to generate a new word and return the index of that word
        word = wordList[wordIndex]; // get the generated word in wordList corresponding to the generated wordIndex

        notInTeam1List = !team1.words.includes(word); //checks if the generated word is NOT in team1 list
        notInTeam2List = !team2.words.includes(word); //checks if the generated word is NOT in team2 list
        notInWildcardList = !wildCardList.includes(word); //checks if the generated word is NOT in wildcard list

        if (notInTeam1List && counter < 9) {
            team1.appendWord(word);
            counter++;
        }
        else if (notInTeam1List && notInTeam2List && counter >= 9 && counter < 17) {
            team2.appendWord(word);
            counter++;
        }
        else if (notInTeam1List && notInTeam2List && notInWildcardList && counter >= 17) { //checks if the generated word is NOT in team1 and NOT in team 2 list & NOT in wildcard List
            wildCardList.push(word);
            counter++;
        }
        else {
            console.log("Duplicate word! generating new word");
        }
    }
    console.log("Team 1's words ", team1.getWords());
    console.log("Team 2's words ", team2.getWords());
    console.log("Wildcard words ", wildCardList);
}

function decrementTeam1Score() {

    const team1Score = document.getElementById("team1-score");
    team1.decrementScore();
    team1Score.textContent = team1.getScore();
}

function decrementTeam2Score() {
    
    const team2Score = document.getElementById("team2-score");
    team2.decrementScore();
    team2Score.textContent = team2.getScore();
}

function displayScores() {
    const team2Score = document.getElementById("team2-score");
    const team1Score = document.getElementById("team1-score");

    team1Score.textContent = team1.getScore();
    team2Score.textContent = team2.getScore();
}

/**
 * Updates the dom to show all players the clue at play
 */
function revealClue() {
    //setContext
}

/** EVENT LISTENERS **/

//Clue form
clueForm = document.getElementById("clue-form");
clueForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const clueInput = document.getElementById("clue");
    const clueDropdown = document.getElementById("clue-dropdown");

    const clueWord = clueInput.value;
    const clueDegree = clueDropdown.value;

    gameContext.
    
    
    
    
    changeGameState()
});

function changeGameState () {
    

}
