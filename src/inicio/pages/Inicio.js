import React from 'react';

import { Sidenav } from '../../shared/components/Sidenav';

import './Inicio.css';
import { Tareas } from '../components/Tareas';

export const Inicio = ({clases}) => {
    return(
        <div className={`inicio__container ${clases}`}>
            <Sidenav clases="side" />
            <Tareas clases="main" />
        </div>
    )
}