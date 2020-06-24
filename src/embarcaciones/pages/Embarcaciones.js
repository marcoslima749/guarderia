import React, { useState, useEffect } from 'react';
import axios from 'axios';

const moment = require('moment');

export const Embarcaciones = ({clases}) => {
    let [listaEmb, setListaEmb]  = useState([]);

    useEffect(()=> {
        axios.get('/api/db/embarcaciones').then((response)=>{
            console.log(response);
            setListaEmb(response.data);
        }).catch((error)=>{
            throw error;
        });

    }, [])

    return(
        <div className={`embarcaciones ${clases}`}>
            <div className="embarcaciones__titulos">
                <span className="embarcaciones__titulo-nombre">
                    Embarcacion
                </span>
                <span className="embarcaciones__titulo-marca">
                    Marca
                </span>
                <span className="embarcaciones__titulo-modelo">
                    Modelo
                </span>
                <span className="embarcaciones__titulo-contrato">
                    Contrato
                </span>
                <span className="embarcaciones__titulo-seguro">
                    Seguro
                </span>
                <span className="embarcaciones__titulo-Baja">
                    Baja
                </span>
            </div>
            {listaEmb.map((emb)=>{
                return(
                    <div key={emb.idembarcaciones} className="embarcacion">
                        <span className="embarcacion__nombre">
                            {emb.nombre}
                        </span>
                        <span className="embarcacion__marca">
                            {emb.marca}
                        </span>
                        <span className="embarcacion__modelo">
                            {emb.modelo}
                        </span>
                        <span className="embarcacion__contrato-fecha">
                            {moment(emb.contrato_fecha).format('DD[-]MM[-]YYYY')}
                        </span>
                        <span className="embarcacion__seguro-fecha">
                            {moment(emb.seguro_fecha).format('DD[-]MM[-]YYYY')}
                        </span>
                        <span className="embarcacion__baja-fecha">
                            {emb.baja_fecha && moment(emb.baja_fecha).format('DD[-]MM[-]YYYY')}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}