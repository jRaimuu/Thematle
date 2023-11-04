import Card from './Card.js'
import Team from './Team.js'
import GameContext from './GameContext.js'
import Word from './Word.js'
import * as ControllerModule from './ThematleController.js'

// Course: SENG 513
// Date: Oct 1, 2023
// Assignment 1
// Name: Liam Sarjeant
// UCID: 30150737 
// import Words from './GameContext';

/**
 * TODO: After each guess a player makes:
 * update the card icon
 * decrement the score: if card.color == orange: +1 orange; if card.color == purple: +1 purple 
 * check if the score is 0, if it is then that team wins
 * 
 * #TODO: Gamestate
 * after each button press, we set the game state and activeTeam
 * 
 * If game state == ex.agent && turn == orange
 * them change the classname for each type to show orange, by selecting cards with type: "orange" 
 * 
 * 
 */



//Global vars
let themePacks; //export as module
const jsonURL = 'https://jraimuu.github.io/Thematle/themePacks.json';

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
    const themePack = unpackageThemePack("NatureList");
    const wordList = themePack.getWordList();
    const weightList = themePack.getWeightList();
    ControllerModule.generateTeamWords(wordList, weightList);
    ControllerModule.createCards();
    ControllerModule.createCardListeners();
    ControllerModule.displayScores();
}

//#Card class
function unpackageThemePack(theme) {
    const newWordList = new Word([], []);
    const tupleArr = themePacks[theme];

    console.log(tupleArr);
    tupleArr.forEach(element => {
        newWordList.appendWordList(element.word);
        newWordList.appendWeightList(element.weight);
    });

    console.log(newWordList.getWordList());
    console.log(newWordList.getWeightList());

    return newWordList;
}