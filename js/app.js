/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Variables core del juego
let scores, maxScore, currentScore, currentPlayer, dice;
currentPlayer = 0;

// Obtener objetos HTML necesarios
let diceImg, newButton, rollButton, holdButton;
diceImg = document.getElementsByClassName('dice')[0];
newButton  = document.getElementsByClassName('btn-new') [0];
rollButton  = document.getElementsByClassName('btn-roll') [0];
holdButton = document.getElementsByClassName('btn-hold')[0];

// Asignar event listeners
newButton.addEventListener('click', openModal);
rollButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', holdScore);

init();

function init () {
    // Inicializacion de variables
    currentScore = 0;
    scores = [0,0];
    maxScore = 100;
    dice = 0;
    currentPlayer = 0;
    // Reinicializar estilos y elementos HTML
    diceImg.style.display = 'none';
    rollButton.style.display = 'none';
    holdButton.style.display = 'none';
    document.getElementsByClassName('player-0-panel')[0].classList.add("active");
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('name-0').classList.remove('winner');
    document.getElementById('name-1').classList.remove('winner');
}

function newGame (p1Name, p2Name, score2Win) {
    init();
    // Nombres de jugadores
    document.getElementById('name-0').textContent = p1Name;
    document.getElementById('name-1').textContent = p2Name;
    document.getElementsByClassName('player-0-panel')[0].classList.add("active");
    // Habilitar botones de roll y hold
    rollButton.style.display = 'block';
    holdButton.style.display = 'block';
    // Máxima puntuacion
    maxScore = score2Win;
}

function changeActivePlayer () {
    let panelActive;
    panelActive = document.getElementsByClassName('player-' + currentPlayer + '-panel')[0];
    panelActive.classList.remove("active");
    currentPlayer === 1 ? currentPlayer = 0 : currentPlayer = 1;
    panelActive = document.getElementsByClassName('player-' + currentPlayer + '-panel')[0];
    panelActive.classList.add("active");
    currentScore = 0;
}

function checkWinner() {
    if (scores[currentPlayer] >= maxScore) { 
        rollButton.style.display = 'none';
        holdButton.style.display = 'none';
        let winnerName = document.getElementById('name-' + currentPlayer);
        winnerName.textContent = "WINNER!";
        winnerName.classList.toggle('winner')
        let winnerPanel = document.getElementsByClassName('player-' + currentPlayer + '-panel')[0];
        winnerPanel.classList.remove("active");
        diceImg.style.display = 'none';
        return true;
    }
    return false;
}

function rollDice(event) {
    // Select div to update
    let playerCurrentTxt;
    playerCurrentTxt = document.getElementById('current-' + currentPlayer);
    // Roll dice and style
    dice = Math.floor(Math.random() * 6 ) + 1;
    diceImg.src = 'img/dice-' + dice + '.png';
    diceImg.style.display = 'block';   
    if (dice === 1) {
        playerCurrentTxt.textContent = '0';
        changeActivePlayer();
    } else {
        // Update current score
        currentScore += dice;
        playerCurrentTxt.textContent = '' + currentScore;
    }
}

function holdScore(event) {
    // Select div to update
    let playerCurrentTxt, playerScore;
    playerCurrentTxt = document.getElementById('current-' + currentPlayer);
    playerCurrentTxt.textContent = '0';
    playerScore = document.getElementById('score-' + currentPlayer);
    scores[currentPlayer] += currentScore;
    playerScore.textContent = '' + scores[currentPlayer];
    // Check winner
    let winner = checkWinner();
    if (winner !== true) {
        changeActivePlayer();
    }
}

/* MODAL */
let modal, btnAceptarConfig, btnCloseModal;
modal = document.getElementById('newGameModal');
btnCloseModal = document.getElementsByClassName("close")[0];
btnCloseModal.addEventListener('click', closeModal);
btnAceptarConfig = document.getElementById("aceptar-config");
btnAceptarConfig.addEventListener('click', aceptarConfiguration);

function openModal(event) {
    modal.style.display = "block";
}

function closeModal(event) {
    modal.style.display = "none";
}

function aceptarConfiguration(event) {
    let p1Name, p2Name, score2Win;
    p1Name = document.getElementById("pname-0").value;
    p2Name = document.getElementById("pname-1").value;
    score2Win = document.getElementById("score-win").value;
    newGame(p1Name, p2Name, score2Win);
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}