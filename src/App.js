
//123 probando...

//220317: librerías
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Redirect, Link, useParams, useRouteMatch, useLocation } from 'react-router-dom';


//220317: páginas que no necesitan login
import { Home } from './home/pages/Home';
import { Login } from './auth/pages/Login';
import { Register } from './auth/pages/Register';


/*220317: Dashboard es el marco con el header y el side al que se le pasa el resto de la página
como children para renderizar
*/

import { Dashboard } from './shared/pages/dashboard';

//220317: Importando los estilos

import './App.css'

//220317: Páginas que se le pasan al Dashboard

import { Resumen } from './resumen/pages/Resumen';
import { Tareas } from './inicio/components/Tareas';
import { Embarcacion } from './embarcaciones/pages/Embarcacion';
import { Cliente } from './clientes/pages/Cliente';
import { Boton } from './shared/components/Boton';
import { CuentaCorriente } from './cuentacorriente/pages/CuentaCorriente';
import { CuentaCorrienteImpresion } from './cuentacorriente/components/CuentaCorrienteImpresion';


export const App = () => {

/*
220317:
Aparentemente la estructura de la UI es, según la página, un marco (Dashboard) con el header y el side panel
que renderiza los children que se les pasa.
El estado para renderizar el contenido del header y el side es global:
(descripcionHeader, nombreHeader, panelHeader)
La página recibe y pasa funciones a los hijos para que se pueda
customizar el header y los botones del side.

Ahí lo ví mejor:

Todas las rutas logueadas renderizan un dashboard sí o sí, que recibe el switch con las routes
para renderizar el contenido según la route. El dashboard renderiza según el estado global y pasa
por props las funciones para modificarlo a cada página. Cada página llama a esas funciones para
efectivamente customizar los botones y el título del header, el nav, etc.
Al final los hijos conocen el funcionamiento del padre
y el padre conoce parcialmente el funcionamiento de los hijos
habría que usar una solución de estado global y actue como controller en la app principal
(o que el controller sea el backend) ---repensar
y que los demás sean dumb components y chau. Las rutas cada una por su lado y que el login
lo cheque una función del controller antes de renderizar cada componente (view)

-----
Quizás se pueda hacer al revés, que a cada página se le pase el header y el side por parámetros
como meros contenedores que reciban props para renderizar, y que dentro de la UI se modifiquen
según se requiera.

Por ejemplo el componente Home importa directamente al componente Cabecera y lo renderiza desde adentro
Quizás debería ser así con todas las páginas, o que lo reciban por props.

-----
De esta manera las routes van a quedar un poco más limpias y se evita un poco el estado global,
eliminando esas tres variables, que pasarían a ser props, simplificando la UI.

*/

//220317: Variables de estado global para el header y el panel (deberían volar cuando se pasen a cada página)
    let [descripcionHeader, setDescripcionHeader] = useState("");
    let [nombreHeader, setNombreHeader] = useState("");
    let [panelHeader, setPanelHeader] = useState("");
    let setHeader = {setNombreHeader, setDescripcionHeader, setPanelHeader};


/*220317: 
Variables de estado global para almacenar la lista de resumen y la ctacte de cada cliente
HAY QUE HACERLO ANDAR - (VER QUÉ DEVUELVE /api/db/resumen)
DESPUÉS HAY QUE BUSCAR UNA FORMA DE OPTIMIZAR PORQUE VA A SER HEAVY LA CONSULTA
*/

    //Recolectar los datos
    let [listaResumen, setListaResumen] = useState("");
    let [cuentaCorriente, setCuentaCorriente] = useState([]);


/* APROACH AL ROUTE PATH SIN PATHS, CON REGEX.      
    
    let matchActual = useRouteMatch();
    let locationActual = useLocation();

    console.log(matchActual);
    console.log(locationActual);

    let pathActual = locationActual.pathname;

    useEffect(()=>{

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


    },[pathActual, locationActual]);
*/
        
//CARGANDO LOS DATOS DE LAS CUENTAS CORRIENTES    
    
    useEffect(()=>{
        //Datos Resumen
        axios.get('/api/db/resumen').then((response)=>{
            console.log(response.data);
            setListaResumen(response.data);
            const arrConsultas = response.data.map(el=>axios.get(`/api/db/clientes/${el.IDc}/cta-cte`));
            Promise.all(arrConsultas).then( res => {
                let newCtaCte = res.map(r => r.data);
                console.log(newCtaCte);
                setCuentaCorriente(newCtaCte);
            }).catch(error=>{throw error;});
        }).catch((error)=>{
            throw error;
        });
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
                        <Resumen setHeader={setHeader} listaResumen={listaResumen} cuentaCorriente={cuentaCorriente} />
                    </Route>
                    <Route exact path="/embarcaciones/:id">
                        <Embarcacion setHeader={setHeader} />
                    </Route>
                    <Route exact path="/clientes/:id/cta-cte">
                        <CuentaCorriente setHeader={setHeader} cuentaCorriente={cuentaCorriente} /> 
                    </Route>
                    <Route exact path="/clientes/:id">
                        <Cliente setHeader={setHeader} />
                    </Route>

                </Dashboard>  
                <Redirect to="/" />
            </Switch>
    )
}