import React from 'react';
import { useEffect } from 'react';

export const CuentaCorrienteImpresion = () => {
    useEffect(
        ()=>{
            window.addEventListener("afterprint",() => window.close());
            window.print();
        },[])
 return(
     <h1>reporte</h1>
 )   
}