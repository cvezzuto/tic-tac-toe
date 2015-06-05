var BOARD = BOARD || {};

BOARD.board = [
             ["", "", ""],
             ["", "", ""],
             ["", "", ""]
             ];

BOARD.get = {
	rows: function(){
		return BOARD.board;
	},
	columns: function(){
		return [[BOARD.board[0][0], BOARD.board[1][0], BOARD.board[2][0]],
        [BOARD.board[0][1], BOARD.board[1][1], BOARD.board[2][1]],
        [BOARD.board[0][2], BOARD.board[1][2], BOARD.board[2][2]]];
	},
	diagonals: function(){
		return [[BOARD.board[0][0], BOARD.board[1][1], BOARD.board[2][2]],
        [BOARD.board[0][2], BOARD.board[1][1], BOARD.board[2][0]]];
	},
	middle: function(){
		return BOARD.board[1][1];
	},
	corners: function(){
		return [BOARD.board[0][0], BOARD.board[0][2], BOARD.board[2][0], BOARD.board[2][2]];
	},
	cornerPairs: function(){
		return [
		          [BOARD.board[0][0], BOARD.board[2][2]],
		          [BOARD.board[2][0], BOARD.board[0][2]]
				];
	},
	edges: function(){
		return [BOARD.board[0][1], BOARD.board[1][0], BOARD.board[1][2], BOARD.board[2][1]];
	}
}


var turn = 1;

function canvasClicked(row, column){
	if(turn % 2 === 1){
		BOARD.board[row][column] = "X";
		htmlDraw();
		turn++; 
		computerTurn();
	}
};

