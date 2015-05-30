var board = [
             ["", "", ""],
             ["", "", ""],
             ["", "", ""]
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
	//if first move is in a corner, then you need to place a block in the opposite corner
	
	if(turn % 2 === 0){
		//iterate through each row on the board
		_.forEach(board, function(row, rowIndex) {
			var rowCount = _.countBy(row);
			//first check for offensive (do you have 2 in a row with an open spot)...then win
			if(rowCount["O"] === 2 && rowCount[""] === 1 && turn % 2 === 0){
				var openIndex = _.indexOf(row, "");
				board[rowIndex][openIndex] = "O";
				htmlDraw();
				turn++;
				
			}
			//then check defensive (do they have 2 in a row with an open spot)...then block
			else if(rowCount["X"] === 2 && rowCount[""] === 1 && turn % 2 === 0){
				var openIndex = _.indexOf(row, "");
				board[rowIndex][openIndex] = "O";
				htmlDraw();
				turn++;
				
			}
		});
	}
	if(turn % 2 === 0){
		//iterate through each column on the board 
		_.forEach([
		          [board[0][0], board[1][0], board[2][0]],
		          [board[0][1], board[1][1], board[2][1]],
		          [board[0][2], board[1][2], board[2][2]]
				], function(column, columnIndex){
			var columnCount = _.countBy(column);
			if(columnCount["O"] === 2 && columnCount[""] === 1 && turn % 2 === 0){
				var openIndex = _.indexOf(column, "");
				board[openIndex][columnIndex] = "O";
				htmlDraw();
				turn++;
				
			}
			//then check defensive (do they have 2 in a row with an open spot)...then block
			else if(columnCount["X"] === 2 && columnCount[""] === 1 && turn % 2 === 0){
				var openIndex = _.indexOf(column, "");
				board[openIndex][columnIndex] = "O";
				htmlDraw();
				turn++;
				
			}
		});
	}
	if(turn % 2 === 0){
		//iterate through each diagonal
		_.forEach([
			          [board[0][0], board[1][1], board[2][2]],
			          [board[0][2], board[1][1], board[2][0]]
					], function(diag, diagIndex){
				var diagCount = _.countBy(diag);
				if(diagCount["O"] === 2 && diagCount[""] === 1 && turn % 2 === 0){
					var openIndex = _.indexOf(diag, "");
					if(diagIndex === 0){
						board[openIndex][openIndex] = "O";
					}
					if(diagIndex === 1){
						if(openIndex === 0){
							board[openIndex][2] = "O";
						}
						else if(openIndex === 1){
							board[openIndex][openIndex]  = "O";
						}
						else if(openIndex === 2){
							board[openIndex][0]  = "O";
						}
					}
					htmlDraw();
					turn++;
					
				}
				//then check defensive (do they have 2 in a row with an open spot)...then block
				else if(diagCount["X"] === 2 && diagCount[""] === 1 && turn % 2 === 0){
					var openIndex = _.indexOf(diag, "");
					if(diagIndex === 0){
						board[openIndex][openIndex] = "O";
					}
					if(diagIndex === 1){
						if(openIndex === 0){
							board[openIndex][2]  = "O";
						}
						else if(openIndex === 1){
							board[openIndex][openIndex]  = "O";
						}
						else if(openIndex === 2){
							board[openIndex][0]  = "O";
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
		if(board[1][1] === ""){
			board[1][1] = "O";
			htmlDraw();
			turn++;
		}
		//then the corners
		else if(turn % 2 === 0){
			_.forEach([board[0][0], board[0][2], board[2][0], board[2][2]], function(corner, cornerIndex){
				if(corner === "" && turn % 2 === 0){
					if(cornerIndex === 0){
						board[0][0] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 1){
						board[0][2] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 2){
						board[2][0] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 3){
						board[2][2] = "O";
						htmlDraw();
						turn++;
					}
				}
			});
		}
		//then the edges
		else {
			_.forEach([board[0][1], board[1][0], board[1][2], board[2][1]], function(corner, cornerIndex){
				if(corner === "" && turn % 2 === 0){
					if(cornerIndex === 0){
						board[0][1] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 1){
						board[1][0] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 2){
						board[1][2] = "O";
						htmlDraw();
						turn++;
					}
					if(cornerIndex === 3){
						board[2][1] = "O";
						htmlDraw();
						turn++;
					}
				}
			});
		}
	}
};


