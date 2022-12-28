import React, {useState} from 'react';

const Square = (props) => {

    // useState para cambiar el "estado"/valor de una variable (value) con una funcion (setValue),
    // asignada en un arreglo usando useState con null como valor por defecto de value.
    const [value, setValue] = useState(null);

    return (
        <button className='square' onClick={() => setValue('X') }>
            {value}
        </button>
    )
};

export default Square;
