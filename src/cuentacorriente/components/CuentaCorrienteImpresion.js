import React from 'react';
import { useEffect } from 'react';
import './CuentaCorrienteImpresion.css';

export const CuentaCorrienteImpresion = ({cuentaCorriente}) => {
    useEffect(
        ()=>{
         //   window.addEventListener("afterprint",() => window.close());
         //   window.print();
        },[]);

 return(
     <div className="ctacte-impresion__container">
        <div className="ctacte-impresion__logo"></div>
        <h1 className="ctacte-impresion__titulo">CLUB DE YATES NAVAL MOTOR</h1>
        <h2 className="ctacte-impresion__subtitulo">OPERADORA RIO LUJAN SRL</h2>
        <div className="ctacte-impresion__separador"></div>

        <footer className="ctacte-impresion__footer"></footer>
        
     </div>
 )   
}