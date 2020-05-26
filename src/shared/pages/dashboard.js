import React from 'react'

import {Cabecera} from '../components/Cabecera';
import {Pie} from '../components/Pie';

import './Dashboard.css';

export const Dashboard = ({
    nombre,
    descripcion,
    panel,
    children
    }) => {

    return(
        <div className="dashboard">
            <Cabecera nombre={nombre} descripcion={descripcion} panel={panel}/>
            {children}
            <Pie />
        </div>
    )

                    
}