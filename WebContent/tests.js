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