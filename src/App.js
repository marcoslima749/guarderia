
//123 probando...

import React from 'react';

import { Home } from './home/pages/Home';
import { Login } from './auth/pages/Login';
import { Register } from './auth/pages/Register';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Dashboard } from './shared/pages/dashboard';


import './App.css'
import { Resumen } from './resumen/pages/Resumen';
import { Tareas } from './inicio/components/Tareas';
import { Embarcacion } from './embarcaciones/pages/Embarcacion';
import { Cliente } from './clientes/pages/Cliente';
import { Boton } from './shared/components/Boton';
import { CuentaCorriente } from './cuentacorriente/pages/CuentaCorriente';
import { Inicio } from './shared/components/Inicio';

export const App = () => {
    return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Dashboard clases="dashboard--home">
                        <Login />
                    </Dashboard>  
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                {/* a partir de acá está logueado
                    DEBERÍA RENDERIZAR UN COMPONENTE INICIO QUE CREE EL CONTEXTO DE DATOS
                    Y RENDERICE LAS RUTAS SEGUN CORRESPONDA, CADA UNA CON SU NAV, SIDE Y MAIN POR SEPARADO
                    Y CON LOS DATOS DEL CONTEXT SEGÚN SEA EL CASO,
                    EN ESE CASO EL LAYOUT ESTARÍA EN EL COMPONENTE "INICIO"
                 */}

                <Route path="/inicio">
                    <Inicio nombre="CYNM" descripcion="Tareas" />
                </Route>
                <Redirect to="/" />
                
            </Switch>
    )
}