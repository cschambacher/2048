export class Tile{
    constructor(board, pos, value) {
        this.board = board;
        this.pos = pos;
        this.value = value;
    }
}
export class Board {
    constructor(){
        this.grid = this.setupBoard();;
        // this.setupBoard();
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
                console.log("get value", tile.value);
                if (tile.value === 0) {
                    emptyTiles.push([rowIdx, colIdx]);
                }
            }
        }
        // console.log(emptyTiles);
        if (emptyTiles.length > 0) {
            let pos = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            console.log("pos", pos)
            let r = Math.random(1);
            let newvalue, tile;
            newvalue = (r > 0.5 )? 2 : 4;
            console.log("value", newvalue);
            tile = grid[pos[0]][pos[1]]
            console.log("old tile", grid[pos[0]][pos[1]]);
            tile.value = newvalue;
            console.log("new tile", grid[pos[0]][pos[1]]);

        }
    }

    static makeGrid() {
        const grid = [];

        for (let i = 0; i < 4; i++) {
            grid.push([]);
            // console.log(grid);
            for (let j = 0; j < 4; j++) {
                const tile = new Tile(this, [i, j], 0);
                // console.log(tile);
                console.log("row", grid[i]);

                grid[i].push(tile);
            }
        }

        return grid;
    }


}
