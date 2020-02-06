import React from 'react';
import * as Puzzle from '../2048';
import Board from './board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = new Puzzle.Board();
        this.state = {
            board: board,
            lost: false,
            won: false,
            score: 0
        };
        this.handleLeft = this.handleLeft.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleRight = this.handleRight.bind(this);
        this.handleDown = this.handleDown.bind(this);
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
    handleUp() {
        let newBoard = this.state.board;
        newBoard.grid = this.state.board.moveUp(this.state.board)
        this.updateGame(newBoard);
    }
    handleRight() {
        let newBoard = this.state.board;
        newBoard.grid = this.state.board.moveRight(this.state.board)
        this.updateGame(newBoard);
    }
    handleDown() {
        let newBoard = this.state.board;
        newBoard.grid = this.state.board.moveDown(this.state.board)
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
        } else if (map[event.keyCode] === 0) {
            this.handleUp();
        } else if (map[event.keyCode] === 2) {
            this.handleDown();
        }
    }

    restartGame() {
        const board = new Puzzle.Board();
        this.setState({ board: board });
    }
    updateGame(newBoard) {
        console.log("update", newBoard)
        // let newScore = newBoard.grid[1];
        if (newBoard.lost(newBoard.grid)){
            this.setState({ lost: true });
        } else if (newBoard.won(newBoard.grid)){
            this.setState({ lost: true });
        }
        this.setState({ board: newBoard, score: newBoard.score });
    }
    message(){
        if (this.state.lost) {
            return (<p>You Lost!</p>)
        } else if (this.state.won){
            return (<p>YOU WON !!!</p>)
        }else{
            return (<p>go !</p>)
        }
    }
    render() {
        
        return (
            <div>
                <div className="header">

                </div>
                <div className="game-container">
                    <div className="heading">
                        <h1 className="title">2048</h1>
                        <div>{this.message()}</div>
                        <div className="scores-container">
                            <div className="score-container">Score: {this.state.score}</div>
                        </div>
                    </div>
                <Board board={this.state.board}  />
                    <p className="game-explanation">
                        <strong className="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>
                    </p>
                </div>
                <div className="footer">

                </div>
            </div>
        )
    }

}

export default Game;