export default class Card {
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