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
	canvasClicked(1,0);
	ok(turn === 2);
});

test("2 Xs on 1 axis should be blocked by O", function () {
	board = [
             ["X", "", "X"],
             ["", "O", ""],
             ["", "", ""],
             ];
	computerTurn();
	ok(board[0][1] === "O");
});

test("2 Os on 1 axis with an open space should have computer win", function (){
	board = [
             ["X", "O", "X"],
             ["X", "O", ""],
             ["", "", ""],
             ];
	computerTurn();
	ok(board[2][1] === "O");
});

//mocks
function htmlDraw() {};