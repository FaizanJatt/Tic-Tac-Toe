
const createPlayer = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {

    let board = [];
    for (i = 0; i < 9; i++) {
        board.push('');
    }

    let squares = document.querySelector('.squares');

    board.forEach((item, index) => {
        const square = document.createElement('div');
        square.className = 'square';
        squares.appendChild(square);
    })


    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
           
            square.classList.add(game.activePlayer.marker);
            square.setAttribute('data', game.activePlayer.marker);
            board[index] = game.activePlayer.marker;
            square.style.pointerEvents = 'none';
           

            game.remainingSpots -= 1;
           
            game.checkWinner();
        
            if (game.winnerDeclared == false) {
                if (game.remainingSpots > 0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if (game.remainingSpots == 0) {
                    game.declareTie();
                }
            }
        })
    });

    // return
    return {
        board
    };
})();

// game object
const game = (() => {


    const playerOne = createPlayer('Player 1', 'cat');
    const playerTwo = createPlayer('Player 2', 'apple');

    let activePlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;


    let subtext = document.querySelector('.subtext'); 
    let playerName = document.querySelector('.player-name');


    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    
    function checkWinner() {
        winningAxes.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
            if (gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
                console.log('winner!');
                subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
                this.winnerDeclared = true;
            } 
        })
    }

  
    function alertNextPlayer() {
        this.activePlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1';
    }

   
    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
        console.log('nextPlayer() function ran')
        console.log('active player: ' + activePlayer.name);
    }

  
    function declareTie() {
        subtext.innerHTML = "<b>Tie game!</b>";
    }

    return {
        activePlayer,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        winnerDeclared
    };
})();