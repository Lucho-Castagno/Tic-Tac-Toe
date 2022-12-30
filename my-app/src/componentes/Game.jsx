import React, {useState} from 'react';
import Board from './Board';

const Game = () => {

    // el estado del tablero, donde squares es el tablero con los 9 cuadrados (de 0 a 8)
    // donde cada cuadrado tendra al comienzo el valor 'null' y luego, dependiendo del jugador
    // tendra el valor 'X' o 'O' quedando, por ejemplo, una matriz con los siguientes valores:
    // [
    // 'O', null, 'X',
    // 'X', 'X', 'O',
    // 'O', null, null,
    // ]
    // useState para cambiar el "estado"/valor de una variable (squares) con una funcion (setSquares),
    // asignada en un arreglo usando useState con un arreglo de 9 posiciones con nulls como valor por defecto de squares.
    
    const [history, setHistory] = useState( [{squares: Array(9).fill(null)}] );
    const [xsNext, setXsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    // funcion que calcula el ganardor de la partida en base a las lineas definidas en el arreglo "lines", que son todas
    // las posibles combinaciones que se pueden hacer para ganar una partida en el Tic-Tac-Toe (ta-te-ti).
    const calculateWinner = (squares) => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXsNext((step % 2) === 0);
    };

    const hist = history;
    const current = hist[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = hist.map((step, move) => {
        const desc = move ? 'Ir al movimiento # ' + move : 'Reiniciar partida';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;

    if (winner) {
        status = 'Ganador: ' + winner;
    } else {
        status = 'Siguiente jugador: ' + (xsNext ? 'X' : 'O');
    }

    const handleClick = (i) => {
        const hist = history.slice(0, stepNumber + 1);
        const current = hist[hist.length - 1];
        const squares = current.squares.slice();

        // se salta el click si ya hay un ganador o el cuadrado ya tiene una 'X' o una 'O'.
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xsNext ? 'X' : 'O';
        setHistory(hist.concat([{squares: squares}]));
        setStepNumber(hist.length);
        setXsNext(!xsNext);
    };

    return (
        <div className='game'>
            <div className='game-board'>
                <Board squares={current.squares} onClick={(i) => handleClick(i)} />
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
};

export default Game;
