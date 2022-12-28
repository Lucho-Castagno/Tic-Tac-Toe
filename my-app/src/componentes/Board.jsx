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

    const handleClick = (i) => {
        const sq = squares.slice();
        sq[i] = 'X';
        setSquares(sq);
    };

    // para saber el estado de los cuadrados, mandamos una funcion en el onClick para que el 
    // cuadrado pueda actualizar el estado de su padre (Board).
    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />
    };

    const status = 'Siguiente jugador: X';

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
