import Card from './Card.js'
import Team from './Team.js'
import GameContext, { shuffle } from './GameContext.js'
import Word, { weightedRandom } from './Word.js'

// let coverCards = [
//     "./assets/noun-boss-990401.png",
//     "./assets/noun-child-990391.png",
//     "./assets/noun-gental-man-990456.png",
//     "./assets/noun-guard-990463.png",
//     "./assets/noun-police-990436.png",
//     "./assets/noun-spy-990425.png",
//     "./assets/noun-thief-3736262.png",
//     "./assets/noun-young-990402.png",
//     "./assets/noun-old-man-990433.png"
// ]
let team1 = new Team("team1", "Alice", "Charlie", 9);
let team2 = new Team("team2", "Bob", "Dale", 8);
let gameContext = new GameContext(team1, "decipherer", undefined, undefined, [], []);
const generator = iconGenerator();


export function generateTeamWords(wordList, weightList) {
    // TODO: after generating the word, add the weight to a running total for team1 and team2
    // Take the difference between total weight of team1 and team2 to calculate the deviation; generate a new word if the deviation is too high
    // (ex. team1 might have more words that are of lesser weight to team2, giving them an unfair advantage)

    let counter = 0;
    let notInTeam1List;
    let notInTeam2List;
    let notInWildcardList;

    while (counter < 25) {
        let wordIndex = weightedRandom(wordList, weightList); // call weightedRandom algorithm to generate a new word and return the index of that word
        let word = wordList[wordIndex] // get the generated word in wordList corresponding to the generated wordIndex

        notInTeam1List = !team1.getWords().includes(word); //checks if the generated word is NOT in team1 list
        notInTeam2List = !team2.getWords().includes(word); //checks if the generated word is NOT in team2 list
        notInWildcardList = !gameContext.getWildCardList().includes(word); //checks if the generated word is NOT in wildcard list

        if (notInTeam1List && counter < 9) {
            team1.appendWord(word);
            wordList.splice(wordIndex, 1); //remove the word from the wordList 
            weightList.splice(wordIndex, 1); //remove the corresponding weight from the weightList
            counter++;
        }
        else if (notInTeam1List && notInTeam2List && counter >= 9 && counter < 17) {
            team2.appendWord(word);
            wordList.splice(wordIndex, 1); //remove the word from the wordList 
            weightList.splice(wordIndex, 1); //remove the corresponding weight from the weightList
            counter++;
        }
        else if (notInTeam1List && notInTeam2List && notInWildcardList && counter >= 17) { //checks if the generated word is NOT in team1 and NOT in team 2 list & NOT in wildcard List
            gameContext.appendWildCardList(word);
            wordList.splice(wordIndex, 1); //remove the word from the wordList 
            weightList.splice(wordIndex, 1); //remove the corresponding weight from the weightList
            counter++;
        }
        else {
            console.log(`Duplicate word: ${word}! generating new word`);
        }
    }
    console.log("Team 1's words ", team1.getWords());
    console.log("Team 2's words ", team2.getWords());
    console.log("Wildcard words ", gameContext.getWildCardList());
}

export function* iconGenerator() {
    const coverCards = [
        "./assets/noun-boss-990401.png",
        "./assets/noun-child-990391.png",
        "./assets/noun-gental-man-990456.png",
        "./assets/noun-guard-990463.png",
        "./assets/noun-police-990436.png",
        "./assets/noun-spy-990425.png",
        "./assets/noun-thief-3736262.png",
        "./assets/noun-young-990402.png",
        "./assets/noun-old-man-990433.png"
    ];
    let counter = 0;
    while (counter < coverCards.length) {
        yield coverCards[counter];
        counter = (counter + 1) % 9;
    }
}


/**Game context related functions */


