import React from 'react';

import './boton.css';

export const Boton = (props) => {
    return  (
        <a className="miboton" href="#">
            {props.captura}
        </a>
    )
}