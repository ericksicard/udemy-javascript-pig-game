/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, scoreTrack, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	
	if (gamePlaying) {
		// 1. Get a random number
		var dice_0 = Math.floor(Math.random() * 6) + 1; //generating a random number between 1 and 6 for the first dice
		var dice_1 = Math.floor(Math.random() * 6) + 1; //generating a random number between 1 and 6 for the second dice
		
		scoreTrack[0] = dice_0;
		scoreTrack[1] = dice_1;
		console.log(scoreTrack);

		// 2. Display the result
		document.querySelector('#dice-0').style.display = 'block';
		document.querySelector('#dice-1').style.display = 'block';
		document.querySelector('#dice-0').src = 'dice-' + dice_0 + '.png';
		document.querySelector('#dice-1').src = 'dice-' + dice_1 + '.png';


		// 3. Update the round score IF the rolled number was NOT a 1
		if (dice_0 === 1 || dice_1 === 1) {
			//Next Player
			nextPlayer();			
		} else {
			if (scoreTrack[0] === 6 && scoreTrack[1] === 6) { // payer losing when two 6s in a row appears
				scores[activePlayer] = 0; // the player loses his score
				document.getElementById('score-' + activePlayer).textContent = '0';
				scoreTrack = [0,0]; // reset scoreTrack to its initial values
				nextPlayer();
			} else {
				// Add score
				roundScore += (dice_0 + dice_1);
				document.getElementById('current-' + activePlayer).textContent = roundScore;				
			}

		}
	}		
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		//Update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.final-score').value // getting the value entered in the input field
		var winningScore;
		
		// Undefined, 0, null or "" are COERCED to false
		// Anything else is COERSED to true
		if (input) {
			winningScore = input; // it's possible to enter a new winning score even when playing the game
		} else {
			winningScore = 100;
		}

		// Check if the player won the game
		if (scores[activePlayer] >= winningScore) {
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('#dice-0').style.display = 'none';
			document.querySelector('#dice-1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
			gamePlaying = false;
		} else {
			//Next player
			nextPlayer();		
		}
	}	
});

function nextPlayer() {
		//Next Player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		
		// resetting the current score to cero
		roundScore = 0;
	
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		
		// setting the active player
		document.querySelector('.player-0-panel').classList.toggle('active'); 
		document.querySelector('.player-1-panel').classList.toggle('active');
		
		//hiding the dice
		document.querySelector('#dice-0').style.display = 'none';
		document.querySelector('#dice-1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0]; //an array to store the score of each player
	scoreTrack = [0,0]; // previous and current dice value
	roundScore = 0; //this variable is gonna update the array "scores"
	activePlayer = 0; // 0 for player #1 and 1 for player #2. This variable is gonna be use to read or write from the array "scores
	gamePlaying = true; // condition to continue running the game used with an IF statement
	winningScore = 100; // default winning score
	
	document.querySelector('#dice-0').style.display = 'none'; // hiding the dice image at the beginning of the game
	document.querySelector('#dice-1').style.display = 'none'; // hiding the dice image at the beginning of the game
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	
	document.querySelector('.player-0-panel').classList.remove('winner'); // removing "winner" and "active" classes
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active'); // adding "active" class to the first player
	
}







