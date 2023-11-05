
export default class Team {
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

    setWin(win) {
        this.win = win;
    }

    getWin() {
        return this.win;
    }


    //Helper functions
    appendWord(word) {
        this.words.push(word);
    }

    decrementScore() {
        this.score--;
    }
}