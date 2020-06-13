import React from 'react';

import bote from '../../shared/components/iconos/bote.svg';
import billetera from '../../shared/components/iconos/billetera.svg';
import grafico from '../../shared/components/iconos/grafico.svg';
import planilla from '../../shared/components/iconos/planilla.svg';
import calendario from '../../shared/components/iconos/calendario.svg';


import { Sidenav } from '../../shared/components/Sidenav';

import './Inicio.css';
import { Tareas } from '../components/Tareas';

export const Inicio = ({clases}) => {
    return(
        <div className={`inicio__container ${clases}`}>
            <Sidenav clases="side" botones={[bote, calendario, billetera, grafico, planilla]}/>
            <Tareas clases="main" />
        </div>
    )
}