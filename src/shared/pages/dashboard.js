import React from 'react'

import {Cabecera} from '../components/Cabecera';
import { Sidenav } from '../components/Sidenav';
import {Pie} from '../components/Pie';

import bote from '../../shared/components/iconos/bote.svg';
import billetera from '../../shared/components/iconos/billetera.svg';
import grafico from '../../shared/components/iconos/grafico.svg';
import planilla from '../../shared/components/iconos/planilla.svg';
import calendario from '../../shared/components/iconos/calendario.svg';

import './Dashboard.css';

export const Dashboard = ({
    nombre,
    descripcion,
    panel,
    children,
    clases,
    side
    }) => {

        let listaBotones = [
            bote,
            calendario,
            billetera,
            grafico,
            planilla
        ];

        let listaPaths = [
            '/embarcaciones',
            '/inicio',
            '/pagos',
            '/reportes',
            '/planillas'
        ];

    return(
        <div className={`dashboard ${clases}`}>
            <Cabecera nombre={nombre} descripcion={descripcion}>
               { panel && panel }
            </Cabecera>
            <div className="dashboard__main">
            {side && <Sidenav botones={listaBotones} paths={listaPaths} />}
            {children}
            </div>
            <Pie />
        </div>
    )

                    
}