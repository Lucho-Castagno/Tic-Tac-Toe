import React, {useState} from 'react';
import Square from './Square';

const Board = () => {

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
    const [squares, setSquares] = useState(Array(9).fill(null));

    const [xsNext, setXsNext] = useState(true);

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

    const handleClick = (i) => {
        const sq = squares.slice();
        // se salta el click si ya hay un ganador o el cuadrado ya tiene una 'X' o una 'O'.
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        sq[i] = xsNext ? 'X' : 'O';
        setSquares(sq);
        setXsNext(!xsNext);
    };

    // para saber el estado de los cuadrados, mandamos una funcion en el onClick para que el 
    // cuadrado pueda actualizar el estado de su padre (Board).
    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />
    };

    const winner = calculateWinner(squares);
    let status;

    if (winner) {
        status = 'Ganador: ' + winner;
    } else {
        status = 'Siguiente jugador: ' + (xsNext ? 'X' : 'O');
    }

    return (
        <div>
            <div className='status'>{status}</div>
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
};

export default Board;
