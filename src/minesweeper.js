/**
 * Minesweeper Project from CodeAcademy
 */

/**
  // Mistake: when we use board.push(element), we are using a reference to the variable element.
  // By inserting a new item inside element, it will be seen on all the reference to the element array

  let generatePlayerBoard = (row, column) => {
    let element = []
    let board = []
    while (row--) { element.push(' ') }
    while (column--) { board.push(element) }
    return board
  }

 */

let generatePlayerBoard = (row, column) => {
  let board = []
  while (row--) {
    let element = []
    let colCount = column
    while (colCount--) { element.push(' ') }
    board.push(element)
  }
  return board
}

let generateBombBoard = (row, column, bombs) => {
  let bombBoard = generatePlayerBoard(row, column)
  while (bombs--) {
    let randomRow = Math.floor(Math.random() * row)
    let randomCol = Math.floor(Math.random() * column)
    if (bombBoard[randomRow][randomCol] === 'B') { bombs++ }
    else { bombBoard[randomRow][randomCol] = 'B' }
  }
  return bombBoard
}

let printBoard = (player, bomb) => {
  console.log('Player Board: ')
  console.log(player.map(row => row.join(' | ')).join('\n'))
  console.log('Bomb Board: ')
  console.log(bomb.map(row => row.join(' | ')).join('\n'))
}

printBoard(generatePlayerBoard(6,6), generateBombBoard(6,6,4))
