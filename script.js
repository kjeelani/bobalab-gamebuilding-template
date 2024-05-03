

class Game {
    // This sets up a game-flow, with useful helper functions

    constructor(jsonInput) {
        // Set up your instance variables below
        this.params = jsonInput

        // You need to keep track of player movements via a string somehow
        // An example is "totalProfits|profitsOnDay1, timeTaken|profitsOnDay2, timeTaken|..."
        this.moveString = "";
        this.setupGameUI();
    }

    hide(el) {
        // Hides an HTML element
        el.classList.add('hidden');
    }

    show(el) {
        // Shows an HTML element
        el.classList.remove('hidden');
    }
    

    setupPage1View() {
        // Start showing contents or generating new elements based on params
        var page1View = document.getElementById('page-1');
        var page1Para = document.getElementById('page-1-p');
        page1Para.textContent = this.params["page-1"];

        // THIS NEEDS TO BE HERE AFTER ALL PROCESSING!
        this.show(page1View)
    }

    setupPage2View() {
        // Start showing contents or generating new elements based on params
        var page1View = document.getElementById('page-1');
        var page2Para = document.getElementById('page-2-p');
        page2Para.textContent = this.params["page-2"];
        
        // THIS NEEDS TO BE HERE AFTER ALL PROCESSING!
        this.show(page2View);
    }

    
    setupGameUI() {
        // Hides previous section and sets up next section
        var startButton = document.getElementById("start-button");
        this.hide(startButton);

        this.setupPage1View(); 
    }

    switchToPage2View() {
        // Hides previous section and sets up next section
        var page1View = document.getElementById("page-1");
        this.hide(page1View);
        this.setupPage2View();
    }

    teardownGameUI() {
        // Hides previous section and sets up next section
        var page2View = document.getElementById("page-2");
        this.hide(page2View);

        var gameOverScreen = document.getElementById("game-over");
        this.show(gameOverScreen);
    }
}

let gameState = null;
// This will be made into a JSON later for Qualtrics, for now use an object
let testInput = {
    "page-1": "Loaded Text from JavaScript for Page 1",
    "page-2": "Loaded Text from JavaScript for Page 2"
}

function startGame() {
    gameState = new Game(testInput);
}

function restartGame() {
    var startButton = document.getElementById("start-button");
    var gameOverScreen = document.getElementById("game-over");

    // Clears the game state for a new game
    gameState.show(startButton);
    gameState.hide(gameOverScreen);
    gameState = null;
}

// We add event listeners here, because onClick doesn't work on Qualtrics
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-game-btn').addEventListener('click', restartGame);
