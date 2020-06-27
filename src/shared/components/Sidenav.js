import React from 'react';

import './Sidenav.css';

import { Boton } from './Boton';
import { NavLink } from 'react-router-dom';

export const Sidenav = ({clases, botones, paths}) => {

    return(
        <div className={`sidenav__container ${clases}`}>
            {botones.map((i, ind) => <NavLink to={paths[ind]} activeClassName="sidenav__activo" key={Math.random()} className="boton--sidenav simple-hover"><img src={i} alt=""/></NavLink> )}
        </div>
    )
}