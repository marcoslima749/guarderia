import React from 'react';

import { Home } from './home/pages/Home';
import { Login } from './auth/pages/Login';
import { Register } from './auth/pages/Register';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

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
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}