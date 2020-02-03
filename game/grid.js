class Grid {
    constructor(){
        this.grid = Board.makeGrid(num);
    }

    static makeGrid(num) {
        const grid = [];

        for (let i = 0; i < num; i++) {
            grid.push([]);
            for (let j = 0; j < num; j++) {
                grid[i].push(0);
            }
        }

        return grid;
    }

    
}