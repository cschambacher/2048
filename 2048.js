export class Tile{
    constructor(board, value) {
        this.board = board;
        this.value = value;
        this.merged = false;
    }

    merge(otherTile){
        if(this === otherTile){
            return;
        }

        this.board.moved = true;

        if(this.value === 0){
            this.value = otherTile.value;
        }else{
            this.value *= 2;   
            this.merged = true;
            this.board.score += this.value;
        }
       
        otherTile.value = 0;
    }
};

export class Board {
    constructor(){
        this.grid = [];
        this.score = 0;
        this.moved = false;
        this.setupBoard();
        // const preloadedState = JSON.parse(localStorage.getItem('lastGame'));
        // if (preloadedState) {    
        //     this.grid = this.preload(preloadedState.grid),
        //     this.score = preloadedState.score,
        //     this.moved = false
        // } else {
        //     this.grid = this.setupBoard();
        //     this.score = 0;
        //     this.moved = false;
        // }
    }
   
    preload(preloadedGrid){
        const grid = [];

        for (let i = 0; i < 4; i++) {
            grid.push([]);
            for (let j = 0; j < 4; j++) {
                const preloadedTile = preloadedGrid[i][j];
                const tile = new Tile(this, preloadedTile.value);
                grid[i].push(tile);
            }
        }
        console.log("preload", grid);
        return grid;
    }

    setupBoard(){
        const preloadedState = JSON.parse(localStorage.getItem('lastGame'));
        console.log("setup", preloadedState);
        if (preloadedState) {
            this.grid = this.preload(preloadedState.grid),
            this.score = preloadedState.score,
            this.moved = false
        } else {
            this.grid = Board.makeGrid(this);
            this.score = 0;
            this.moved = false;
            this.addTile(this.grid);
            this.addTile(this.grid);
        }
        // return grid;
    }
    
    options(grid){
        let emptyTiles = [];
        grid.forEach(row => {
            row.forEach(tile => {
                if (tile.value === 0) {
                    emptyTiles.push(tile);
                }
            });
        });
        return emptyTiles;
    }
    empty(grid){
        return this.options(grid).length === 0;
    }

    moves(grid){
        let cols = this.transpose(grid);
        let total = grid.concat(cols);
        for (let i = 0; i < total.length; i++) {
            let ele = total[i]
            for (let j = 0; j < ele.length - 1; j++) {
                let tile = ele[j];
                let nextTile = ele[j + 1]
                if (tile.value === nextTile.value) {
                    return true;
                }
            };
        };
        return false;
    }

    addTile(grid){
        let emptyTiles= this.options(grid);
        if (emptyTiles.length > 0){
            let tile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            tile.value = (Math.random(1) < 0.9) ? 2 : 4;
        }
    }

    resetFlag(grid){
        grid.forEach(row => {
            row.forEach(tile => {
                if (tile.merged === true) {
                    tile.merged = false;
                }
            });
        });
        this.moved = false;
        return grid;
    }

    applyChange(grid) {
        grid.forEach(row => {
            // console.log("row before", row)
            for (var i = 0; i < row.length; i++) {
                let tile = row[i];
                if (tile.value === 0) {
                    continue;
                }
                let newTile = tile;
                for (let j = i - 1; j >= 0; j--) {
                    let backTile = row[j];
                    if (backTile.value === 0) {
                        newTile = backTile;
                    } else if (backTile.value === tile.value && (!backTile.merged)) {
                        newTile = backTile;
                        break;
                    } else {
                        break;
                    }
                }
                newTile.merge(tile);
            }

        });

        if (this.moved) {
            this.addTile(grid);
        }
        grid = this.resetFlag(grid);
    }

    moveLeft(board){
        this.applyChange(board.grid);
    }

    moveRight(board) {
        let reversedGrid = board.grid.map(row => row.slice().reverse());
        this.applyChange(reversedGrid);
    }

    moveUp(board){
        let transposedGrid = this.transpose(board.grid);
        this.applyChange(transposedGrid);
    }

    moveDown(board){
        let transposedGrid = this.transpose(board.grid);
        transposedGrid = transposedGrid.map(row => row.slice().reverse());
        this.applyChange(transposedGrid);
    }

    lost(grid) {
        let lost = (this.empty(grid) && (!this.moves(grid)));
        console.log("lost", lost)
        return lost;
    }

    won(grid) {
        let won = false;
        grid.forEach(row => {
            row.forEach(tile => {
                if (tile.value === 2048) {
                    won = true;
                }
            });
        });
        console.log("won", won)
        return won;
    }

    transpose(grid){
        let cols = [[],[],[],[]]
        for(let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++) {
                const tile = grid[i][j]
                cols[j][i] = tile;
            }
        }
        console.log("transpose", cols);
        return cols;
    }
    
    static makeGrid(board) {
        const grid = [];

        for (let i = 0; i < 4; i++) {
            grid.push([]);
            // console.log(grid);
            for (let j = 0; j < 4; j++) {
                const tile = new Tile(board, 0);
                grid[i].push(tile);
            }
        }

        return grid;
    }

}


