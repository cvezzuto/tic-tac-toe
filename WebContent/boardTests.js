module('board');

test("board has three rows", function() { 
 ok(BOARD.board.length === 3); 
});

test("board has 3 columns in each row", function () {
  ok(BOARD.board[0].length === 3);
});

test("board returns rows", function () {
	BOARD.board = [
	               ["1", "2", "3"],
	               ["4", "5", "6"],
	               ["7", "8", "9"]
	               ];
	deepEqual(BOARD.get.rows()[0], ["1", "2", "3"]);
	deepEqual(BOARD.get.rows()[1], ["4", "5", "6"]);
	deepEqual(BOARD.get.rows()[2], ["7", "8", "9"]);
	
});

test("board returns columns", function () {
	BOARD.board = [
	               ["1", "2", "3"],
	               ["4", "5", "6"],
	               ["7", "8", "9"]
	               ];
	deepEqual(BOARD.get.columns()[0], ["1", "4", "7"]);
	deepEqual(BOARD.get.columns()[1], ["2", "5", "8"]);
	deepEqual(BOARD.get.columns()[2], ["3", "6", "9"]);
});

test("board returns diagonals", function () {
	BOARD.board = [
	               ["1", "2", "3"],
	               ["4", "5", "6"],
	               ["7", "8", "9"]
	               ];
	deepEqual(BOARD.get.diagonals()[0], ["1", "5", "9"]);
	deepEqual(BOARD.get.diagonals()[1], ["3", "5", "7"]);
});

test("board returns middle", function () {
	BOARD.board = [
	               ["1", "2", "3"],
	               ["4", "5", "6"],
	               ["7", "8", "9"]
	               ];
	deepEqual(BOARD.get.middle(), "5");
});

test("board returns corners", function () {
	BOARD.board = [
	               ["1", "2", "3"],
	               ["4", "5", "6"],
	               ["7", "8", "9"]
	               ];
	deepEqual(BOARD.get.corners()[0], "1");
	deepEqual(BOARD.get.corners()[1], "3");
	deepEqual(BOARD.get.corners()[2], "7");
	deepEqual(BOARD.get.corners()[3], "9");
});

test("board returns sides", function () {
	BOARD.board = [
	               ["1", "2", "3"],
	               ["4", "5", "6"],
	               ["7", "8", "9"]
	               ];
	deepEqual(BOARD.get.edges()[0], "2");
	deepEqual(BOARD.get.edges()[1], "4");
	deepEqual(BOARD.get.edges()[2], "6");
	deepEqual(BOARD.get.edges()[3], "8");
});

test("board returns corner pairs", function () {
	BOARD.board = [
	               ["1", "2", "3"],
	               ["4", "5", "6"],
	               ["7", "8", "9"]
	               ];
	deepEqual(BOARD.get.cornerPairs()[0], ["1", "9"]);
	deepEqual(BOARD.get.cornerPairs()[1], ["7", "3"]);
});