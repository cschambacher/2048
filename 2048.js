export class Tile{
    constructor(board, pos, value) {
        this.board = board;
        this.pos = pos;
        this.value = value;
    }

    merge(otherTile){
        if(this === otherTile){
            return;
        }
        if(this.value === 0){
            this.value = otherTile.value;
        }else{
            this.value *= 2;     
        }
        otherTile.value = 0;
    }
};


export class Board {
    constructor(){
        this.grid = this.setupBoard();
    }

    setupBoard(){
        const grid = Board.makeGrid();
        console.table(grid);
        this.addTile(grid);
        this.addTile(grid);
        console.table(grid);
        return grid;
    }
    

    addTile(grid){
        let emptyTiles = [];
        grid.forEach(row => {
            row.forEach(tile => {
                if (tile.value === 0) {
                    emptyTiles.push(tile);
                }
            });
        });

        console.log(emptyTiles);

        if (emptyTiles.length > 0) {
            let tile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            tile.value = (Math.random(1) < 0.9) ? 2 : 4;

        }
    }
    // move in one direaction for now
    moveLeft(board){
        let grid = board.grid;
        console.log("move", grid);
        // move all left;
        grid.forEach(row => {
            // console.log("row before", row)
            for (var i = 0; i < row.length; i++) { 
                let tile = row[i];
                if (tile.value === 0) {
                    continue;
                }
                let newTile = tile;
                for(let j = i-1; j >= 0; j--){
                    let backTile = row[j];
                    if (backTile.value === 0){
                        newTile = backTile;
                    } else if (backTile.value === tile.value){
                        newTile = backTile;
                        break;
                    }else{
                        break;
                    }
                }
                newTile.merge(tile);
            } 
            
        });
        // console.log("move", grid);
        return grid;
        
        // combine tiles


    }
    moveRight(board){
        let grid = board.grid;
        console.log("move", grid);
        // move all left;
        grid.forEach(row => {
            // console.log("row before", row)
            for (var i = row.length-1; i >= 0; i--) { 
                let tile = row[i];
                if (tile.value === 0){
                    continue;
                }
                let newTile = tile;
                console.log("newTile", newTile);
                for (let j = i + 1; j < row.length; j++){
                    let backTile = row[j];
                    console.log("backTile", backTile);
                    if (backTile.value === 0){
                        newTile = backTile;
                    } else if (backTile.value === tile.value){
                        newTile = backTile;
                        break;
                    }else{
                        break;
                    }
                }
                newTile.merge(tile);
            } 
            
        });
        // console.log("move", grid);
        return grid;
        
        // combine tiles


    }

    combine(){

    }

    lost() {
        let lost = false;
        let empty = 0;
        this.grid.forEach(row => {
            row.forEach(tile => {
                if (tile.value === 0) {
                    empty ++;
                }
            });
        });
        return empty === 0;
    }

    won() {
        let won = false;
        this.grid.forEach(row => {
            row.forEach(tile => {
                if (tile.value === 2048) {
                    won = true;
                }
            });
        });
        return won;
    }
    getCols(grid){
        let cols = [[],[],[],[]]
        for(let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++) {
                const tile = grid[i][j]
                cols[j][i] = tile;
            }
        }
        console.log("getCols", cols);
        return cols;
    }
    
    static makeGrid() {
        const grid = [];

        for (let i = 0; i < 4; i++) {
            grid.push([]);
            // console.log(grid);
            for (let j = 0; j < 4; j++) {
                const tile = new Tile(this, [i, j], 0);
                grid[i].push(tile);
            }
        }

        return grid;
    }


}
