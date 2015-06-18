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
		var cols = [];
		_.forEach(BOARD.get.rows()[0], function(firstRowSpace, columnIndex) {
			cols.push(BOARD.board.map(function(value,index) { return value[columnIndex]; }));
		});
		return cols;
	},
	diagonals: function(){
		var diagonal1 = [];
		var diagonal2 = [];
		var diagonals = [];
		for (var row = 0; row < BOARD.get.rows().length; row++)
	    {
	        diagonal1.push(BOARD.board[row][row]);
	    }
		diagonals.push(diagonal1);
		
		for (var row = 0; row < BOARD.get.rows().length; row++)
	    {
	        diagonal2.push(BOARD.board[row][Math.abs(row-2)]);
	    }
		diagonals.push(diagonal2);
		
		return diagonals;
	},
	middle: function(){
		return BOARD.board[Math.floor(BOARD.get.rows().length / 2)][Math.floor(BOARD.get.columns().length / 2)];
	},
	corners: function(){
		return [
		        BOARD.board[0][0], 
		        BOARD.board[0][BOARD.get.columns().length - 1], 
		        BOARD.board[BOARD.get.rows().length - 1][0], 
		        BOARD.board[BOARD.get.rows().length - 1][BOARD.get.columns().length - 1]
		        ];
	},
	cornerPairs: function(){
		return [
		          [BOARD.board[0][0], BOARD.board[BOARD.get.rows().length - 1][BOARD.get.columns().length - 1]],
		          [BOARD.board[BOARD.get.rows().length - 1][0], BOARD.board[0][BOARD.get.columns().length - 1]]
				];
	},
	edges: function(){
		return [
		        BOARD.board[0][Math.floor(BOARD.get.columns().length / 2)], 
		        BOARD.board[Math.floor(BOARD.get.columns().length / 2)][0], 
		        BOARD.board[Math.floor(BOARD.get.columns().length / 2)][BOARD.get.columns().length - 1], 
		        BOARD.board[BOARD.get.rows().length - 1][Math.floor(BOARD.get.columns().length / 2)]
		        ];
	}
}
