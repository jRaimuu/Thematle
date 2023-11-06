### My learning experience while making this project

* During this project, I learned the significance of planning the implementation of my code to gain a better understanding of its complexity. Planning guided me through the implementation process and also helped me identify flaws in my game logic.

* I realized the importance of adopting good design patterns to help structure my code, making it more modular, reusable, and scalable. Specifically, in the middle of my implementation, I faced the challenge of my single JavaScript file growing as I added more functionality. Recognizing this issue, I decided to take a step back and refactor my code to adhere to the MVC design principle.

    * As a result, I was able to gain a better understanding of the flow of my game from a more abstract point of view, as everything at a high level (e.g., Cards, GameContext, etc.) was separated into its own class.

    * This allowed me to design specific functions (controllers) for each class (model) to make them more reusable.

* While MVC helped me manage the complexity of my code, in retrospect, I believe my code could also benefit from the Observer design pattern. Many aspects of my game rely on the Game Context state, and having observers would enable multiple components to be aware of state changes and react accordingly.

* Although I had some experience with javascript going into this project, building this game helped soldify my understanding about how the frontend integrates with the backend. 

    * Given the dynamic nature of a game, I was able to better understand how to manipulate the DOM to display various states of my game.

    * However, I encountered a challenge when designing the backend code to manipulate the DOM. It felt cumbersome to create the visual aspects in CSS and then write corresponding JavaScript code to handle the dynamic changes.

    * To overcome this challenge, I found that manually designing the frontend first helped me visualize how I wanted it to appear. Then, by utilizing AI, I could efficiently implement the functions required to manipulate the DOM and display the new information. 
    
    * This approach streamlined the development process and improved the overall cohesiveness of the frontend and backend components of the game.