function htmlDraw(){
	
	_.forEach(BOARD.board, function(row, rowIndex) {
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

	//OFFENSIVE
	if(turn % 2 === 0){
		//iterate through each row on the BOARD.board
		_.forEach(BOARD.get.rows(), function(row, rowIndex) {
			var rowCount = _.countBy(row);
			//first check for offensive (do you have 2 in a row with an open spot)...then win
			if(rowCount["O"] === 2 && rowCount[""] === 1 && turn % 2 === 0){
				var openIndex = _.indexOf(row, "");
				BOARD.board[rowIndex][openIndex] = "O";
				htmlDraw();
				turn++;
				
			}
		});
	}
	if(turn % 2 === 0){
		//iterate through each column on the BOARD.board 
		_.forEach(BOARD.get.columns(), function(column, columnIndex){
			var columnCount = _.countBy(column);
			if(columnCount["O"] === 2 && columnCount[""] === 1 && turn % 2 === 0){
				var openIndex = _.indexOf(column, "");
				BOARD.board[openIndex][columnIndex] = "O";
				htmlDraw();
				turn++;
				
			}
		});
	}
	if(turn % 2 === 0){
		//iterate through each diagonal
		_.forEach(BOARD.get.diagonals(), function(diag, diagIndex){
				var diagCount = _.countBy(diag);
				if(diagCount["O"] === 2 && diagCount[""] === 1 && turn % 2 === 0){
					var openIndex = _.indexOf(diag, "");
					if(diagIndex === 0){
						BOARD.board[openIndex][openIndex] = "O";
					}
					if(diagIndex === 1){
						if(openIndex === 0){
							BOARD.board[openIndex][2] = "O";
						}
						else if(openIndex === 1){
							BOARD.board[openIndex][openIndex]  = "O";
						}
						else if(openIndex === 2){
							BOARD.board[openIndex][0]  = "O";
						}
					}
					htmlDraw();
					turn++;
					
				}

			});
	}
	
	//DEFENSIVE
	if(turn % 2 === 0){
		//iterate through each row on the BOARD.board
		_.forEach(BOARD.get.rows(), function(row, rowIndex) {
			var rowCount = _.countBy(row);
			//first check for offensive (do you have 2 in a row with an open spot)...then win

			//then check defensive (do they have 2 in a row with an open spot)...then block
			if(rowCount["X"] === 2 && rowCount[""] === 1 && turn % 2 === 0){
				var openIndex = _.indexOf(row, "");
				BOARD.board[rowIndex][openIndex] = "O";
				htmlDraw();
				turn++;
				
			}
		});
	}
	if(turn % 2 === 0){
		//iterate through each column on the BOARD.board 
		_.forEach(BOARD.get.columns(), function(column, columnIndex){
			var columnCount = _.countBy(column);

			//then check defensive (do they have 2 in a row with an open spot)...then block
			if(columnCount["X"] === 2 && columnCount[""] === 1 && turn % 2 === 0){
				var openIndex = _.indexOf(column, "");
				BOARD.board[openIndex][columnIndex] = "O";
				htmlDraw();
				turn++;
				
			}
		});
	}
	if(turn % 2 === 0){
		//iterate through each diagonal
		_.forEach(BOARD.get.diagonals(), function(diag, diagIndex){
				var diagCount = _.countBy(diag);

				//then check defensive (do they have 2 in a row with an open spot)...then block
				if(diagCount["X"] === 2 && diagCount[""] === 1 && turn % 2 === 0){
					var openIndex = _.indexOf(diag, "");
					if(diagIndex === 0){
						BOARD.board[openIndex][openIndex] = "O";
					}
					if(diagIndex === 1){
						if(openIndex === 0){
							BOARD.board[openIndex][2]  = "O";
						}
						else if(openIndex === 1){
							BOARD.board[openIndex][openIndex]  = "O";
						}
						else if(openIndex === 2){
							BOARD.board[openIndex][0]  = "O";
						}
					}
					htmlDraw();
					turn++;
				}
			});
	}
	
	
	
	
	if(turn % 2 === 0){
	//if no unblocked pairs, block the X with the most blank Axis using logical priority
		//first, check the middle
		if(BOARD.get.middle() === ""){
			BOARD.board[1][1] = "O";
			htmlDraw();
			turn++;
		}
		//then check to see if the player has 2 opposite corners...if they do, create 2 in a row
		if(turn % 2 === 0){
			//iterate through each corner combo on the BOARD.board 
			_.forEach(BOARD.get.cornerPairs(), function(corners, cornersIndex){
				var cornerCount = _.countBy(corners);
				if(cornerCount["X"] === 2){
					//create 2 in a row using one of the sides
					_.forEach(BOARD.get.rows(), function(row, rowIndex) {
						var rowCount = _.countBy(row);
						//if you have 1 with an open space
						if(rowCount["O"] === 1 && rowCount[""] === 2 && turn % 2 === 0){
							var openIndex = _.indexOf(row, "");
							BOARD.board[rowIndex][openIndex] = "O";
							htmlDraw();
							turn++;
						}
					});
					if(turn % 2 === 0){
						//if you don't find any, go ahead and check column ways
						//iterate through each column on the BOARD.board 
						_.forEach(BOARD.get.columns(), function(column, columnIndex){
							var columnCount = _.countBy(column);
							if(columnCount["O"] === 1 && columnCount[""] === 2 && turn % 2 === 0){
								var openIndex = _.indexOf(column, "");
								BOARD.board[openIndex][columnIndex] = "O";
								htmlDraw();
								turn++;
								
							}
						});
					}
				}
			});
		}
		//then the corners (prioritizing opposite corners)
		if(turn % 2 === 0){
			_.forEach(BOARD.get.corners(), function(corner, cornerIndex){
				if(corner === "X" && turn % 2 === 0){
					if(cornerIndex === 0 && BOARD.board[2][2] === ""){
						BOARD.board[2][2] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 1 && BOARD.board[2][0] === ""){
						BOARD.board[2][0] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 2 && BOARD.board[0][2] === ""){
						BOARD.board[0][2] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 3 && BOARD.board[0][0] === ""){
						BOARD.board[0][0] = "O";
						htmlDraw();
						turn++;
					}
				}
				else if(corner === "" && turn % 2 === 0){
					if(cornerIndex === 0){
						BOARD.board[0][0] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 1){
						BOARD.board[0][2] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 2){
						BOARD.board[2][0] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 3){
						BOARD.board[2][2] = "O";
						htmlDraw();
						turn++;
					}
				}
			});
		}
		//then the edges
		if(turn % 2 === 0) {
			_.forEach(BOARD.get.edges(), function(corner, cornerIndex){
				if(corner === "" && turn % 2 === 0){
					if(cornerIndex === 0){
						BOARD.board[0][1] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 1){
						BOARD.board[1][0] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 2){
						BOARD.board[1][2] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 3){
						BOARD.board[2][1] = "O";
						htmlDraw();
						turn++;
					}
				}
			});
		}
	}
};


