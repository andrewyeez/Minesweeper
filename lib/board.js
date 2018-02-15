'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  /**
   * @description Constructor defines the instance properties
   * @param {Number} row
   * @param {Number} column
   * @param {Number} bomb
   */
  function Board(row, column, bomb) {
    _classCallCheck(this, Board);

    this._bomb = bomb;
    this._row = row;
    this._column = column;
    this._tiles = row * column;
    this._playerBoard = Board.generatePlayerBoard(row, column);
    this._bombBoard = Board.generateBombBoard(row, column, bomb);
  }

  _createClass(Board, [{
    key: 'getValue',


    /**
     * @description Returns value of element if found, else false
     * @param {Number} rowIndex
     * @param {Number} columnIndex
     */
    value: function getValue(rowIndex, columnIndex) {
      return this._bombBoard[rowIndex] === undefined ? false : this._bombBoard[rowIndex][columnIndex];
    }

    /**
     * @description Attempts to flip a tile. Return values are true/false/'B'
     */

  }, {
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      var tile = this.getValue(rowIndex, columnIndex);
      if (tile && tile === ' ') {
        // case: tile is open
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        this._tiles--;
        return true;
      } else if (tile && tile === 'B') {
        // case: tile is a bomb
        return 'B';
      } else if (tile === false || tile === undefined) {
        // case: tile is out of bounds
        return false;
      } else {
        // case: tile is close
        return true;
      }
    }

    /**
     * @description Validates if the amount of open tiles vs bombs match.
     * if it matches, then the user wins the game (returns false: no more safe tiles).
     * else the player continues to play (returns true).
     */

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._tiles === this._bomb ? false : true;
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

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      if (this._bombBoard[(rowIndex, columnIndex)] === 'B') {
        console.log('BOMB BRRRRRAAH');
      }
      var neighbors = [this.getValue(rowIndex - 1, columnIndex - 1), // a
      this.getValue(rowIndex - 1, columnIndex), // b
      this.getValue(rowIndex - 1, columnIndex + 1), // c
      this.getValue(rowIndex, columnIndex - 1), // d
      this.getValue(rowIndex, columnIndex + 1), // e
      this.getValue(rowIndex + 1, columnIndex - 1), // f
      this.getValue(rowIndex + 1, columnIndex), // g
      this.getValue(rowIndex + 1, columnIndex + 1) // h
      ];
      return neighbors.filter(function (neighbor) {
        return neighbor === 'B';
      }).length;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log('Bomb Board: ');
      console.log(this._bombBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
      console.log('Player Board: ');
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(row, column) {
      var board = [];
      while (row--) {
        var element = [];
        var col = column;
        while (col--) {
          element.push(' ');
        }
        board.push(element);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(row, column, bomb) {
      var board = Board.generatePlayerBoard(row, column);
      while (bomb--) {
        var randomRowIndex = Math.floor(Math.random() * row);
        var randomColIndex = Math.floor(Math.random() * column);
        if (board[randomRowIndex][randomColIndex] === 'B') {
          bomb++;
        } else {
          board[randomRowIndex][randomColIndex] = 'B';
        }
      }
      return board;
    }
  }]);

  return Board;
}();

exports.default = Board;