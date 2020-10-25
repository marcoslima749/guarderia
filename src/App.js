
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

                <Route exact path="/inicio">
                    <Dashboard nombre="CYNM" descripcion="Tareas" side={true} >
                        <Tareas />
                    </Dashboard>  
                </Route>
                <Route exact path="/resumen">
                    <Dashboard nombre="CYNM" descripcion="Resumen" side={true} panel={<Boton path="#" clases="simple-hover embarcacion__boton-nuevo">Nuevo</Boton>} >
                        <Resumen />
                    </Dashboard>  
                </Route>
                <Route path="/embarcaciones/:id">
                    <Dashboard nombre="CYNM" descripcion="embarcaciones" side={true} >
                        <Embarcacion />
                    </Dashboard>  
                </Route>
                <Route path="/clientes/:id/cta-cte">
                    <Dashboard nombre="CYNM" descripcion="clientes" side={true} >
                        <CuentaCorriente />
                    </Dashboard>  
                </Route>
                <Route path="/clientes/:id">
                    <Dashboard nombre="CYNM" descripcion="clientes" side={true} >
                        <Cliente />
                    </Dashboard>  
                </Route>
                <Redirect to="/" />
            </Switch>
    )
}