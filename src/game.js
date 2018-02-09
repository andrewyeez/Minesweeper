import Board from './board.js'

export default class Game {
  constructor(row, column, bomb){
    this._board = Board(row, column, bomb);
  }

  playMove = (rowIndex, columnIndex) => {
    let response = this._board.flipTile(rowIndex, columnIndex);
    switch (response) {
      case 'B':
        console.log('GAME OVER!');
        this._board.print();
        break;
      case true:
        if (Board.hasSafeTiles) {
          console.log('Pick your next tile: ');
          this._board.print();
        } else {
          console.log('YOU WON!');
          this._board.print();
        }
        break;
      case false:
        console.log('Tile location is out of bound');
        this._board.print();
        break;
      default:
        console.log('Huh?');
        break;
    }
  }
}
