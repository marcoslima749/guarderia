import React from 'react';

import {Boton} from './Boton';

const listaDeBotones = [
    'Embarcaciones',
    'Clientes',
    'Cuentas Corrientes',
    'Gastos',
    'Cobros',
    'Caja',
    'Planillas'
]

export const Navegacion = (props) => {

    const botones = listaDeBotones.map( boton => <Boton captura={boton}/>)

    return (
        <nav>
        {botones}
        </nav>
    )
}