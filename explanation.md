### Weighted Random Algorithm

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
      * (i.e. if you threw a ball into a bucket randomly, it has a higher chance of landing in the bacon bucket because it is larger than the others)
* After getting the cumulative weights, it generates a random number between 0 and the length of the cumulative weights array.
* It then iterates through the cumulative weights array, comparing the weight element at that index with the random number.
* Eventually, if the weight at some index `i` is greater than or equal to the random number, then the algorithm returns that index `i`.

### `GenerateTeamWords`
