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

/**
 *  A flipped tile can have 8 possible neighbors, at most, no matter the size of a board
 *
 *  a | b | c
 *  d | + | e
 *  f | g | h
 *
 * [rowOffset, colOffset]
 *
 * Column: (-1) to the left (1) to the right  (0) same
 *    Row: (-1) to the top  (1) to the bottom (0) same
 *
 * [-1,-1] | [-1,0] | [-1,1]
 * [ 0,-1] | [ 0,0] | [ 0,1]
 * [ 1,-1] | [ 1,0] | [ 1,1]
 *
 * Returns the number of bombs that surrounds the given indeces
 *
 * @param {col * row size board - ARRAY} bombBoard
 * @param {row coordinate - NUMBER} rowIndex
 * @param {col coordinate - NUMBER} columnIndex
 */
// Function to calculate the # of bombs surrounding a location the user picked
let getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  if (bombBoard[rowIndex, columnIndex] === 'B') { console.log('BOMB BRRRRRAAH') }
  let neighbors = [
    getValue(bombBoard, rowIndex-1,columnIndex-1), // a
    getValue(bombBoard, rowIndex-1,columnIndex),   // b
    getValue(bombBoard, rowIndex-1,columnIndex+1), // c
    getValue(bombBoard, rowIndex,columnIndex-1),   // d
    getValue(bombBoard, rowIndex,columnIndex+1),   // e
    getValue(bombBoard, rowIndex+1,columnIndex-1), // f
    getValue(bombBoard, rowIndex+1,columnIndex),   // g
    getValue(bombBoard, rowIndex+1,columnIndex+1)  // h
  ]
  return neighbors.filter(neighbor => neighbor === 'B').length
}

/**
 * Returns the value of the given indeces
 * Returns false/undefined if out of bounds
 *
 * @param {Array} bombBoard
 * @param {Number} rowIndex
 * @param {Number} columnIndex
 */
let getValue = (bombBoard, rowIndex, columnIndex) => {
  return bombBoard[rowIndex] === undefined ? false : bombBoard[rowIndex][columnIndex]
}

let printBoard = (player, bomb) => {
  console.log('Player Board: ')
  console.log(player.map(row => row.join(' | ')).join('\n'))
  console.log('Bomb Board: ')
  console.log(bomb.map(row => row.join(' | ')).join('\n'))
  console.log(getNumberOfNeighborBombs(bomb, 0,0))
}

printBoard(generatePlayerBoard(6,6), generateBombBoard(6,6,4))
