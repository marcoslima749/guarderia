import React from 'react'

import {Cabecera} from '../components/Cabecera';
import {Pie} from '../components/Pie';

import './Dashboard.css';

export const Dashboard = ({
    nombre,
    descripcion,
    panel,
    children,
    clases
    }) => {

    return(
        <div className={`dashboard ${clases}`}>
            <Cabecera nombre={nombre} descripcion={descripcion}>
               { panel && panel }
            </Cabecera>
            {children("dashboard__main")}
            <Pie />
        </div>
    )

                    
}