import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Embarcaciones.css';

const moment = require('moment');

export const Embarcaciones = ({clases}) => {
    let [listaEmb, setListaEmb]  = useState([]);
    let [llaves, setLlaves] = useState([]);

    useEffect(()=> {
        axios.get('/api/db/embarcaciones').then((response)=>{
            console.log(response);
            actualizarLista(response.data);
        }).catch((error)=>{
            throw error;
        });

    }, [])

    const actualizarLista = (datos) => {
        setLlaves(Object.keys(datos[0]));
        setListaEmb(datos);
    }

    
    let titulos = llaves.map((llave)=> {
        return (
            <span key={Math.random()} className={`embarcaciones__titulo-${llave}`}>
                {llave === 'Posesion' ? '%' : llave === 'Categoria' ? 'Cat' : llave}
            </span>
        )
    });

    let filas = listaEmb.map((emb)=> {
            return(
                <div key={`${emb.ID}-${emb.Cliente}`} className="embarcaciones__embarcacion">
                
                {
                    llaves.map((llave)=> {
                        return(
                            <span key={llave} className={`embarcaciones__ embarcacion embarcacion__${llave}`}>
                                {llave === 'Contrato' || llave === 'Seguro' ? moment(emb[llave]).format('DD[-]MM[-]YYYY') : emb[llave]}
                            </span>
                        )
                    })
                }

                </div>
            )
        });

    return(

        <div className={`embarcaciones ${clases}`}>

            <div className="embarcaciones__titulos">
                {titulos}
            </div>

            <div className="embarcaciones__lista">
                {filas}
            </div>
            <div className="embarcaciones__flag">
                flags
            </div>
            
        </div>
    )
}