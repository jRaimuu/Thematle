export default class Word {
    constructor(word, weight, cardInstance) {
        this.wordList = word;
        this.weightList = weight;
    }

    // Setter for wordList
    setWordList(word) {
        this.wordList = word;
    }

    // Getter for wordList
    getWordList() {
        return this.wordList;
    }

    // Setter for weightList
    setWeightList(weight) {
        this.weightList = weight;
    }

    // Getter for weightList
    getWeightList() {
        return this.weightList;
    }

    //Helper function

    appendWordList(word) {
        this.wordList.push(word);
    }

    appendWeightList(weight) {
        this.weightList.push(weight);
    }

    // getElementAtIndex(index) {
    //     return this.wordList[index];
    // }
}
