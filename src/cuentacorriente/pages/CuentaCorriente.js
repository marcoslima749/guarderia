import React from 'react';
import { useState, useEffect } from 'react';

const moment = require('moment');

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

const fcs = (objCtaCte) => {
    return objCtaCte.reduce((acc, curr)=> {
        return curr.IDp !== null ? acc - curr.Haber : acc + curr.Debe;
    }, 0);
};


export const CuentaCorriente = ({ctacte = maqueta, funcCalcularSaldo = fcs}) => {

let saldo = funcCalcularSaldo(ctacte);

let celdas = ctacte.reduce((acc, curr) => {
    return(
        {
            saldoAcumulado : acc.saldoAcumulado + curr.Debe - curr.Haber,
            filas : [...acc.filas, 
                <div>
                    <span>{moment(curr.periodo).format('DD[-]MM[-]YYYY')}</span>
                    <span>{curr.nombre}</span>
                    <span>{moment(curr.periodo).format('MMMM[ ]YYYY')}</span>
                    <span>{curr.descripcion} </span>
                    <span>{curr.Debe} </span>
                    <span>{curr.Haber} </span>
                    <span> {acc.saldoAcumulado + curr.Debe - curr.Haber} </span>
                    <span> 0 </span>
                </div>
            ]
        }
    )
}, {saldoAcumulado : 0, filas : []})


    return(

        <div>
            <div>
                <span>Fecha</span>
                <span>Embarcacion</span>
                <span>Período</span>
                <span>Concepto</span>
                <span>Debe</span>
                <span>Haber</span>
                <span>Saldo</span>
                <span>Pendiente</span>
            </div>
            <div>
                {celdas.filas}
            </div>
            <div>
                {saldo}
            </div>
            
        </div>

    )
}
