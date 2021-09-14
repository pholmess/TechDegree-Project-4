/* Treehouse FSJS Techdegree: Project 4 - OOP Game App
 * Game.js 
 *Sherri Holmes*/

//creates Game class and an array of phrases to be guessed

class Game {
	constructor() {
		this.missed = 0;
		this.phrases = [new Phrase('The sky is the limit'),
			new Phrase("Piece of cake"),
			new Phrase("Break a leg"),
			new Phrase("Under the weather"),
			new Phrase("Down to earth")
		];
		this.activePhrase = null;
	}

	//method starts the game and the randomly selected phrase from phrase array
  
	startGame() {
		const gameOverlay = document.getElementById('overlay');
		gameOverlay.style.display = 'none';
		this.activePhrase = this.getRandomPhrase();
		this.activePhrase.addPhraseToDisplay();
	}

	//method uses random number to choose a phrase from array 

	getRandomPhrase() {
		const randomPhraseIndex = Math.floor(Math.random() * this.phrases.length);
		return this.phrases[randomPhraseIndex];
	}

	//method removes a life if the player's guess is incorrect

	removeLife() {
		this.missed += 1;
		const scoreboard = document.querySelector('#scoreboard ol').children;
		scoreboard[this.missed - 1].querySelector('img').src = 'img/lostHeart.png';
		if (this.missed === 5) {
			this.gameOver('lose');
		}
	}

	//method handling player interaction in the game via mouse or keyboard, and checks for a win. 
	
	handleInteraction(button) {
		const letter = button.textContent;
		//const winner = this.checkForWin();
		button.disabled = true;
		if (this.activePhrase.checkLetter(letter)) {
			button.classList.add('chosen'); //add class name
			this.activePhrase.showMatchedLetter(letter);
			const winner = this.checkForWin();
			if (winner) {
				this.gameOver('win');
			}
		} else {
			button.classList.add('wrong'); // add class name
			this.removeLife();
		}
	}

	//method checks to see if all the letters in a phrase were guessed

	checkForWin() {
		const keyList = document.querySelector('#phrase ul').children;
		let showCharacterCount = 0;
		let spaceCharacterCount = 0;
		for (let i = 0; i < keyList.length; i++) {
			if (keyList[i].classList.contains('show')) {
				showCharacterCount += 1;
			} else if (keyList[i].classList.contains('space')) {
				spaceCharacterCount += 1;
			}
		}
		return (showCharacterCount + spaceCharacterCount) === keyList.length
	}

	//method to reset the game for another game

	resetGame() {
		const keyList = document.querySelector('#phrase ul');
		const keys = document.getElementsByClassName('key');
		const buttonReset = document.getElementById('btn__reset');
		const scoreboard = document.querySelector('#scoreboard ol').children;
	
		keyList.innerHTML = '';
		for (let i = 0; i < keys.length; i++) {
			keys[i].className = 'key';
			keys[i].disabled = false;
		}
		buttonReset.textContent = 'Play Again';
		for (let i = 0; i < scoreboard.length; i++) {
			scoreboard[i].querySelector('img').src = 'img/liveHeart.png';
		}
	}
	
	//method manages the display of you win/lose overlay

	gameOver(gameStatus) {
		const gameOverlay = document.getElementById('overlay');
		const gameOverMessage = document.getElementById('game-over-message');
		const overlay = document.getElementById('overlay');
		const currentOverlayClass = overlay.className;
		
    document.removeEventListener('keyup', eventHandler);
		gameOverlay.style.display = 'block';
		
    if (gameStatus == 'lose') {
			gameOverMessage.textContent = 'Sorry, Game Over!';
		} else if (gameStatus === 'win') {
			gameOverMessage.textContent = 'Congrats! You Win!';
		}
		overlay.classList.replace(currentOverlayClass, gameStatus);
		this.resetGame();
	}
}