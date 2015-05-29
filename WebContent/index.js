var board = [
             ["", "", ""],
             ["", "", ""],
             ["", "", ""],
             ];

var turn = 1;

function canvasClicked(row, column){
	if(turn % 2 === 1){
		board[row][column] = "X";
		htmlDraw();
		turn++; 
		computerTurn();
	}
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
			if(space === "O"){
				cxt.beginPath();
				cxt.arc(25,25,20,0,Math.PI*2,true);
				cxt.stroke();
				cxt.closePath();
			}

		});
	});
};

function computerTurn(){
	if(turn % 2 === 0){
		//first check for offensive (do you have 2 in a row with an open spot)...then win
		
		//then check defensive (do they have 2 in a row with an open spot)...then block
		//if no unblocked pairs, block the X with the most blank Axis using logical priority
	}
};


