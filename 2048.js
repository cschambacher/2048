export class Tile{
    constructor(board, pos, value) {
        this.board = board;
        this.pos = pos;
        this.value = value;
        this.merged = false;
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
        this.score = 0;
    
    }

    setupBoard(){
        const grid = Board.makeGrid();
        this.addTile(grid);
        this.addTile(grid);
        return grid;
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
        return grid;
    }
    // move in one direaction for now
    moveLeft(board){
        let grid = board.grid;
        let moved = false;
        
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
                        moved = true;
                    } else if (backTile.value === tile.value && (!backTile.merged)){
                        console.log("backtile.merge", backTile.merge)
                        newTile = backTile;
                        this.score += newTile.value * 2;
                        moved = true;
                        break;
                    }else{
                        break;
                    }
                }
                newTile.merge(tile);
            } 
            
        });
        grid = this.resetFlag(grid);
        if (moved){
            this.addTile(grid);
            
        }
        // console.log("move", grid);
        return grid;
    }
    moveUp(board){
        let grid = board.grid;
        let cols = this.transpose(grid);
        let moved = false;
       
        console.log("move", cols);
        // move all left;
        cols.forEach(row => {
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
                        moved = true;
                    } else if (backTile.value === tile.value && (!backTile.merged)){
                        newTile = backTile;
                        this.score += newTile.value * 2;
                        moved = true;
                        break;
                    }else{
                        break;
                    }
                }
                newTile.merge(tile);
            } 
            
        });
        grid = this.transpose(cols);
        grid = this.resetFlag(grid);
        if (moved) {
            this.addTile(grid);
        };// console.log("move", grid);
        return grid;
    }

    moveRight(board){
        let grid = board.grid;
        let moved = false;
      
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
                        moved = true;
                    } else if (backTile.value === tile.value && (!backTile.merged)){
                        newTile = backTile;
                        this.score += newTile.value * 2;
                        moved = true
                        break;
                    }else{
                        break;
                    }
                }
                newTile.merge(tile);
            } 
            
        });
        grid = this.resetFlag(grid);
        if (moved) {
            this.addTile(grid);
        }
        return grid;
        
        // combine tiles


    }
    moveDown(board){
        let grid = board.grid;
        let cols = this.transpose(grid);
   
        let moved = false;
        console.log("move", cols);
        // move all left;
        cols.forEach(row => {
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
                        moved = true;
                    } else if (backTile.value === tile.value && (!backTile.merged)){
                        newTile = backTile;
                        this.score += newTile.value * 2;
                        moved = true;
                        break;
                    }else{
                        break;
                    }
                }
                newTile.merge(tile);
            } 
            
        });
        grid = this.transpose(cols);
        grid = this.resetFlag(grid);
        if (moved) {
            this.addTile(grid);
        };// console.log("move", grid);
        return grid;
        
        // combine tiles


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
