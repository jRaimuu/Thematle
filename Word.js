export default class Word {
    constructor(word, weight) {
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

    //Helper functions

    appendWordList(word) {
        this.wordList.push(word);
    }

    appendWeightList(weight) {
        this.weightList.push(weight);
    }

}

/**
 * 
 * Weighted Random ALGORITHM to choose words randomly based on weight from the wordlist
 * 
 * Source: https://dev.to/trekhleb/weighted-random-algorithm-in-javascript-1pdc
 * 
 * @param {Array} wordList list of words from the chosen theme pack
 * @param {Array} weightList corresponding weights to the wordlist
 * @returns 
 */
export function weightedRandom(wordList, weightList) {
    
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