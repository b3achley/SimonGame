var buttonColours = [ 'red', 'blue', 'green', 'yellow' ];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

document.addEventListener('keydown', function() {
	if (!started) {
		started = true;
		nextSequence();
	}
});

document.querySelectorAll('.btn').forEach(function(btn) {
	btn.addEventListener('click', function(event) {
		var userChosenColour = this.getAttribute('id');
		userClickedPattern.push(userChosenColour);
		animatePress(userChosenColour);
		playSound(userChosenColour);
		checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
	});
});

function animateGameOver() {
	var body = document.querySelector('body');
	body.classList.toggle('game-over');
	setTimeout(function() {
		body.classList.toggle('game-over');
	}, 200);
}

function animatePress(currentColour) {
	var animateButton = document.querySelector('#' + currentColour);
	animateButton.classList.toggle('pressed');
	setTimeout(function() {
		animateButton.classList.toggle('pressed');
	}, 100);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound('wrong');
		animateGameOver();
		document.querySelector('#level-title').textContent = 'Game Over, Press Any Key to Restart';
		startOver();
	}
}

function nextSequence() {
	level++;
	document.querySelector('#level-title').textContent = 'Level ' + level;
	userClickedPattern = [];
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	animatePress(randomChosenColour);
	playSound(randomChosenColour);
}

function playSound(name) {
	var audio = new Audio('sounds/' + name + '.mp3');
	audio.play();
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
