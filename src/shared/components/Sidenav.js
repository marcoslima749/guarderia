import React from 'react';

import './Sidenav.css';

import { Boton } from './Boton';

export const Sidenav = ({clases}) => {
    let paths = [
        "Emb",
        "Org",
        "Pagos",
        "Plan"
    ]

    return(
        <div className={`sidenav__container ${clases}`}>
            {paths.map((p) => <Boton path={`/${p}`} caption={p} clases="fondo-azul" /> )}
        </div>
    )
}