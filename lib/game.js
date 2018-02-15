'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(row, column, bomb) {
    _classCallCheck(this, Game);

    this._board = new _board2.default(row, column, bomb);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      var response = this._board.flipTile(rowIndex, columnIndex);
      switch (response) {
        case 'B':
          console.log('GAME OVER!');
          this._board.print();
          break;
        case true:
          if (this._board.hasSafeTiles()) {
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
      return response;
    }
  }]);

  return Game;
}();

exports.default = Game;