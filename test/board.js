import 'babel-polyfill';
import {expect} from 'chai';
import Board from '../src/board';

describe('Board', function() {
  describe('.generatePlayerBoard(row,column)', function() {
    context('user passes postive row and column', function() {
      const row = 3,
            column = 3,
            board = Board.generatePlayerBoard(row, column);

      it('returns an rray', function() {
        expect(board instanceof Array).to.be.true;
      });

      it('length of array equals the row', function() {
        expect(board.length).to.equal(row);
      });

      it('length of the elements inside the array equals the column', function() {
        board.forEach(function(element) {
          expect(element.length).to.equal(column);
        });
      })

      it('has empty string values inside the elements of the array', function() {
        board.forEach(function(element) {
          element.forEach(function(el) {
            expect(el).to.equal(' ');
          })
        });
      })
    });
    context('user passes a negative row and positive column', function () {
      const row = -3,
            column = 3,
            board = Board.generatePlayerBoard(row, column);

      it('returns undefined', function() {
        expect(board).to.be.undefined;
      })
    });
    context('user passes a positive row and negative column', function () {
      const row = 3,
            column = -3,
            board = Board.generatePlayerBoard(row, column);

      it('returns undefined', function() {
        expect(board).to.be.undefined;
      })
    });
    context('user passes a negative row and column', function () {
      const row = -3,
            column = -3,
            board = Board.generatePlayerBoard(row, column);

      it('returns undefined', function() {
        expect(board).to.be.undefined;
      })
    });
  });
  // .generateBombBoard() depends on .generatePlayerBoard()
  describe('.generateBombBoard(row,column,bomb)', function() {
    context('user passes a negative bomb', function() {
      const row = 3,
            column = 3,
            bomb = -3,
            board = Board.generateBombBoard(row, column, bomb);
      it('returns undefined', function() {
        expect(board).to.be.undefined;
      });
    });
    context('user passes a positive bomb', function() {
      const row = 3,
            column = 3,
            bomb = 3,
            board = Board.generateBombBoard(row, column, bomb);
      it('returns an array', function() {
        expect(board instanceof Array).to.be.true;
      });

      it('has a bomb value inside some or all of the elements in the array', function() {
        let isTrue = false;
        board.forEach((element) => {
          isTrue = element.some(el => el === 'B');
        });
        expect(isTrue).to.be.true;
      });
    });
  });
});
