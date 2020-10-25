
import React from 'react'

import {Cabecera} from './Cabecera';
import { Sidenav } from './Sidenav';
import {Pie} from './Pie';

import bote from './iconos/bote.svg';
import billetera from './iconos/billetera.svg';
import grafico from './iconos/grafico.svg';
import planilla from './iconos/planilla.svg';
import calendario from './iconos/calendario.svg';

import './Inicio.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Tareas } from '../../inicio/components/Tareas';

import axios from 'axios';
import { Resumen } from '../../resumen/pages/Resumen';
import { Embarcacion } from '../../embarcaciones/pages/Embarcacion';
import { CuentaCorriente } from '../../cuentacorriente/pages/CuentaCorriente';
import { Cliente } from '../../clientes/pages/Cliente';

export const Inicio = ({
    nombre,
    descripcion,
    panel,
    clases,
    side = true
    }) => {

        let listaBotones = [
            bote,
            calendario,
            billetera,
            grafico,
            planilla
        ];

        let listaPaths = [
            '/inicio/resumen',
            '/inicio/',
            '/inicio/pagos',
            '/inicio/reportes',
            '/inicio/planillas'
        ];

    return(
        <div className={`dashboard ${clases}`}>
            <Cabecera nombre={nombre} descripcion={descripcion}>
               { panel && panel }
            </Cabecera>
            <div className="dashboard__main">
            {side && <Sidenav botones={listaBotones} paths={listaPaths} />}
                <Switch>

                    <Route exact path='/inicio'>
                        <Tareas/>
                    </Route>
                    <Route path="/inicio/resumen">
                        <Resumen />
                    </Route>
                    <Route path="/inicio/embarcaciones/:id">
                        <Embarcacion />
                    </Route>
                    <Route path="/inicio/clientes/:id/cta-cte">
                        <CuentaCorriente />
                    </Route>
                    <Route path="/inicio/clientes/:id">
                        <Cliente />
                    </Route>
                    <Redirect to='/inicio' />

                </Switch>
            </div>
            <Pie />
        </div>
    )

                    
}