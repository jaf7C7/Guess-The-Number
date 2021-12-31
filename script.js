/*
 * The game has four sections:
 *     1. Greeting the player
 *     2. Choosing a range for the random number
 *     3. Guessing the number
 *     4. The end of the game
 */

/*
 * Declare some variables and define some helper functions
 */

const greetPlayer = document.querySelector('.greet-player');
const chooseRange = document.querySelector('.choose-range');
const guessField = document.getElementById('guess-field');
const guessStatus = document.querySelector('.guess-status');
const guessNumber = document.querySelector('.guess-number');
const gameOver = document.querySelector('.game-over');
const heading = document.querySelector('h1');

let remainingGuesses;
 
const updateGuessCount = (remainingGuesses) => {
    document.getElementById('remaining-guesses').textContent = remainingGuesses;
};

const continueToGame = () => {
    /* Creates a global variable */
    playerName = document.getElementById('enter-name').value;

    if (playerName === 'Faye' || playerName === 'faye') {
        heading.textContent = `Hi Faye, You're cute.`;
    } else {
        heading.textContent = `Hey ${playerName}. Guess The Number!`;
    }

    greetPlayer.classList.add('hidden');
    chooseRange.classList.remove('hidden');
    document.getElementById('min').focus();
};

const startGame = () => {
    guessField.value = '';
    guessStatus.textContent = '';
    remainingGuesses = 5;
    updateGuessCount(remainingGuesses);

    chooseRange.classList.add('hidden');
    guessNumber.classList.remove('hidden');

    document.getElementById('guess-field').focus();
};

const resetGame = () => {
    guessNumber.classList.add('hidden');
    gameOver.classList.add('hidden');
    greetPlayer.classList.remove('hidden');

    heading.textContent = 'Guess The Number!';

    document.getElementById('enter-name').focus();
};

const endGame = () => {
    guessNumber.classList.add('hidden');
    gameOver.classList.remove('hidden');

    heading.textContent = `Bye ${playerName}. See ya!`;

    document.getElementById('play-again').focus();
};

/*
 * First section: Greeting the player:
 */

/* Focus the input field */
document.getElementById('enter-name').focus();

/* Continue button */
document.getElementById('continue').addEventListener('click', continueToGame);

/*
 * Second section: Generate a random number in a given range:
 */

/* Generate Number button */
document.getElementById('generate-number').addEventListener('click', () => {

    const min = Number(document.getElementById('min').value);
    const max = Number(document.getElementById('max').value);

    const getNewRandomNumber = (min, max) => {
        const range = max - min;
        return Math.floor((Math.random() * range) + min);
    };

    /* Creates a global variable */
    targetNumber = getNewRandomNumber(min, max);

    startGame();
});

/*
 * Third section: Playing the guessing game:
 */

/* Reset button */
document.querySelector('.reset-game').addEventListener('click', resetGame);

/* Submit button */
document.getElementById('submit').addEventListener('click', () => {
    remainingGuesses--;
    updateGuessCount(remainingGuesses);

    const gameStatus = document.querySelector('.game-status');
    const guess = Number(guessField.value);

    if (remainingGuesses === 0) {
        gameStatus.textContent = "GAME OVER! No guesses remaining";
        endGame();
    }

    if (guess === targetNumber) {
        gameStatus.textContent = "You got it!! Well done.";
        endGame();

    } else if (guess > targetNumber) {
        guessStatus.textContent = `${guess} was too high! Try again.`
        guessField.value = '';

    } else if (guess < targetNumber) {
        guessStatus.textContent = `${guess} was too low! Try again.`
        guessField.value = '';

    } else {
        alert('Unknown error!');
        endGame();
    }
    
    document.getElementById('guess-field').focus();

});

/*
 * The final section:
 */

/* Play Again button */
document.getElementById('play-again').addEventListener('click', resetGame);
