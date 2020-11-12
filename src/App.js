
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
import { CuentaCorrienteImpresion } from './cuentacorriente/components/CuentaCorrienteImpresion';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {


    let [descripcionHeader, setDescripcionHeader] = useState("");
    let [nombreHeader, setNombreHeader] = useState("");
    let [panelHeader, setPanelHeader] = useState("");
    let setHeader = {setNombreHeader, setDescripcionHeader, setPanelHeader};

    let matchActual = useRouteMatch();
    let locationActual = useLocation();

    console.log(matchActual);
    console.log(locationActual);

    let pathActual = locationActual.pathname;

    useEffect(()=>{


/*
        
        let newNombreHeader = "CYNM";

        let inicio = /\/inicio\/{0,1}/;
        let resumen = /\/resumen\/{0,1}/;
        let embarcacionesid = /\/embarcaciones\/\d{1,4}\/{0,1}/;
        let clientesidctacte = /\/clientes\/\d{1,4}\/cta-cte\/{0,1}/;


        //HAY QUE VER UNA FORMA DE QUE DIFERENCIE LOS ID DE CLIENTES Y EMBARCACIONES PORQUE
        //LOS NECESITO PARA HACER LAS CONSULTAS A LA BASE DESDE LA APP
        //VER LA FORMA DE USAR USEPARAMS O PASAR FUNCIONES AL DASHBOARD PARA QUE USANDO LOS DATOS
        //DESDE EL ROUTE ACTUALICE EL HEADER Y EL SIDENAV Y ASÍ PODER USAR USE PARAMS
        //Y USEROUTMATCH SIN DRAMA
        
        let clientesid = /\/clientes\/\d{1,4}\/{0,1}/;


        let regexpid = /\/(\d{1,4})\/{0,1}/;
        let idActual = regexpid.test(pathActual) ? regexpid.exec(pathActual)[1] : "";
        

        let newDescripcionHeader =
        inicio.test(pathActual) ? "Tareas" : 
        resumen.test(pathActual) ? "Resumen" : 
        embarcacionesid.test(pathActual) ? "Embarcaciones" : 
        clientesidctacte.test(pathActual) ? "Estado de Cuenta" : 
        clientesid.test(pathActual) ? "Clientes" : 
        "";

        let newPanelHeader = 
        inicio.test(pathActual) ? null : 
        resumen.test(pathActual) ? <Boton path="#" clases="simple-hover embarcacion__boton-nuevo">Nuevo</Boton> : 
        embarcacionesid.test(pathActual) ? null : 
        clientesidctacte.test(pathActual) ? <Link target="blank" to={`/clientes/${idActual}/cta-cte/imprimir`} className="simple-hover embarcacion__boton-nuevo">Imprimir</Link> : 
        clientesid.test(pathActual) ? null : 
        null;

        setDescripcionHeader(newDescripcionHeader);
        setPanelHeader(newPanelHeader);
        setNombreHeader(newNombreHeader);
*/

    },[pathActual, locationActual]);

        
    
    



      

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
                <Route exact path="/clientes/:id/cta-cte/imprimir">
                    <CuentaCorrienteImpresion />
                </Route>
                {/* a partir de acá está logueado
                    DEBERÍA RENDERIZAR UN COMPONENTE INICIO QUE CREE EL CONTEXTO DE DATOS
                    Y RENDERICE LAS RUTAS SEGUN CORRESPONDA, CADA UNA CON SU NAV, SIDE Y MAIN POR SEPARADO
                    Y CON LOS DATOS DEL CONTEXT SEGÚN SEA EL CASO,
                    EN ESE CASO EL LAYOUT ESTARÍA EN EL COMPONENTE "INICIO"
                 */}

                <Dashboard nombre={nombreHeader} descripcion={descripcionHeader} side={true} panel={panelHeader} >
                    <Route exact path="/inicio">
                        <Tareas setHeader={setHeader} />
                    </Route>
                    <Route exact path="/resumen">
                        <Resumen setHeader={setHeader} />
                    </Route>
                    <Route exact path="/embarcaciones/:id">
                        <Embarcacion setHeader={setHeader} />
                    </Route>
                    <Route exact path="/clientes/:id/cta-cte">
                        <CuentaCorriente setHeader={setHeader} /> 
                    </Route>
                    <Route exact path="/clientes/:id">
                        <Cliente setHeader={setHeader} />
                    </Route>

                </Dashboard>  
                <Redirect to="/" />
            </Switch>
    )
}