

module('UX');

test("space should register when clicked", function () {
	turn = 1;
	BOARD.board = [
	               ["", "", ""],
	               ["", "", ""],
	               ["", "", ""]
	               ];
	canvasClicked(0, 0);  
	ok(BOARD.board[0][0] === "X");
});

test("space should not register if already occupied", function () {
	turn = 1;
	BOARD.board = [
	               ["", "", ""],
	               ["", "", ""],
	               ["", "", ""]
	               ];
	BOARD.board[0][0] = "O";
	canvasClicked(0, 0);
	ok(BOARD.board[0][0] === "O");
});

module('game');

test("turn should begin at 1 and advance when user clicks a square", function () {
	turn = 1;
	BOARD.board = [
             ["", "", ""],
             ["", "", ""],
             ["", "", ""]
             ];
	canvasClicked(1,0);
	ok(turn === 3);
});

test("2 Xs on 1 row should be blocked by O", function () {
	turn = 4;
	BOARD.board = [
             ["X", "", "X"],
             ["", "O", ""],
             ["", "", ""]
             ];
	computerTurn();
	ok(BOARD.board[0][1] === "O");
});

test("2 Os on 1 row with an open space should have computer win", function (){
	turn = 4;
	BOARD.board = [
             ["X", "", ""],
             ["O", "O", ""],
             ["X", "", ""]
             ];
	computerTurn();
	ok(BOARD.board[1][2] === "O");
});

test("2 Xs on 1 column should be blocked by O", function () {
	turn = 4;
	BOARD.board = [
             ["X", "", ""],
             ["", "O", ""],
             ["X", "", ""]
             ];
	computerTurn();
	ok(BOARD.board[1][0] === "O");
});

test("2 Os on 1 column with an open space should have computer win", function (){
	turn = 4;
	BOARD.board = [
             ["X", "", "X"],
             ["", "O", ""],
             ["", "O", ""]
             ];
	computerTurn();
	ok(BOARD.board[0][1] === "O");
});

test("2 Xs on 1 diagonal should be blocked by O", function () {
	turn = 4;
	BOARD.board = [
             ["X", "", ""],
             ["", "", "O"],
             ["", "", "X"]
             ];
	computerTurn();
	ok(BOARD.board[1][1] === "O");
});

test("2 Os on 1 diagonal with an open space should have computer win", function (){
	turn = 6;
	BOARD.board = [
             ["X", "", ""],
             ["X", "O", ""],
             ["O", "X", ""]
             ];
	computerTurn();
	ok(BOARD.board[0][2] === "O");
});

test("an open turn should prioritize the middle", function (){
	turn = 2;
	BOARD.board = [
             ["X", "", ""],
             ["", "", ""],
             ["", "", ""]
             ];
	computerTurn();
	ok(BOARD.board[1][1] === "O");
});

test("an open turn should prioritize the corners if middle is taken unless a fork is created", function (){
	turn = 4;
	BOARD.board = [
             ["X", "", ""],
             ["", "O", ""],
             ["", "", "X"]
             ];
	computerTurn();
	ok(BOARD.board[1][0] === "O");
});

test("an open turn should prioritize the edges if corners and middle are taken", function (){
	turn = 8;
	BOARD.board = [
             ["X", "O", "X"],
             ["X", "O", ""],
             ["O", "X", "X"]
             ];
	computerTurn();
	ok(BOARD.board[1][2] === "O");
});

test("game over if 3 in a row horizontally", function (){
	BOARD.board = [
	               ["X", "X", "X"],
	               ["", "", ""],
	               ["", "", ""]
	               ];
	ok(isGameOver() === true);
});

test("game over if 3 in a row vertically", function (){
	BOARD.board = [
	               ["X", "O", "X"],
	               ["X", "", ""],
	               ["X", "", ""]
	               ];
	ok(isGameOver() === true);
});

test("game over if 3 in a row diagonally", function (){
	BOARD.board = [
	               ["X", "O", "X"],
	               ["", "X", ""],
	               ["", "", "X"]
	               ];
	ok(isGameOver() === true);
});

test("game over if board full", function (){
	BOARD.board = [
	               ["X", "O", "X"],
	               ["O", "X", "O"],
	               ["O", "O", "X"]
	               ];
	ok(isGameOver() === true);
});

//mocks
function htmlDraw() {};
function printGameOver() {};