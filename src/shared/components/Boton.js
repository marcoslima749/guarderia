import React from 'react';
import './Boton.css';

import { Link } from 'react-router-dom';


export const Boton = ({path = "#", clases = '', children }) => {
    return(
        <Link to={path} className={`boton ${clases}`}>{children ? children : "Un botón"}</Link>
    )
}