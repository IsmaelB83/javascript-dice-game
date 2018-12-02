    /*
    GAME RULES:

    - The game has 2 players, playing in rounds
    - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
    - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
    - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
    - The first player to reach 100 points on GLOBAL score wins the game

    */

    // Variables core del juego
    let scores, currentScore, currentPlayer, dice;
    currentPlayer = 0;

    // Obtener objetos HTML necesarios
    let diceImg, newButton, rollButton, holdButton, playerOneTxt, playerTwoTxt, playerOneCurrentTxt, playerTwoCurrentTxt;
    diceImg = document.getElementsByClassName('dice')[0];
    newButton  = document.getElementsByClassName('btn-new') [0];
    rollButton  = document.getElementsByClassName('btn-roll') [0];
    holdButton = document.getElementsByClassName('btn-hold')[0];
    playerOneTxt = document.getElementById('score-0');
    playerOneCurrentTxt  = document.getElementById('current-0');
    playerTwoTxt  = document.getElementById('score-1');
    playerTwoCurrentTxt = document.getElementById('current-1');

    // Asignar event listeners
    newButton.addEventListener('click', newGame);
    rollButton.addEventListener('click', rollDice);
    holdButton.addEventListener('click', holdScore);

    // Inicializar juego
    initGame ();
    render();

    function initGame () {
        // Cambiar estilos si ha habido un ganador en una partida anterior
        let winnerName = document.getElementById('name-' + currentPlayer);
        winnerName.textContent = 'PLAYER 1';
        winnerName.classList.remove('winner')
        document.getElementsByClassName('player-1-panel')[0].classList.remove("active");
        // Resto de inicializaciones
        currentPlayer = 0;
        currentScore = 0;
        scores = [0,0];
        dice = 0;
        diceImg.style.display = 'none';
        rollButton.style.display = 'inline';
        holdButton.style.display = 'inline';
    }

    // Funciones core del juego
    function render() {
        playerOneTxt.textContent = '' + scores[0];
        playerTwoTxt.textContent = '' + scores[1];
        switch (currentPlayer) {
            case 0:
                playerOneCurrentTxt.textContent = '' + currentScore;
                playerTwoCurrentTxt.textContent = '0';
                break;
            default:
                playerTwoCurrentTxt.textContent = '' + currentScore;
                playerOneCurrentTxt.textContent = '0';
                break;
        }
    }

    function changeActivePlayer () {
        let panelActive;
        panelActive = document.getElementsByClassName('player-' + currentPlayer + '-panel')[0];
        panelActive.classList.toggle("active");
        currentPlayer === 1 ? currentPlayer = 0 : currentPlayer = 1;
        panelActive = document.getElementsByClassName('player-' + currentPlayer + '-panel')[0];
        panelActive.classList.toggle("active");
        currentScore = 0;
    }

    function checkWinner() {
        if (scores[currentPlayer] >= 100) { 
            rollButton.style.display = 'none';
            holdButton.style.display = 'none';
            let winnerName = document.getElementById('name-' + currentPlayer);
            winnerName.textContent = "WINNER!";
            winnerName.classList.toggle('winner')
            let winnerPanel = document.getElementsByClassName('player-' + currentPlayer + '-panel')[0];
            winnerPanel.classList.toggle("active");
            return true;
        }
        return false;
    }

    // Manejadores de eventos
    function newGame(event) {
        initGame();
        render();
    }

    function rollDice(event) {
        dice = Math.floor(Math.random() * 6 ) + 1;
        diceImg.src = diceImg.src.substr(0,diceImg.src.search('dice')) + 'dice-' + dice + '.png';
        diceImg.style.display = 'inline';   
        if (dice === 1) {
            changeActivePlayer();
        } else {
            currentScore += dice;
        }
        render();
    }

    function holdScore(event) {
        scores[currentPlayer] += currentScore;
        let winner = checkWinner();
        if (winner !== true) {
            changeActivePlayer();
        }
        render();
    }