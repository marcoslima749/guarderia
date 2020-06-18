import React from 'react';

import { Home } from './home/pages/Home';
import { Login } from './auth/pages/Login';
import { Register } from './auth/pages/Register';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HojaDeEstilo } from './shared/pages/HojaDeEstilo';
import { Dashboard } from './shared/pages/dashboard';


import './App.css'
import { Inicio } from './inicio/pages/Inicio';
import { Embarcaciones } from './embarcaciones/pages/Embarcaciones';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                <Dashboard clases="dashboard--home">
                {(main) =>   <Login clases={main} />}
                </Dashboard>  
                </Route>
                <Route exact path="/register">
                {(main) =>   <Register clases={main} />}
                </Route>
                <Route exact path="/inicio">
                <Dashboard nombre="CYNM" descripcion="Tareas" >
                {(main) =>   <Inicio clases={main} />}
                </Dashboard>  
                </Route>
                <Route exact path="/estilo">
                    <HojaDeEstilo />
                </Route>
                <Route exact path="/embarcaciones">
                <Dashboard nombre="CYNM" descripcion="Embarcaciones" >
                {(main) =>   <Embarcaciones clases={main} />}
                </Dashboard>  
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}