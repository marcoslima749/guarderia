import React from 'react';

import './Sidenav.css';

import { Boton } from './Boton';

export const Sidenav = ({clases, botones}) => {
    let paths = [
        "Emb",
        "Org",
        "Pagos",
        "Plan"
    ]

    return(
        <div className={`sidenav__container ${clases}`}>
            {botones.map((i) => <img src={i} alt=""/> )}
        </div>
    )
}