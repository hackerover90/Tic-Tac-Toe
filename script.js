function Player() {
    let value = 0

    function getPlayerValue() {
        return value
    }

    const setValue = (player) => {value = player};

    return {getPlayerValue, setValue}
}

function Gameboard() {
    let board = []
    let rows = 3
    let columns = 3
    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i][j] = Player()
        }
    }

    const getBoard = () => board

    const setBoardValue = (row, column, player) => {
        board[row][column].setValue(player)
    }

    const getBoardValue = (row, column) => {
        return board[row][column].getPlayerValue()
    }

    const printBoard = () => {
        boardWithPlayerValues = board.map((row) => row.map((player) => player.getPlayerValue()))
        console.log(boardWithPlayerValues)
    }
    return {
        getBoard,
        setBoardValue,
        getBoardValue,
        printBoard
    }
}

function Game() {
    const board = Gameboard()
    let moveNum = 0;
    let endGame = {gameOver: false, tie: false}
    //let gameOver = false
    //let tie = false
    let players = [
        {
            playerName: '',
            value: 'X'
        },
        {
            playerName: '',
            value: 'O'
        }
    ]

    const getGameStatus = () => endGame

    let currentPlayer = players[0]

    const updatePlayerName = (name1, name2) => {
        players[0].playerName = name1
        players[1].playerName = name2
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
    }

    const getCurrentPlayer = () => currentPlayer

    function printGame() {
        board.printBoard()
        if (endGame.gameOver == false) {
            console.log(`It is ${getCurrentPlayer().playerName}'s turn.`)
        }
        
    }

    const checkColumn = (boards, row) => {
        for (let i = 0; i < boards.length; i++) {
            if (board.getBoardValue(+row, i) != getCurrentPlayer().value) {
                return false
            }
            if (i == boards.length - 1) {
                return true
            }
        } 
    }

    const checkRow = (boards, column) => {
        for (let i = 0; i < boards.length; i++) {
            if (board.getBoardValue(i, +column) != getCurrentPlayer().value) {
                return false
            }
            if (i == boards.length - 1) {
                return true
            }
        } 
    }

    const checkDiag = (boards, row, column) => {
        if (row == column) {
            for (let i = 0; i < boards.length; i++) {
                if (board.getBoardValue(i, i) != getCurrentPlayer().value) {
                    return false
                }
                if (i == boards.length - 1) {
                    return true
                }
            } 
        }
        
    }

    const checkInverseDiag = (boards, row, column) => {
        if (+row + +column == 2) {
            for (let i = 0; i < boards.length; i++) {
                if (board.getBoardValue(i, ((boards.length - 1) - i)) != getCurrentPlayer().value) {
                    return false
                }
                if (i == boards.length - 1) {
                    return true
                }
            } 
        }
        
    }

    const victoryCheck = (row, column) => {
        let boards = board.getBoard()
        return checkColumn(boards, row) || checkRow(boards, column) || checkDiag(boards, row, column) || checkInverseDiag(boards, row, column)      
    }

    function playRound(row, column) {
        if (endGame.gameOver == false) {
            if (board.getBoardValue(row, column) == 0) {
                board.setBoardValue(row, column, getCurrentPlayer().value)
                moveNum += 1
                console.log(`Setting ${getCurrentPlayer().playerName}'s value into board`)
                
                if (victoryCheck(row, column, getCurrentPlayer().value) == true) {
                    endGame.gameOver = true
                    console.log('Player ', getCurrentPlayer().value, ' has won the game!')
                    printGame()
                    return endGame
                }

                if (moveNum == 9) {
                    endGame.gameOver = true
                    endGame.tie = true
                    console.log('Game has tied!')
                    printGame()
                    return endGame
                }

                switchPlayer()
                printGame()
            } else {
                console.error('Already taken');
            }
        }
        if (endGame.gameOver == true) {
            let gameOverMessage = 'Game is over!'
            console.log(gameOverMessage)
            return endGame
        }
        
    }

    function test() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                playRound(i, j)
            }
        }
    }

    return {
        getCurrentPlayer,
        printGame,
        playRound,
        getBoard: board.getBoard,
        test,
        updatePlayerName,
        getGameStatus
    }
}

