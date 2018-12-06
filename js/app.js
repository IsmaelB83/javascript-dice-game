/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Variables top personalize the game
let dices, previousSix, ruleTwoSix, ruleOne, ruleTwoDices;
// Core game variables
let scores, maxScore, currentScore, currentPlayer, dice;

// Getting DOM objects for the dices to maximize performance later on
let dicesImg;
dicesImg = [];
dicesImg[0] = document.getElementsByClassName('dice-1')[0];
dicesImg[1] = document.getElementsByClassName('dice-2')[0];

// Add event listeners
document.getElementsByClassName('btn-new')[0].addEventListener('click', openModal);
document.getElementsByClassName('btn-roll')[0].addEventListener('click', rollDice);
document.getElementsByClassName('btn-hold')[0].addEventListener('click', holdScore);
document.getElementById("aceptar").addEventListener('click', aceptarConfiguration);

// Init game for the first time
init();

// Initialize game
function init() {
    // Initialize core game variables
    currentScore = 0;
    scores = [0, 0];
    maxScore = 100;
    currentPlayer = 0;
    previousSix = false;
    dices = [0,0];
    // Custom rules
    ruleTwoSix = document.getElementById('rules-1').checked;
    ruleOne = document.getElementById('rules-2').checked;
    ruleTwoDices = document.getElementById('rules-3').checked;
    // Render HTML styles and content
    dicesImg[0].style.display = 'none';
    dicesImg[1].style.display = 'none';
    document.getElementsByClassName('btn-roll')[0].style.display = 'none';
    document.getElementsByClassName('btn-hold')[0].style.display = 'none';
    document.getElementsByClassName('player-0-panel')[0].classList.add("active");
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('name-0').classList.remove('winner');
    document.getElementById('name-1').classList.remove('winner');
}

// Create a new game
function newGame(p1Name, p2Name, score2Win) {
    // Initialize game
    init();
    maxScore = score2Win;
    // Render HTML Content
    document.getElementById('name-0').textContent = p1Name;
    document.getElementById('name-1').textContent = p2Name;
    document.getElementsByClassName('player-0-panel')[0].classList.add("active");
    document.getElementsByClassName('btn-roll')[0].style.display = 'block';
    document.getElementsByClassName('btn-hold')[0].style.display = 'block';
    document.getElementsByClassName('final-score')[0].value = '' + maxScore;
    // LOG
    console.log('Starting game: ' + p1Name + ' vs ' + p2Name + ' (' + score2Win + ')');
    console.log('Two dices rule: ' + ruleTwoDices);
    console.log('Two sixes in a row to looses all player score: ' + ruleTwoSix);
    console.log('One to loose current score: ' + ruleOne);
    console.log ("New active player is: " + currentPlayer + ". Total score: " + scores);
}

// Change current game
function changeActivePlayer() {
    // Update current player variable and switch active panel
    currentScore = 0;
    document.getElementById('current-' + currentPlayer).textContent = '0';
    let panelActive;
    panelActive = document.getElementsByClassName('player-' + currentPlayer + '-panel')[0];
    panelActive.classList.remove("active");
    currentPlayer === 1 ? currentPlayer = 0 : currentPlayer = 1;
    panelActive = document.getElementsByClassName('player-' + currentPlayer + '-panel')[0];
    panelActive.classList.add("active");
    // Restart current round score
    currentScore = 0;    
    previousSix = false;
    // LOG
    console.log ("New active player is: " + currentPlayer + ". Total score: " + scores);
}

// Check if there is a winner in the game
function checkWinner() {
    // If score of current player is GE to max score of the game
    if (scores[currentPlayer] >= maxScore) {
        // Render HTML when there is a winner
        document.getElementsByClassName('btn-roll')[0].style.display = 'none';
        document.getElementsByClassName('btn-hold')[0].style.display = 'none';
        let winnerName = document.getElementById('name-' + currentPlayer);
        winnerName.textContent = "WINNER!";
        winnerName.classList.add('winner')
        document.getElementsByClassName('player-0-panel')[0].classList.remove("active");
        document.getElementsByClassName('player-1-panel')[0].classList.remove("active");
        dicesImg[0].style.display = 'none';
        dicesImg[1].style.display = 'none';
        return true;
        // LOG
        console.log ("There is a winner. Player " + currentPlayer + " wins, with total score of " + scores[currentPlayer]);
    }
    // No Winner
    return false;
}

// Rolling dices
function rollDice(event) {
    // Roll dices and render them
    dices[0] = Math.floor(Math.random() * 6) + 1;
    dicesImg[0].src = 'img/dice-' + dices[0] + '.png';
    dicesImg[0].style.display = 'block';
    if (ruleTwoDices === true) {
        dices[1] = Math.floor(Math.random() * 6) + 1;
        dicesImg[1].src = 'img/dice-' + dices[1] + '.png';
        dicesImg[1].style.display = 'block';
    }
    // Select div to update
    let playerCurrentTxt;
    playerCurrentTxt = document.getElementById('current-' + currentPlayer);
    if ( ruleTwoSix === true && ( previousSix === true && ( dices[0] === 6 || dices[1] === 6 ) || ( dices[0] === 6 && dices[1] === 6 ) ) ) {
        scores[currentPlayer] = 0;   
        console.log('Player ' + currentPlayer + ' looses all score with roll ' + dices);
        changeActivePlayer();
    } else if (ruleOne === true && ( dices[0] === 1 || dices[1] === 1 ) ) {
        console.log('Player ' + currentPlayer + ' looses current round score with roll ' + dices);
        changeActivePlayer();
    } else {
        // Update current score
        currentScore += dices[0];
        currentScore += dices[1];
        console.log('Player ' + currentPlayer + ' rolls ' + dices + '. Current score is ' + currentScore);
        playerCurrentTxt.textContent = '' + currentScore;
        // Reseteo del flag de previous flag
        if (dices[0] === 6 || dices[1] === 6){
            previousSix = true;
            console.log('Adding SIX to cache');
        } else if (previousSix === true) {
            previousSix = false;
            console.log('Removing SIX from cache');
        }
    }   
}

// Hold current score in global score
function holdScore(event) {
    // Current player global score is increased with current round score
    scores[currentPlayer] += currentScore;
    console.log('Player ' + currentPlayer + ' holds score. Total scores is: ' + scores);
    // Select div to update (current player)
    let playerCurrentTxt = document.getElementById('current-' + currentPlayer);
    playerCurrentTxt.textContent = '0';
    let playerScore = document.getElementById('score-' + currentPlayer);
    playerScore.textContent = '' + scores[currentPlayer];
    // Check winnern and continue in case there is not a winner
    let winner = checkWinner();
    if (winner !== true) {
        changeActivePlayer();
    }
}

// Open modal to customize a new game
function openModal(event) {
    document.getElementById('newGameModal').style.display = "block";
}

// Close modal (clicking out of the modal
window.onclick = function (event) {
    if (event.target == document.getElementById('newGameModal')) {
        document.getElementById('newGameModal').style.display = "none";
    }
}

// Configuration for a new game is done and starting game
function aceptarConfiguration(event) {
    // Create a game for two players with the score to beat
    let p1Name, p2Name, score2Win;
    p1Name = document.getElementById("pname-0").value;
    p2Name = document.getElementById("pname-1").value;
    score2Win = document.getElementById("score-win").value;
    newGame(p1Name, p2Name, score2Win);
    // Close modal
    document.getElementById('newGameModal').style.display = "none";
}

