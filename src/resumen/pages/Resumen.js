import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, useParams, useRouteMatch, Link} from 'react-router-dom';
import axios from 'axios';
import './Resumen.css';
import { Boton } from '../../shared/components/Boton';

const moment = require('moment');

export const Resumen = ({clases}) => {
    let [listaEmb, setListaEmb]  = useState([]);
    let [llaves, setLlaves] = useState([]);
    let {path} = useRouteMatch();
    let [cuentaCorriente, setCuentaCorriente] = useState([])
    

    useEffect(()=> {
        axios.get('/api/db/resumen').then((response)=>{
            console.log(response);
            actualizarLista(response.data);
            const arrConsultas = response.data.map(el=>axios.get(`/api/db/clientes/${el.IDc}/cta-cte`).then(res=>res.data));
            Promise.all(arrConsultas).then( arrCtaCtes => {
                setCuentaCorriente(arrCtaCtes);
            }).catch(error=>{throw error;});
        }).catch((error)=>{
            throw error;
        });

    }, [])

    const actualizarLista = (datos) => {
        setLlaves(Object.keys(datos[0]));
        setListaEmb(datos);
    }

    
    let titulos = llaves.filter((llave)=>llave !== 'IDc').map((llave)=> {
        return (
            <span key={Math.random()} className={`simple-hover embarcaciones__titulo embarcaciones__titulo-${llave}`}>
                {llave}
            </span>
        )
    });

    let filas = listaEmb.map((emb)=> {
            return(
                <div key={`${emb.ID}-${emb.Cliente}`} className="embarcaciones__embarcacion">
                
                {
                    llaves.filter((llave)=>llave !== 'IDc').map((llave)=> {
                        return(
                            <span key={llave} className={`${llave === 'Embarcacion' || llave === 'Cliente' || llave === 'Estado' ? 'simple-hover': '' } embarcaciones__campo embarcacion__${llave}`}>
                                {
                                    llave === 'Embarcacion' ? <Boton path={`/embarcaciones/${emb.ID}`}>{emb[llave]}</Boton>
                                    : llave === 'Cliente' ? <Boton path={`/clientes/${emb.IDc}`} >{emb[llave]}</Boton> 
                                    : llave === 'Estado' ? <Boton path={`/clientes/${emb.IDc}/cta-cte`} >{emb[llave]}</Boton> 
                                    : llave === 'Contrato' || llave === 'Seguro' ? moment(emb[llave]).format('DD[-]MM[-]YYYY') 
                                    : emb[llave]
                                }
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