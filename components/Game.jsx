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
            score: 0,
            bestScore: 0
        };
       
        this.handleLeft = this.handleLeft.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleRight = this.handleRight.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress); 
        this.setState({ bestScore: localStorage.getItem('bestScore') });

    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    // change code above this line
    handleLeft() {
        this.state.board.moveLeft(this.state.board)
        this.updateGame(this.state.board);
    }
    handleUp() {
        this.state.board.moveUp(this.state.board)
        this.updateGame(this.state.board);
    }
    handleRight() {
        this.state.board.moveRight(this.state.board)
        this.updateGame(this.state.board);
    }
    handleDown() {
        this.state.board.moveDown(this.state.board)
        this.updateGame(this.state.board);
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
        if (newBoard.lost(newBoard.grid)){
            this.setState({ lost: true });
            if (this.state.score > this.state.bestScore){
                localStorage.setItem('bestScore', this.state.score);
            }
            localStorage.removeItem('lastGame');
            return;
        } else if (newBoard.won(newBoard.grid)){
            this.setState({ won: true });
        }
        this.setState({ board: newBoard, score: newBoard.score });
        const currBoard = JSON.stringify(this.state.board, (key, value) => {
            if (key == 'board') {
                return null;
            } else {
                return value;
            };
        });
        localStorage.setItem('lastGame', currBoard);
    }
    message(){
        if (this.state.lost) {
            return (<p>You Lost!</p>)
        }
        if (this.state.won){
            return (<p>YOU WON !!!</p>)
        }
    }
   
    render() {
        console.log("ls", JSON.parse(localStorage.getItem('lastGame')))
        // const currBoard =  || this.state.board;
        return (
            <div>
                <div className="header">

                </div>
                <div className="game-container">
                    <div className="heading">
                        <h1 className="title">2048</h1>
                        <div>{this.message()}</div>
                        <div>Best Score: {this.state.bestScore}</div>
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