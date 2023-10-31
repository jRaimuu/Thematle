// Course: SENG 513
// Date: Oct 1, 2023
// Assignment 1
// Name: Liam Sarjeant
// UCID: 30150737 

class Team {
    constructor(teamName, decipherer, agent, score) {
        this.teamName = teamName;
        this.decipherer = decipherer;
        this.agent = agent;
        this.words = [];
        this.win = false;
        this.score = score;
    }

    //Getter and Setters

    setTeamName(name) {
        this.teamName = name;
    }

    getTeamName() {
        return this.teamName;
    }

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

    getCardID() {
        return this.cardID;
    }

    getCardType() {
        return this.cardType;
    }

    setCardGuessed(state) {
        this.cardGuessed = state;
    }

    getCardGuesed() {
        return this.cardGuessed;
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
let coverCards = [
    "./assets/noun-boss-990401.png",
    "./assets/noun-child-990391.png",
    "./assets/noun-gental-man-990456.png",
    "./assets/noun-guard-990463.png",
    "./assets/noun-police-990436.png",
    "./assets/noun-spy-990425.png",
    "./assets/noun-thief-3736262.png",
    "./assets/noun-young-990402.png",
    "./assets/noun-old-man-990433.png"
]
let themePacks;
let wordList = [];
let weightList = [];
let cardInstancesArr = [];
let wildCardList = [];
let team1 = new Team("team1", "Alice", "Charlie", 9);
let team2 = new Team("team2", "Bob", "Dale", 8);
let gameContext = new GameContext(team1, "decipherer", undefined, undefined);
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



window.addEventListener('load', function () {
    fetchData().then(() => {
        initializeGame();
    })
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

function initializeGame() {

    //setgame state
    unpackageThemePack("NatureList");
    generateTeamWords();
    createCards();
    createCardListeners();
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
        { name: team1, words: team1.words, count: 9 },
        { name: team2, words: team2.words, count: 8 },
        { name: "neutral", words: wildCardList, count: 7 },
        { name: "bomb", words: wildCardList, count: 1 }
    ];

    //make a new card for each of the types in the cardType array
    for (const type of cardType) {
        for (let i = 0; i < type.count; i++) {
            cardInstancesArr.push(new Card(uniqueID++, type.name, type.words[i], false, "./assets/unknown-mask.png"));
        }
    }

    shuffle();// create a randomized order to display the cards

    cardInstancesArr.forEach(cardProperty => {
        const cardGrid = document.getElementById("card-grid");
        let cardButton = document.createElement("button");
        let cardContent = document.createElement("div");

        cardButton.id = cardProperty.cardID;

        if (cardProperty.cardType == team1) {
            cardButton.className = "orange-guessed-card card-shadow h-align-card";
            cardContent.className = "bg-orange-card-word inset-shadow";
        }
        else if (cardProperty.cardType == team2) {
            cardButton.className = "purple-guessed-card card-shadow h-align-card";
            cardContent.className = "bg-purple-card-word inset-shadow";
        }
        else if (cardProperty.cardType == "bomb") {
            cardButton.className = "black-guessed-card card-shadow h-align-card";
            cardContent.className = "bg-black-card-word inset-shadow";
        }
        else {
            cardButton.className = "wild-guessed-card card-shadow h-align-card";
            cardContent.className = "bg-wild-card-word inset-shadow";
        }

        const cardImage = document.createElement("img");
        cardImage.className = "cover";
        cardImage.src = cardProperty.cardIcon;

        const h3 = document.createElement("h3");
        h3.textContent = cardProperty.cardWord;

        cardContent.appendChild(h3);
        cardButton.appendChild(cardImage);
        cardButton.appendChild(cardContent);
        cardGrid.appendChild(cardButton);

    })
}

/**
 * Function to update the cards contents including the image, color, and word
 * depending on the context
 */
function updateCardToGuessed(cardProperty) {

    let cardType = cardProperty.getCardType();
    const cardButton = document.getElementById(cardProperty.getCardID());
    const cardIcon = cardButton.querySelector("img");
    const cardContent = cardButton.querySelector("div");

    cardButton.classList.remove("unknown-card");
    cardContent.classList.remove("bg-wild-card-word");

    if (cardType == team1) {
        score = cardType.getScore();
        score = Math.abs(score) % 9;
        cardButton.classList.add("orange-guessed-card");
        cardContent.classList.add("bg-orange-card-word");
        cardIcon.src = coverCards[score];
    }
    else if (cardType == team2) {
        score = cardType.getScore();
        score = Math.abs(score) % 9;
        cardButton.classList.add("purple-guessed-card");
        cardContent.classList.add("bg-purple-card-word");
        cardIcon.src = coverCards[score];
    }
    else if (cardType == "bomb") {
        cardButton.classList.add("black-guessed-card");
        cardContent.classList.add("bg-black-card-word");
        cardIcon.src = "./assets/noun-bomb-5543824.png";
    }
    else {
        cardButton.classList.add("wild-guessed-card");
        cardContent.classList.add("bg-wild-card-word");
        cardIcon.src = "./assets/noun-scarecrow-5450686.png";
    }

}

/**
 * 
 * @param {Card} cardProperty - the Card object for that index of cardInstanceArr
 */
function updateCardToUnknown(cardProperty) {

    //TODO change image back
    const cardButton = document.getElementById(cardProperty.getCardID());
    const cardContent = cardButton.querySelector("div");

    if (cardProperty.getCardType() == team1) {
        cardButton.classList.remove("orange-guessed-card");
        cardContent.classList.remove("bg-orange-card-word");
    }
    else if (cardProperty.getCardType() == team2) {
        cardButton.classList.remove("purple-guessed-card");
        cardContent.classList.remove("bg-purple-card-word");
    }
    else {
        cardButton.classList.remove("black-guessed-card");
        cardContent.classList.remove("bg-black-card-word");
    }

    cardButton.classList.add("unknown-card"); //maybe change to wild-card-gueesed
    cardContent.classList.add("bg-wild-card-word");
}

/**
 * Updates the dom to show all players the clue at play
 */
function revealClue() {
    let clueContainer = document.getElementById("clue-container");
    const oldChild = document.getElementById("clue-form");

    const surroundClue = document.createElement("div");
    surroundClue.className = "flex-row margin-auto";

    const bgClue = document.createElement("div");
    bgClue.className = "bg-show-clue";

    const bgDegree = document.createElement("div");
    bgDegree.className = "bg-show-degree"

    const textClue = document.createElement("h4");
    textClue.id = "clue-text";
    textClue.textContent = gameContext.getClue();

    const textDegree = document.createElement("h4");
    textDegree.id = "clue-text";
    textDegree.textContent = gameContext.getNumberOfWords();

    bgClue.appendChild(textClue);
    bgDegree.appendChild(textDegree);
    surroundClue.appendChild(bgClue);
    surroundClue.appendChild(bgDegree);
    const newChild = surroundClue;
    clueContainer.replaceChild(newChild, oldChild);
}

function shuffle() {
    let randomIndex;
    let currentIndex = cardInstancesArr.length;

    // While there is still cards to shuffle
    while (currentIndex > 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // ...and swap it with the current element.
        [cardInstancesArr[currentIndex], cardInstancesArr[randomIndex]] = [
            cardInstancesArr[randomIndex], cardInstancesArr[currentIndex]
        ];
    }

    return cardInstancesArr;
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
            return wordIndex;
        }
    }
}


function generateTeamWords() {
    // TODO: after generating the word, add the weight to a running total for team1 and team2
    // Take the difference between total weight of team1 and team2 to calculate the deviation; generate a new word if the deviation is too high
    // (ex. team1 might have more words that are of lesser weight to team2, giving them an unfair advantage)

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

function changeGameState() {


    /**TODO
     * add new param called state
     * if (state == decipherer) do below code
    */

    gameContext.setgameState("agent"); //Set the game state to the agent
    const turn = gameContext.getWhoseTurn();

    const cardList = cardInstancesArr.filter(cardProperty => cardProperty.getCardGuesed() == false); //filter out the card that are true (i.e. dont hide the ones already guessed)
    cardList.forEach(cardProperty => {
        updateCardToUnknown(cardProperty); //update the cards to display as they should for the agents view
    });

    revealClue();

    /**TODO
     * else (state == agent) do below code
     */
    // changeGameViewDecipherer();

    console.log(gameContext.getgameState());
}

//TODO: make a function to change the card graphic depending on the cardType
//Merge this with changeGameViewAgent so that you can just change the card more modularly
//As an example, refer to decrementScore, where you just pass in the team, and depending on the
//team it changes color
function changeCardState(cardProperty) {
    cardProperty.setCardGuessed(true); //set the card as guessed
    updateCardToUnknown(cardProperty);
}

/**
 * Decrements the score depending on the team
 * @param {String} type - type of team
 */
function updateTeamScore(type) {

    if (type == "bomb") {
        const activeTeam = gameContext.getWhoseTurn();
        const score = activeTeam.getScore();
        for (let i = score; i > 0; i--) {
            decrementTeamScore(activeTeam);
        }
        displayScores();
        checkScore(activeTeam);
    }
    else if (type == team1 || type == team2) {
        decrementTeamScore(type);
        displayScores();
        checkScore(type);
    }
}

// function decrementTeam1Score() {
//     const team1Score = document.getElementById("team1-score");
//     team1.decrementScore();
//     team1Score.textContent = team1.getScore();
// }

function decrementTeamScore(team) {
    const scoreID = team.getTeamName() + "-score"; //create the id of the score container by concat teamName with -score
    const teamScore = document.getElementById(scoreID); //get the element with that score ID
    team.decrementScore(); //decrement the score of that team
    teamScore.textContent = team.getScore(); //set the new text content of the score
}

function checkScore(team) {
    const score = team.getScore();

    if (score == 0) {
        //current team wins
        gameOver();
    }
    else {
        //other team wins
    }
}

function displayScores() {
    const team2Score = document.getElementById("team2-score");
    const team1Score = document.getElementById("team1-score");

    team1Score.textContent = team1.getScore();
    team2Score.textContent = team2.getScore();
}

function gameOver() {
    console.log("game over");
}




/** EVENT LISTENERS **/

/**
* Event listener for each button on the grid
*/
function createCardListeners() {

    cardInstancesArr.forEach(cardProperty => {

        const cardID = cardProperty.getCardID();
        const cardButton = document.getElementById(cardID);

        cardButton.addEventListener("click", () => {
            const cardType = cardProperty.getCardType();
            cardProperty.setCardGuessed(true); //set the card as guessed
            updateCardToGuessed(cardProperty);
            updateTeamScore(cardType);
        });
    });

}

//Clue form
let clueForm;

document.addEventListener('DOMContentLoaded', function () {

    /**
     * Event listener for input and dropdown form
     */
    clueForm = document.getElementById("clue-form");
    clueForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const clueInput = document.getElementById("clue");
        const clueDropdown = document.getElementById("clue-dropdown");

        const clueWord = clueInput.value;
        const clueDegree = parseInt(clueDropdown.value);

        gameContext.setClue(clueWord);
        gameContext.setNumberOfWords(clueDegree);

        // console.log(gameContext.getClue());
        // console.log(gameContext.getNumberOfWords());

        changeGameState();

        //change the color of the cards for the agent
        //display the clue and hide the input
    });

});


