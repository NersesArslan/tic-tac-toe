const player_x_class = 'x';
const player_o_class = 'circle';
const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText');
let isPlayer_O_Turn = false;

const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

startGame()

function startGame() {
    isPlayer_O_Turn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(player_x_class)
        cell.classList.remove(player_o_class)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

restartButton.addEventListener('click', startGame)

function handleCellClick(e) {
    const cell = e.target
   
    const currentClass = isPlayer_O_Turn ? player_o_class : player_x_class
    
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.textContent = 'It\'s a draw!'
    } else {
        winningMessageTextElement.textContent = `Player with ${isPlayer_O_Turn ? "O's" : "X's" } wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(player_x_class) || cell.classList.contains(player_o_class)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
    boardElement.classList.remove(player_x_class)
    boardElement.classList.remove(player_o_class)
    if (isPlayer_O_Turn){
        boardElement.classList.add(player_o_class)
    } else {
        boardElement.classList.add(player_x_class)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


