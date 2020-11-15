import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, useParams, useRouteMatch, Link} from 'react-router-dom';
import axios from 'axios';
import './Resumen.css';
import { Boton } from '../../shared/components/Boton';
import { act } from '@testing-library/react';

const moment = require('moment');

const calcularSaldo = (objCtaCte) => {
    return objCtaCte.reduce((acc, curr)=> {
        return curr.IDp !== null ? acc - curr.Haber : acc + curr.Debe;
    }, 0);
};

export const Resumen = ({setHeader, cuentaCorriente, listaResumen, clases}) => {
  let [listaEmb, setListaEmb]  = useState([]);
    let [llaves, setLlaves] = useState([]);
    let {path} = useRouteMatch();
//    let [cuentaCorriente, setCuentaCorriente] = useState([]);

    useEffect(()=> {
        setHeader.setNombreHeader("CYNM");
        setHeader.setDescripcionHeader("Resumen");
        setHeader.setPanelHeader(<Boton path="#" clases="simple-hover embarcacion__boton-nuevo">Nuevo</Boton>);
    },[]);

/*    
    useEffect(()=> {
        
        axios.get('/api/db/resumen').then((response)=>{
            console.log(response.data);
            actualizarLista(response.data);
            const arrConsultas = response.data.map(el=>axios.get(`/api/db/clientes/${el.IDc}/cta-cte`));
            Promise.all(arrConsultas).then( res => {
                let newCtaCte = res.map(r => r.data);
                console.log(newCtaCte);
                setCuentaCorriente(newCtaCte);
            }).catch(error=>{throw error;});
        }).catch((error)=>{
            throw error;
        });
        
    }, []);
*/
    useEffect(()=>{

        actualizarLista(listaResumen);

        cuentaCorriente.forEach(ctacte => {
            if(ctacte.length === 0) return;

            let saldo = calcularSaldo(ctacte);

            console.log("saldo", saldo);

            setListaEmb((prevListaEmb)=> {
                let newListaEmb = prevListaEmb.map((emb)=>{
                    if(emb.IDc === ctacte[0].IDcl){
                        emb.Estado = saldo <= 0 ? "Al Día" : "Pendiente";
                        emb.Pendiente = saldo;
                    }
                    return emb;
                });
                return newListaEmb;
            });

        });

    }, [cuentaCorriente, listaResumen])

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