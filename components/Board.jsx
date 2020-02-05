import Tile from './Tile';
import React from 'react';


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.rowMaker = this.rowMaker.bind(this);
        this.tileMaker = this.tileMaker.bind(this);
    }

    render() {
        const board = this.props.board;
        // console.log("render", board)
        const that = this;
        return (
            <div id="board">
                {this.rowMaker()}
            </div>
        );

    }
    rowMaker() {
        const board = this.props.board;
        // console.log("row maker", board )
        return board.grid.map((row, i) => {
            return (
                <div className="row" key={`row-${i}`}>
                    {this.tileMaker(row, i)}
                </div>
            );
        });
    }
    tileMaker(row, i) {
        const board = this.props.board;
        return row.map((tile, j) => {
            // console.log("tile", row[i])
            return (
                <Tile
                    tile={tile}
                    // updateGame={this.props.updateGame}
                    key={`row-${i}-${j}`} />
            );
        });
    }
}

export default Board;