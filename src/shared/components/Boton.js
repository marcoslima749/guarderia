import React from 'react';
import './Boton.css';

import { Link } from 'react-router-dom';


export const Boton = ({path = "#", clases = '', caption = "Un Botón" }) => {
    return(
        <Link to={path} className={`boton ${clases}`}>{caption}</Link>
    )
}