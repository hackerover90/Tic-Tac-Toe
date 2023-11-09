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
    let players = [
        {
            playerName: 'Player 1',
            value: 1
        },
        {
            playerName: 'Player 2',
            value: 2
        }
    ]

    let currentPlayer = players[0]

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
    }

    const getCurrentPlayer = () => currentPlayer

    function printGame() {
        board.printBoard()
        console.log(`It is ${getCurrentPlayer().playerName}'s turn.`)
    }

    const checkColumn = (boards, row) => {
        for (let i = 0; i < boards.length; i++) {
            if (board.getBoardValue(row, i) != getCurrentPlayer().value) {
                return false
            }
            if (i == boards.length - 1) {
                return true
            }
        } 
    }

    const checkRow = (boards, column) => {
        for (let i = 0; i < boards.length; i++) {
            if (board.getBoardValue(i, column) != getCurrentPlayer().value) {
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
        if (row + column == 2) {
            for (let i = 0; i < boards.length; i++) {
                if (board.getBoardValue(i, (boards.length - 1) - i) != getCurrentPlayer().value) {
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
        return checkColumn(boards, row, column) || checkRow(boards, row, column) || checkDiag(boards, row, column) || checkInverseDiag(boards, row, column)      
    }

    function playRound(row, column) {
        if (board.getBoardValue(row, column) == 0) {
            board.setBoardValue(row, column, getCurrentPlayer().value)
            console.log(`Setting ${getCurrentPlayer().playerName}'s value into board`)
            if (victoryCheck(row, column, getCurrentPlayer().value) == true) {
                console.log('Player ', getCurrentPlayer().value, ' has won the game!')
            }
            switchPlayer()
            printGame()
        } else {
            console.error('Already taken');
        }
        
    }

    printGame()
    return {
        getCurrentPlayer,
        printGame,
        playRound,
        getBoard: board.getBoard
    }
}

Game()