export function changeGameState(cardList) {
    const state = gameContext.getgameState();
    displayCountdown();

    if (state == "agent") {
        console.log("State Agent");
        displayWhoseTurn();
        const turn = gameContext.getActiveTeam();
        const filterdcardList = cardList.filter(cardProperty => cardProperty.getCardGuesed() == false); //filter out the card that are true (i.e. dont hide the ones already guessed)

        filterdcardList.forEach(cardProperty => {
            updateCardToUnknown(cardProperty); //update the cards to display as they should for the agents view
        });
        revealClue();
    }
    else {
        console.log("State Decipherer");
        displayWhoseTurn();
        const filterdcardList = cardList.filter(cardProperty => cardProperty.getCardGuesed() == true); //filter out the card that are false (i.e. dont hide the ones not yet guessed)

        cardList.forEach(cardProperty => {
            updateCardToUnguessed(cardProperty);
        });

        filterdcardList.forEach(cardProperty => {
            updateCardToGuessed(cardProperty);
        });
        displayInput();
    }
}

export function checkCardType(cardType, cardList) {
    const activeTeam = gameContext.getActiveTeam();

    if (cardType !== activeTeam && cardType !== "bomb") {
        const oppositeTeam = (activeTeam === team1) ? team2 : team1 //if active team == team1 then set to team2; else team1
        gameContext.setActiveTeam(oppositeTeam); //switch the active team to other team
        gameContext.setgameState("decipherer");  //switch the game state to agent
        console.log("Nex team ", oppositeTeam);

        changeGameState(cardList)
    }

}


/**Score related Functions */


/**
 * Decrements the score depending on the team
 * @param {String} type - type of team
 */
export function updateTeamScore(type) {

    if (type == "bomb") {
        const activeTeam = gameContext.getActiveTeam();
        const oppositeTeam = (activeTeam === team1) ? team2 : team1
        const score = oppositeTeam.getScore();
        for (let i = score; i > 0; i--) {
            decrementTeamScore(oppositeTeam);
        }
        displayScores();
        checkScore(oppositeTeam);
    }
    else if (type == team1 || type == team2) {
        decrementTeamScore(type);
        displayScores();
        checkScore(type);
    }
}

//#Team Class
export function decrementTeamScore(team) {
    const scoreID = team.getTeamName() + "-score"; //create the id of the score container by concat teamName with -score
    const teamScore = document.getElementById(scoreID); //get the element with that score ID
    team.decrementScore(); //decrement the score of that team
    teamScore.textContent = team.getScore(); //set the new text content of the score
}

//#Team Class
export function checkScore(team) {
    const score = team.getScore();

    if (score <= 0) {
        if (team == team1) {
            const message = "Orange Team Win"
            displayGameOver(message);
        }
        else {
            const message = "Purple Team Win"
            displayGameOver(message);
        }

    }
}


/**Dom Manipulation Related Functions */


export function createCards() {
    let uniqueID = 0;
    let cardList = gameContext.getCardInstancesArr();
    //when making the card instance, include the default icon
    //Card(id, type, "word", false, "./assets/unknown-mask.png") //creates an instance of the card

    const cardType = [
        { name: team1, words: team1.words, count: 9 },
        { name: team2, words: team2.words, count: 8 },
        { name: "neutral", words: gameContext.getWildCardList(), count: 7 },
        { name: "bomb", words: gameContext.getWildCardList(), count: 1 }
    ];

    //make a new card for each of the types in the cardType array
    for (const type of cardType) {
        for (let i = 0; i < type.count; i++) {
            gameContext.appendCardInstancesArr(new Card(uniqueID++, type.name, type.words[i], false, "./assets/unknown-mask.png"));
        }
    }

    shuffle(cardList);// create a randomized order to display the cards

    cardList.forEach(cardProperty => {
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

    });
}

/**
 * Function to update the cards contents including the image, color, and word
 * depending on the context
 */
