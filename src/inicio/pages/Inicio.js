import React from 'react';

import { Sidenav } from '../../shared/components/Sidenav';

import './Inicio.css';

export const Inicio = ({clases}) => {
    return(
        <div className={`inicio__container dashboard__main ${clases}`}>
            <Sidenav />
            <h1 style={{display: "inline-block"}}>Contenido de inicio</h1>
        </div>
    )
}