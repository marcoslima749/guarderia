import React from 'react';

import { Home } from './home/pages/Home';
import { Login } from './auth/pages/Login';
import { Register } from './auth/pages/Register';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HojaDeEstilo } from './shared/pages/HojaDeEstilo';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/estilo">
                    <HojaDeEstilo />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}