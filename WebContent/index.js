var board = [
             ["", "", ""],
             ["", "", ""],
             ["", "", ""],
             ];

function canvasClicked(row, column){
	board[row][column] = "X";
	htmlDraw();
};

function htmlDraw(){
	
	_.forEach(board, function(row, rowIndex) {
		_.forEach(row, function(space, columnIndex) {
			c = document.getElementById("canvas_" + rowIndex + "_" + columnIndex);
			cxt = c.getContext("2d");
			if(space === "X"){
				cxt.beginPath();
	            cxt.moveTo(10,10);
	            cxt.lineTo(40,40);
	            cxt.moveTo(40,10);
	            cxt.lineTo(10,40);
	            cxt.stroke();
	            cxt.closePath();
			}

		});
	});
};
