/**
 * Minesweeper Project from CodeAcademy
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
 * @param {Array} bombBoard
 * @param {Number} rowIndex
 * @param {Number} columnIndex
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

/**
 * returns the playerBoard (Array) that has been flipped a tile based on the users input
 *
 * @param {Array} playerBoard
 * @param {Array} bombBoard
 * @param {Number} rowIndex
 * @param {Number} columnIndex
 */
let flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  let tile = getValue(playerBoard, rowIndex, columnIndex)
  if (tile && tile === ' ') {
    // non-flipped tile
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex)
    return playerBoard
  } else if (tile && tile === 'B') {
    // bomb tile
    return 'BOMB'
  }  else if (tile === false || tile === undefined) {
    // out of bounds
    return 'OUT OF BOUNDS'
  } else {
    // flipped tile
    return playerBoard
  }
}

let printBoard = (player, bomb, flippedPlayer) => {
  // console.log('Player Board: ')
  // console.log(player.map(row => row.join(' | ')).join('\n'))
  console.log('Bomb Board: ')
  console.log(bomb.map(row => row.join(' | ')).join('\n'))
  console.log('Updated Player Board: ')
  console.log(flippedPlayer.map(row => row.join(' | ')).join('\n'))
}


let player = generatePlayerBoard(6,6)
let bomb = generateBombBoard(6,6,4)
let flip1 = flipTile(player, bomb, 1, 2)
let flip2 = flipTile(player, bomb, 3, 2)
printBoard(player, bomb, flip2)
