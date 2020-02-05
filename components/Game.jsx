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
        this.handleLeft = this.handleLeft.bind(this);
        this.handleRight = this.handleRight.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    // change code above this line
    handleLeft() {
        let newBoard = this.state.board;
        newBoard.grid = this.state.board.moveLeft(this.state.board)
        this.updateGame(newBoard);
    }
    handleRight() {
        let newBoard = this.state.board;
        newBoard.grid = this.state.board.moveRight(this.state.board)
        this.updateGame(newBoard);
    }
    handleKeyPress(event) {
        var map = {
            38: 0, // Up
            39: 1, // Right
            40: 2, // Down
            37: 3, // Left
            75: 0, // Vim up
            76: 1, // Vim right
            74: 2, // Vim down
            72: 3, // Vim left
            87: 0, // W
            68: 1, // D
            83: 2, // S
            65: 3  // A
        };
        if (map[event.keyCode] === 3) {
            this.handleLeft();
        } else if (map[event.keyCode] === 1) {
            this.handleRight();
        }
    }


    updateGame(newBoard) {
        this.setState({ board: newBoard });
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