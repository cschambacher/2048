import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 150, 100);

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Game />, document.getElementById('root'));
});