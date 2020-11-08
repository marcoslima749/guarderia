
//123 probando...

import React from 'react';

import { Home } from './home/pages/Home';
import { Login } from './auth/pages/Login';
import { Register } from './auth/pages/Register';

import { Switch, Route, Redirect, Link, useParams, useRouteMatch, useLocation } from 'react-router-dom';
import { Dashboard } from './shared/pages/dashboard';


import './App.css'
import { Resumen } from './resumen/pages/Resumen';
import { Tareas } from './inicio/components/Tareas';
import { Embarcacion } from './embarcaciones/pages/Embarcacion';
import { Cliente } from './clientes/pages/Cliente';
import { Boton } from './shared/components/Boton';
import { CuentaCorriente } from './cuentacorriente/pages/CuentaCorriente';
import { CuentaCorrienteWrapper } from './cuentacorriente/pages/CuentaCorrienteWrapper';
import { CuentaCorrienteReporte } from './cuentacorriente/components/CuentaCorrienteReporte';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {


    let [descripcionHeader, setDescripcionHeader] = useState("");
    let [nombreHeader, setNombreHeader] = useState("");
    let [panelHeader, setPanelHeader] = useState("");

    let matchActual = useRouteMatch();
    let locationActual = useLocation();
    console.log(matchActual);
    console.log(locationActual);

    let pathActual = matchActual.path;
    let urlActual = matchActual.url;
    let idActual = useParams().id;

    useEffect(()=>{


        
        let newNombreHeader = "CYNM";

        let newDescripcionHeader =
        pathActual === "/inicio" ? "Tareas" : 
        pathActual === "/resumen" ? "Resumen" : 
        pathActual === "/embarcaciones/:id" ? "Embarcaciones" : 
        pathActual === "/clientes/:id/cta-cte" ? "Estado de Cuenta" : 
        pathActual === "/clientes/:id" ? "Clientes" : 
        "";

        let newPanelHeader = 
        pathActual === "/inicio" ? null : 
        pathActual === "/resumen" ? <Boton path="#" clases="simple-hover embarcacion__boton-nuevo">Nuevo</Boton> : 
        pathActual === "/embarcaciones/:id" ? null : 
        pathActual === "/clientes/:id/cta-cte" ? <Boton path={`/clientes/${idActual}/cta-cte/imprimir`} className="simple-hover embarcacion__boton-nuevo">Imprimir</Boton> : 
        pathActual === "/clientes/:id" ? null : 
        null;

        setDescripcionHeader(newDescripcionHeader);
        setPanelHeader(newPanelHeader);
        setNombreHeader(newNombreHeader);


    },[]);

        
    
    



    

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
                {/* a partir de acá está logueado */}

                <Dashboard nombre={nombreHeader} descripcion={descripcionHeader} side={true} panel={panelHeader} >
                    <Route exact path="/inicio">
                            <Tareas />
                    </Route>
                    <Route exact path="/resumen">
                            <Resumen />
                    </Route>
                    <Route path="/embarcaciones/:id">
                            <Embarcacion />
                    </Route>
                    <Route path="/clientes/:id/cta-cte/imprimir">
                        <CuentaCorrienteReporte />
                    </Route>
                    <Route path="/clientes/:id/cta-cte">
                        <CuentaCorriente /> 
                    </Route>
                    <Route path="/clientes/:id">
                        <Cliente />
                    </Route>

                </Dashboard>  
                <Redirect to="/" />
            </Switch>
    )
}