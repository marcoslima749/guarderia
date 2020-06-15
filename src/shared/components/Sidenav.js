import React from 'react';

import './Sidenav.css';

import { Boton } from './Boton';

export const Sidenav = ({clases, botones}) => {

    return(
        <div className={`sidenav__container ${clases}`}>
            {botones.map((i) => <Boton key={Math.random()} clases="boton--sidenav simple-hover"><img src={i} alt=""/></Boton> )}
        </div>
    )
}