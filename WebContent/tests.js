module('board');

test("board has three rows", function() { 
 ok(board.length === 3); 
});

test("board has 3 columns in each row", function () {
  ok(board[0].length === 3);
});


module('UX');

test("space should register when clicked", function () {
	
	canvasClicked(0, 0);  
	ok(board[0][0] === "X");
});

module('game');

test("turn should begin at 1 and advance when user clicks a square", function () {
	turn = 1;
	board = [
             ["", "", ""],
             ["", "", ""],
             ["", "", ""]
             ];
	canvasClicked(1,0);
	ok(turn === 3);
});

test("2 Xs on 1 row should be blocked by O", function () {
	turn = 4;
	board = [
             ["X", "", "X"],
             ["", "O", ""],
             ["", "", ""]
             ];
	computerTurn();
	ok(board[0][1] === "O");
});

test("2 Os on 1 row with an open space should have computer win", function (){
	turn = 4;
	board = [
             ["X", "", ""],
             ["O", "O", ""],
             ["X", "", ""]
             ];
	computerTurn();
	ok(board[1][2] === "O");
});

test("2 Xs on 1 column should be blocked by O", function () {
	turn = 4;
	board = [
             ["X", "", ""],
             ["", "O", ""],
             ["X", "", ""]
             ];
	computerTurn();
	ok(board[1][0] === "O");
});

test("2 Os on 1 column with an open space should have computer win", function (){
	turn = 4;
	board = [
             ["X", "", "X"],
             ["", "O", ""],
             ["", "O", ""]
             ];
	computerTurn();
	ok(board[0][1] === "O");
});

test("2 Xs on 1 diagonal should be blocked by O", function () {
	turn = 4;
	board = [
             ["X", "", ""],
             ["", "", "O"],
             ["", "", "X"]
             ];
	computerTurn();
	ok(board[1][1] === "O");
});

test("2 Os on 1 diagonal with an open space should have computer win", function (){
	turn = 6;
	board = [
             ["X", "", ""],
             ["X", "O", ""],
             ["O", "X", ""]
             ];
	computerTurn();
	ok(board[0][2] === "O");
});

test("an open turn should prioritize the middle", function (){
	turn = 2;
	board = [
             ["X", "", ""],
             ["", "", ""],
             ["", "", ""]
             ];
	computerTurn();
	ok(board[1][1] === "O");
});

test("an open turn should prioritize the corners if middle is taken unless a fork is created", function (){
	turn = 4;
	board = [
             ["X", "", ""],
             ["", "O", ""],
             ["", "", "X"]
             ];
	computerTurn();
	ok(board[1][0] === "O");
});

test("an open turn should prioritize the edges if corners and middle are taken", function (){
	turn = 8;
	board = [
             ["X", "O", "X"],
             ["X", "O", ""],
             ["O", "X", "X"]
             ];
	computerTurn();
	ok(board[1][2] === "O");
});

//mocks
function htmlDraw() {};