export function updateCardToGuessed(cardProperty) {
    let cardType = cardProperty.getCardType();
    const cardButton = document.getElementById(cardProperty.getCardID());
    const cardIcon = cardButton.querySelector("img");
    const cardContent = cardButton.querySelector("div");

    cardButton.classList.remove("unknown-card");
    cardContent.classList.remove("bg-wild-card-word");

    if (cardType == team1) {
        cardButton.classList.add("orange-guessed-card");
        cardContent.classList.add("bg-orange-card-word");
        cardIcon.src = generator.next().value;
    }
    else if (cardType == team2) {
        cardButton.classList.add("purple-guessed-card");
        cardContent.classList.add("bg-purple-card-word");
        cardIcon.src = generator.next().value;
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

function updateCardToUnguessed(cardProperty) {

    let cardType = cardProperty.getCardType();
    const cardButton = document.getElementById(cardProperty.getCardID());
    const cardIcon = cardButton.querySelector("img");
    const cardContent = cardButton.querySelector("div");

    cardIcon.src = './assets/unknown-mask.png';

    if (cardType == team1) {
        cardButton.className = "orange-guessed-card card-shadow h-align-card";
        cardContent.className = "bg-orange-card-word inset-shadow";
    }
    else if (cardType == team2) {
        cardButton.className = "purple-guessed-card card-shadow h-align-card";
        cardContent.className = "bg-purple-card-word inset-shadow";
    }
    else if (cardType == "bomb") {
        cardButton.className = "black-guessed-card card-shadow h-align-card";
        cardContent.className = "bg-black-card-word inset-shadow";
    }
    else {
        cardButton.className = "wild-guessed-card card-shadow h-align-card";
        cardContent.className = "bg-wild-card-word inset-shadow";
    }

}

/**
 * 
 * @param {Card} cardProperty - the Card object for that index of cardInstanceArr
 */
export function updateCardToUnknown(cardProperty) {

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
export function revealClue() {
    const clueContainer = document.getElementById("clue-container");
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

    const endTurn = document.createElement("button");
    endTurn.className = "end-btn input-font card-shadow";
    endTurn.type = "submit";
    endTurn.id = "end-turn"
    endTurn.textContent = "End Turn";

    bgClue.appendChild(textClue);
    bgDegree.appendChild(textDegree);
    surroundClue.appendChild(bgClue);
    surroundClue.appendChild(bgDegree);
    surroundClue.appendChild(endTurn);
    const newChild = surroundClue;
    clueContainer.replaceChild(newChild, oldChild);

    createEndTurnListener();
}

export function displayInput() {
    const clueContainer = document.getElementById("clue-container");

    // creating a new form element for the clue input
    const newClueForm = document.createElement("form");
    newClueForm.id = "clue-form";

    // creatibg the input field
    const clueInput = document.createElement("input");
    clueInput.className = "input-font input-style card-shadow";
    clueInput.type = "text";
    clueInput.id = "clue";
    clueInput.name = "decipherer-clue";
    clueInput.placeholder = "Type your clue here";

    // Create the select dropdown
    const clueDropdown = document.createElement("select");
    clueDropdown.className = "h-align input-font card-shadow";
    clueDropdown.id = "clue-dropdown";
    clueDropdown.name = "clue-degree";

    // adding options to the dropdown
    for (let i = 0; i <= 9; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        clueDropdown.appendChild(option);
    }

    // creating the submit button
    const submitButton = document.createElement("button");
    submitButton.className = "submit-btn input-font clue-btn card-shadow";
    submitButton.type = "submit";
    submitButton.textContent = "Give Clue";

    newClueForm.appendChild(clueInput);
    newClueForm.appendChild(clueDropdown);
    newClueForm.appendChild(submitButton);

    clueContainer.innerHTML = ''; // Clear the existing content
    clueContainer.appendChild(newClueForm);

    createInputListerner();
}

function displayNextScoreIcon() {
    const iterator = generator;
    const currentValue = iterator.next().value;

    const team1Icon = document.getElementById("team1-img");
    const team2Icon = document.getElementById("team2-img");

    team1Icon.src = currentValue;
    team2Icon.src = currentValue;
}

export function displayScores() {
    const team2Score = document.getElementById("team2-score");
    const team1Score = document.getElementById("team1-score");

    team1Score.textContent = team1.getScore();
    team2Score.textContent = team2.getScore();
}

export function displayWhoseTurn() {
    const team = gameContext.getActiveTeam();
    console.log(team);
    const state = gameContext.getgameState();

    const team1DecipherElement = document.getElementById("team1-decipher");
    const team1AgentElement = document.getElementById("team1-agent");
    const team2DecipherElement = document.getElementById("team2-decipher");
    const team2AgentElement = document.getElementById("team2-agent");

    //Restore to the original text
    team1DecipherElement.textContent = "DECIPHERER";
    team1AgentElement.textContent = "AGENT";
    team2DecipherElement.textContent = "DECIPHERER";
    team2AgentElement.textContent = "AGENT";

    if (team == team1) {
        if (state == "decipherer") {
            team1DecipherElement.textContent += "👈";
        }
        else {
            team1AgentElement.textContent += "👈";
        }
    }
    else {
        if (state == "decipherer") {
            team2DecipherElement.textContent += "👈";
        }
        else {
            team2AgentElement.textContent += "👈";
        }
    }
}

function toggleCountdown() {
    const backgroundDiv = document.getElementById("countdown-div");
    backgroundDiv.classList.toggle("hidden");
}

/**
 * Source: https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
 */
function displayCountdown() {
    let timeleft = 3;
    toggleCountdown();

    function updateCountdown() {
        if (timeleft <= 0) {
            toggleCountdown();
        } else {
            document.getElementById("countdown").textContent = timeleft + " seconds remaining";
            timeleft -= 1;
            setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown(); // Start the countdown
}

function displayGameOver(message) {
    // outer div with class "background-blur"
    const backgroundBlurDiv = document.createElement('div');
    backgroundBlurDiv.classList.add('background-blur');
    backgroundBlurDiv.classList.add('h-align-card');

    // div background
    const gameOverDiv = document.createElement('div');
    gameOverDiv.classList.add('game-over-bg');
    gameOverDiv.classList.add('pattern');
    gameOverDiv.classList.add('glow-shadow');
    gameOverDiv.classList.add('align-text');

    // game over text
    const gameOverText = document.createElement('p');
    gameOverText.classList.add('game-over-text');
    gameOverText.classList.add('v-center');
    gameOverText.textContent = message;

    const restartButton = document.createElement("button");
    restartButton.className = "submit-btn input-font clue-btn card-shadow align-text";
    restartButton.type = "submit";
    restartButton.textContent = "Restart";
    restartButton.id = "restart-button";

    gameOverDiv.appendChild(gameOverText);
    gameOverDiv.appendChild(restartButton);
    backgroundBlurDiv.appendChild(gameOverDiv);
    document.body.appendChild(backgroundBlurDiv);

    restartButton.addEventListener("click", function () {
        location.reload();
    });
}


/** EVENT LISTENERS **/


/**
* Event listener for each button on the grid
*/
export function createCardListeners() {
    let cardList = gameContext.getCardInstancesArr();
    cardList.forEach(cardProperty => {

        const cardID = cardProperty.getCardID();
        const cardButton = document.getElementById(cardID);

        cardButton.addEventListener("click", () => {
            //allow user to interact with the card if the game state is agent and the card has not yet been gueesed (i.e. == false)
            if (gameContext.getgameState() === "agent" && !cardProperty.getCardGuesed()) { 
                const cardType = cardProperty.getCardType();
                cardProperty.setCardGuessed(true); //set the card as guessed
                updateCardToGuessed(cardProperty);
                updateTeamScore(cardType);
                displayNextScoreIcon();
                checkCardType(cardType, cardList);
            }
        });
    });

}

export function createInputListerner() {
    let clueForm;
    clueForm = document.getElementById("clue-form");
    clueForm.addEventListener("submit", function (event) {
        event.preventDefault();

        gameContext.setgameState("agent")
        const cardList = gameContext.getCardInstancesArr();
        const clueInput = document.getElementById("clue");
        const clueDropdown = document.getElementById("clue-dropdown");

        const clueWord = clueInput.value;
        const clueDegree = parseInt(clueDropdown.value);

        gameContext.setClue(clueWord);
        gameContext.setNumberOfWords(clueDegree);

        changeGameState(cardList);
    });
}

function createEndTurnListener() {
    const cardList = gameContext.getCardInstancesArr();
    const activeTeam = gameContext.getActiveTeam();
    const oppositeTeam = (activeTeam === team1) ? team2 : team1 //if active team == team1 then set to team2; else team1

    const button = document.getElementById("end-turn");
    button.addEventListener('click', () => {
        gameContext.setActiveTeam(oppositeTeam); //switch the active team to other team
        gameContext.setgameState("decipherer");
        changeGameState(cardList);
    });
}