function ScreenController() {
    let game = Game()
    
    let divPlayerTurn = document.querySelector('.turn')
    let playerNameForm = document.createElement('form')
    let div1 = document.createElement('div')
    let player1Label = document.createElement('label')
    let player1Input = document.createElement('input')
    let div2 = document.createElement('div')
    let player2Label = document.createElement('label')
    let player2Input = document.createElement('input')
    let playerNameFormButton = document.createElement('button')
    let divBoard = document.querySelector('.board')
    let div0 = document.createElement('div')

    let restart = document.createElement('button')
        restart.classList.add('btn', 'btn-primary')
        restart.setAttribute('type', 'button')
        restart.textContent = 'Restart'

    div0.textContent = 'Please fill in the players name'
    div0.classList.add('mb-3', 'fw-bold', 'text-dark')
    div1.classList.add('mb-3')
    div2.classList.add('mb-3')
    player1Label.classList.add('form-label')
    player1Label.setAttribute('for', 'player1')
    player1Label.textContent = 'Player 1 Name'
    player1Input.classList.add('form-control')
    player1Input.setAttribute('type', 'text')
    player1Input.setAttribute('id', 'player1')
    player1Input.setAttribute('value', 'Player 1')
    player1Input.required = true
    player2Label.classList.add('form-label')
    player2Label.setAttribute('for', 'player2')
    player2Label.textContent = 'Player 2 Name'
    player2Input.classList.add('form-control')
    player2Input.setAttribute('type', 'text')
    player2Input.setAttribute('id', 'player2')
    player2Input.setAttribute('value', 'Player 2')
    player2Input.required = true
    playerNameFormButton.classList.add('btn', 'btn-primary')
    playerNameFormButton.setAttribute('type', 'submit')
    playerNameFormButton.textContent = 'Submit'
    playerNameForm.setAttribute('id', 'playerNames')

    divPlayerTurn.append(div0, playerNameForm)
    div1.append(player1Label, player1Input)
    div2.append(player2Label, player2Input)
    playerNameForm.append(div1, div2, playerNameFormButton)

    const updateScreen = () => {
            playerNameForm.remove()
            let endGame = game.getGameStatus()
            let currentPlayer = game.getCurrentPlayer()
            let board = game.getBoard()
            if (endGame.gameOver == true && endGame.tie == false) {
                div0.textContent = `${currentPlayer.playerName} has won!`
            } else if (endGame.gameOver == true && endGame.tie == true) {
                div0.textContent = `Game has tied!`
            } else {
                div0.textContent = `It is ${currentPlayer.playerName}'s turn.`
            }
            
            
            divBoard.textContent = ""

            board.forEach((row, index) => {
                ticTacToeDiv = document.createElement('div')
                ticTacToeDiv.classList.add('d-flex')
                row.forEach((player, col) => {
                    const playerButton = document.createElement('button')
                    playerButton.classList.add('cell', 'player', 'col')
                    playerButton.dataset.row = index
                    playerButton.dataset.col = col
                    if (player.getPlayerValue() == 0) {
                        playerButton.textContent = ' '
                    } else {
                        playerButton.textContent = player.getPlayerValue()
                    }
                    ticTacToeDiv.appendChild(playerButton)
                    divBoard.appendChild(ticTacToeDiv)
                })
            });
        }

    divBoard.addEventListener('click', (e) => {
        const selectedButton = e.target
        const selectedButtonRow = selectedButton.dataset.row
        const selectedButtonCol = selectedButton.dataset.col
        if (!selectedButton) return
        let end = game.playRound(selectedButtonRow, selectedButtonCol)
        
        divPlayerTurn.appendChild(restart)
        divPlayerTurn.classList.add('mb-3', 'd-flex', 'justify-content-between', 'align-content-center')

        updateScreen()
        return end
    })

    restart.addEventListener("click", () => {window.location.reload()})
    
    playerNameForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let player1Name = player1Input.value
        let player2Name = player2Input.value
        if (player1Name == player2Name) {
            div0.textContent = Error('Players must have different names')
            div0.classList.remove('text-dark')
            div0.classList.add('text-danger')
            return
        } else {
            div0.classList.add('text-dark')
            game.updatePlayerName(player1Name, player2Name)
            updateScreen()
        }
    })

    
}

ScreenController()