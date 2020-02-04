import React from 'react';
import * as Puzzle from '../2048';
import Board from './board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = new Puzzle.Board();
        this.state = {
            board: board
        };
       
    }
    

    render() {
        
        return (
            <div>
                <h1>Helloooooo</h1>
                <Board board={this.state.board}  />
            </div>
        )
    }

}

export default Game;