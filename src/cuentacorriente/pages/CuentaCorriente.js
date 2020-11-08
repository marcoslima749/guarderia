import React from 'react';
import { useState, useEffect } from 'react';

import {BrowserRouter as Router, Switch, useParams, useRouteMatch, Link} from 'react-router-dom';
import axios from 'axios';
import './CuentaCorriente.css';



const moment = require('moment');

//FIN DATOS DEFAULT***************************************************************************************

let maqueta = [{
    Debe: 0,
    Haber: null,
    IDcl: 1,
    IDd: 4,
    IDemb: 1,
    IDm: 1,
    IDp: null,
apellido: "POMBO",
clNombre: "NORBERTO JOSE",
descripcion: "SALDO INICIAL",
nombre: "LUMAGO",
periodo: "2019-10-01T03:00:00.000Z",
},
{
    Debe: 28500,
    Haber: null,
    IDcl: 1,
    IDd: 5,
    IDemb: 1,
    IDm: 1,
    IDp: null,
    apellido: "POMBO",
    clNombre: "NORBERTO JOSE",
    descripcion: "CUOTA",
    nombre: "LUMAGO",
    periodo: "2019-10-01T03:00:00.000Z",
},
{
    Debe: 690,
    Haber: null,
    IDcl: 1,
    IDd: 20,
    IDemb: 1,
    IDm: 1,
    IDp: null,
    apellido: "POMBO",
    clNombre: "NORBERTO JOSE",
    descripcion: "TASA",
    nombre: "LUMAGO",
    periodo: "2019-10-01T03:00:00.000Z",
},
{
    Debe: null,
    Haber: 20000,
    IDcl: 1,
    IDd: null,
    IDemb: 1,
    IDm: null,
    IDp: 2,
    apellido: "POMBO",
    clNombre: "NORBERTO JOSE",
    descripcion: "PAGO",
    nombre: "LUMAGO",
    periodo: "2019-10-07T03:00:00.000Z",
},
{
    Debe: null,
    Haber: 9400,
    IDcl: 1,
    IDd: null,
    IDemb: 1,
    IDm: null,
    IDp: 1,
    apellido: "POMBO",
    clNombre: "NORBERTO JOSE",
    descripcion: "PAGO",
    nombre: "LUMAGO",
    periodo: "2019-10-07T03:00:00.000Z",
}
]
//FIN DATOS DEFAULT***************************************************************************************

const sumarColumna = (objCtaCte, strColumna) => {
    return objCtaCte.reduce((acc, curr)=> {
        return acc + curr[strColumna];
    }, 0);
}


export const CuentaCorriente = () => {
    
    let [ctacte, setCtacte] = useState(maqueta);
    let [totalDebe, setTotalDebe] = useState(0);
    let [totalHaber, setTotalHaber] = useState(0);
    let [celdas, setCeldas] = useState({filas : ""});
    const params = useParams();
    
    
    useEffect(()=>{
        
        axios.get(`/api/db/clientes/${params.id}/cta-cte`).then((response) => {
            setCtacte(response.data);
        });
        
    }, []);
    
    useEffect(()=> {

        setTotalDebe(sumarColumna(ctacte, 'Debe'));
        setTotalHaber(sumarColumna(ctacte, 'Haber'));
        
        let newCeldas = ctacte.reduce((acc, curr) => {
            return(
                {
                    saldoAcumulado : acc.saldoAcumulado + curr.Debe - curr.Haber,
                    filas : [...acc.filas, 
                        <div className='cuenta-corriente__fila'>
                            <span>{moment(curr.periodo).format('DD[-]MM[-]YYYY')}</span>
                            <span>{curr.nombre}</span>
                            <span>{moment(curr.periodo).format('MMMM[ ]YYYY')}</span>
                            <span>{curr.descripcion} </span>
                            <span>{curr.Debe} </span>
                            <span>{curr.Haber} </span>
                            <span>{acc.saldoAcumulado + curr.Debe - curr.Haber}</span>
                            <span>0</span>
                        </div>
                    ]
                }
            )
        }, {saldoAcumulado : 0, filas : []});

        setCeldas(newCeldas);

    }, [ctacte]);



    return(

        <div className='cuenta-corriente__container'>
            <div className='cuenta-corriente__titulos'>
                <span>Fecha</span>
                <span>Embarcacion</span>
                <span>Período</span>
                <span>Concepto</span>
                <span>Debe</span>
                <span>Haber</span>
                <span>Saldo</span>
                <span>Pendiente</span>
            </div>
            <div className='cuenta-corriente__contenido'>
                {celdas.filas}
            </div>
            <div className='cuenta-corriente__totales'>
                <span className="cuenta-corriente__totales__label">TOTALES</span>
                <span className="cuenta-corriente__totales__debe">{totalDebe}</span>
                <span className="cuenta-corriente__totales__haber">{totalHaber}</span>
                <span className="cuenta-corriente__totales__saldo">{totalDebe - totalHaber}</span>
                <span className="cuenta-corriente__totales__pendiente">0</span>
            </div>

            
        </div>

    )
}
