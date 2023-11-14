### Weighted Random Algorithm 🎲

* The purpose of this algorithm is to randomly generate words with their relative weights based on their semantic relationship to the theme.
* A word is said to have a *high semantic relationship* if the word is strongly associated with the theme
  * In this case, these words will have a lower weight, since we do not want words strongly associated with the theme to appear often
* A word is said to have a *low semantic relationship* if the word has a low degree of association with the theme
  * In this case, these words will have a higher weight, since we want words with weak association with the theme to appear more often (so the game isn't too easy)


* The function weightedRandom works by taking in an array of words and an array of weights.
  * It is important that the length of both arrays is the SAME
* The algorithm proceeds by calculating cumulative weights in an array. It does this by adding the `nth` weight to the cumulative weight of the previous (`n-1`) weights in the array.
  * If `n-1` == null then the base case is 0
  * We can imagine these two weights added together as buckets, so the elements with the larger weights will have larger buckets; therefore, will have a greater chance of being picked
  * Ex. Here, bacon will have a higher probability of being chosen because it has the greatest weight
  * `words =  [ '🍞', '🥓', '🥞' ]`
  * `weights = [  3,    4,    1  ]`
  * `CumulativeWeights = [  3,    7,    8  ]`
      * (i.e. if you threw a ball into a bucket randomly, it has a higher chance of landing in the 🥓 bucket because it is larger than the others)
* After getting the cumulative weights, it generates a random number between 0 and the length of the cumulative weights array.
* It then iterates through the cumulative weights array, comparing the weight at that index with the random number.
* Eventually, if the weight at some index `i` is greater than or equal to the random number, then the algorithm returns that index `i`.

### `GenerateTeamWords` and `CreateCards` 🃏

* These functions serve to generate the words for each team's `wordList` and display them on the grid as cards corresponding to each team.

* **`GenerateTeamWords`**
  * Since we require 25 words on the board, we start with a while loop that does the following:
    * It calls weightedRandom with the `wordList` and `weightList` to generate a random index associated with the randomly generated number (as explained above).
    * It finds the word in `wordList` that matches with that index
      * For example, suppose at index 4 it matches the word '🧬'
    * The function now reaches a series of if conditions that check each team's list to ensure that they contain the **UNIQUE** word '🧬'
      * For example `else if (notInTeam1List && notInTeam2List && counter >= 9 && counter < 17)` 
        is only true if '🧬' is NOT in Team1's list, NOT in Team2's list, it checks that the counter is >= 9 (since we have already filled Team1's `wordList` with the 9 words), but also checks that the counter is < 17 (since we only want Team2 to have 8 words). *Note that Team1 is initialized with 9 words since they start first*
    * When one of the conditions passes, the program ADDS the word '🧬' to the corresponding team `wordList`, REMOVES '🧬' from the global `wordList` and `weightList` to avoid choosing duplicate words in future iterations, and increments the counter
      * *Note that the counter is not incremented if a duplicate word is generated. In this case, we just generate a new word*
    * The function continues to do this until each team's worlist is filled

* **`CreateCards`**
  * The function starts by declaring an structure `cardType` that will help us iterate through each of team's (or neutrals') `wordLists`
  * This algorithm generates a set of cards based on predefined card types. The cardType array specifies the characteristics of each card `type`, including the name, associated words, and the count of cards to be generated for that `type`. The algorithm iterates through each `type` in the cardType array and, for each `type`, creates a specified number of `cardInstances` according to the defined count.
    * TLDR: we just append a new `cardInstance` to a list of card instances for each teams `wordList`
  * The program then calls `Fisher–Yates Shuffle ALGORITHM` with the list of card instances to shuffle the cards on the board so they aren't displayed in the same order that they were generated.
  * Lastly, we create a new card on the interface for each `cardInstance` in the list of cards


  

      

