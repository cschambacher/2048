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
        // this.getCols(this.grid);
        this.move();
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
        for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
            for (let colIdx = 0; colIdx < 4; colIdx++) {
                
                const tile = grid[rowIdx][colIdx];
                // console.log("get value", tile.value);
                if (tile.value === 0) {
                    emptyTiles.push([rowIdx, colIdx]);
                }
            }
        }
        console.log(emptyTiles);
        if (emptyTiles.length > 0) {
            let pos = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            // console.log("pos", pos)
            let r = Math.random(1);
            let newvalue, tile;
            newvalue = (r < 0.9 )? 2 : 4;
            // console.log("value", newvalue);
            tile = grid[pos[0]][pos[1]]
            // console.log("old tile", grid[pos[0]][pos[1]]);
            tile.value = newvalue;
            console.log("new tile", grid[pos[0]][pos[1]]);

        }
    }
    // move in one direaction for now
    move(){
        let grid = this.grid;
        // move all left;
        this.grid.forEach(row => {
            // console.log("row before", row)
            for (var i = 0; i < row.length; i++) { 
                let tile = row[i];
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
        this.grid = grid;
        console.log("move", grid);
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
