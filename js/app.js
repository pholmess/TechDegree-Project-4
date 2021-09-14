/* Treehouse FSJS Techdegree: Project 4 - OOP Game App
 * app.js 
 * Sherri Holmes*/

let game = ' ';

//declare global variables

const startGameListener = document.getElementById('btn__reset');
const keys = document.getElementsByClassName('key');

//function to manage players' key presses

let eventHandler = function(e) {
	let keyPress = e.key;
	for (let i = 0; i < keys.length; i++) {
		if (keys[i].innerHTML === keyPress) {
			if (keys[i].disabled) {
				continue
			} else {
				game.handleInteraction(keys[i]);
			}
		}
	}
}

//function to listen for click to begin the game 

startGameListener.addEventListener('click', () => {
  game = new Game();
	game.startGame();
	document.addEventListener('keyup', eventHandler);
})
for (let i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', (e) => {
		game.handleInteraction(e.target);
	})
}
