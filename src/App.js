import React from 'react';

import { Home } from './home/pages/Home';
import { Login } from './auth/pages/Login';
import { Register } from './auth/pages/Register';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HojaDeEstilo } from './shared/pages/HojaDeEstilo';
import { Dashboard } from './shared/pages/dashboard';

import './App.css'
import { Inicio } from './inicio/pages/Inicio';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                <Dashboard><Login /></Dashboard>  
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/inicio">
                <Dashboard><Inicio /></Dashboard>  
                </Route>
                <Route exact path="/estilo">
                    <HojaDeEstilo />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}